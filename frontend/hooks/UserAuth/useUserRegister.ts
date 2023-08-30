import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useApiRequest } from '@/hooks/api/useApiRequest';
import { RegisterFormDataTypes } from '@/typs/RegisterFormDataTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterValidatedSchema } from '@/components/pages/userRegisterPage/RegisterValidatedSchema';

/**
 * ユーザー登録フォームのカスタムフック
 * @returns {formMethods, onSubmit} フォームのメソッドとonSubmit関数
 */
export const useUserRegister = () => {
  const router = useRouter();
  const { sendRequest } = useApiRequest();
  const schema = RegisterValidatedSchema();  // ここで関数を呼び出す

  // react-hook-formのメソッドを取得
  const formMethods = useForm<RegisterFormDataTypes>({
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
        user_name: data.userName,
        email: data.email,
        password: data.password,
        password_confirmation: data.passwordConfirmation,
      }
      const response = await sendRequest('post', 'user/register', data);
      // レスポンスが201の場合は、jwt_tokenをlocalStorageに保存し、トップページに遷移する
      if (response && response.status === 201) {
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
          if (['userName', 'email', 'password', 'passwordConfirmation', 'loading'].includes(camelField)) {
            formMethods.setError(camelField as keyof RegisterFormDataTypes, {
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
