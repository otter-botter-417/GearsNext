import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useApiRequest } from '@/hooks/api/useApiRequest';
import { LoginFormDataTypes } from '@/typs/LoginFormDataTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginValidatedSchema } from '@/components/pages/userLoginPage/LoginValidatedSchema';

/**
 * ユーザー登録フォームのカスタムフック
 * @returns {formMethods, onSubmit} フォームのメソッドとonSubmit関数
 */
export const useUserLogin = () => {
  const router = useRouter();
  const { sendRequest } = useApiRequest();
  const schema = LoginValidatedSchema();  // ここで関数を呼び出す

  // react-hook-formのメソッドを取得
  const formMethods = useForm<LoginFormDataTypes>({
    defaultValues: {
      loading: false,
    },
    resolver: yupResolver(schema),
  });

  // スネークケースをキャメルケースに変換するヘルパー関数
  function convertSnakeToCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', ''),
    );
  }

  const onSubmit = async (data: any) => {
    try {
      // リクエストデータを作成
      data = {
        email: data.email,
        password: data.password,
      }
      const response = await sendRequest('post', 'user/login', data);
      // レスポンスが201の場合は、jwt_tokenをlocalStorageに保存し、トップページに遷移する
      if (response && response.status === 200) {
        const jwt = response.data.token;
        localStorage.setItem('jwt_token', jwt);
        router.push('/');
      }
    } catch (err: any) {
      console.log(err);
      // エラーが422の場合は、バリデーションエラーなので、エラーメッセージを表示する
      if (err.status === 422) {
        const validationErrors = err.data as Record<string, string[]>;
        // サーバーからのエラーメッセージをreact-hook-formに登録
        for (const [field, messages] of Object.entries(validationErrors)) {
          const camelField = convertSnakeToCamelCase(field);
          if (['email', 'password', 'loading'].includes(camelField)) {
            formMethods.setError(camelField as keyof LoginFormDataTypes, {
              type: 'manual',
              message: messages[0],
            });
          }
        }
      }
    }
  };

  return { formMethods, onSubmit };
};
