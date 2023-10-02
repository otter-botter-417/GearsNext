// useUserAuth.ts (新規ファイル)

import { useState } from 'react';
import { Path, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSetRecoilState } from 'recoil';
import { useApiRequest } from '@/hooks/api/useApiRequest';
import { userState } from '@/components/shares/atoms/state/userState';
import { AxiosError } from 'axios';

/**
 * フォームデータをAPIリクエストデータに変換する関数の型
 * 
 * @template T フォームデータの型
 * @param  data 変換前のフォームデータ
 * @returns 変換後のAPIリクエストデータ
 */
type DataTransformer<T> = (data: T) => Record<string, any>;

/**
 * 共通のユーザー認証処理を行うカスタムフック
 *
 * @remarks
 * このフックは、ログインやユーザー登録などのユーザー認証処理で使用されます。
 * - フォームのバリデーション
 * - APIの呼び出し
 * - ローディング状態の管理
 * - ユーザー情報の更新
 * などの処理を行います。
 *
 * @template T フォームデータの型
 * @param schema Yupによるバリデーションスキーマ
 * @param apiEndpoint APIエンドポイントのURL
 * @param transformData フォームデータをAPIに適した形に変換する関数
 * @param testUser テストユーザーを使用する場合はtrue ポートフォリオ用設定
 * @returns フォームメソッド、onSubmit関数、ローディング状態
 */
export const useUserAuth = <T extends Record<string, any>>(
    schema: any,
    apiEndpoint: string,
    transformData: DataTransformer<T>,
    testUser?: boolean // テストユーザーを使用する場合はtrue ポートフォリオ用設定
) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { sendRequest } = useApiRequest();
    const setUser = useSetRecoilState(userState);

    // テストユーザーの場合は、デフォルト値を設定 ポートフォリオ用設定
    const defaultValues: any = testUser ? {
        email: 'test@test.com',
        password: 'password1',
    } : undefined;

    const formMethods = useForm<T>({
        resolver: yupResolver(schema) as any, //TODO anyの型を修正する
        defaultValues
    });

    // スネークケースをキャメルケースに変換
    const convertSnakeToCamelCase = (str: string): string => {
        return str.replace(/([-_][a-z])/g, (group) =>
            group.toUpperCase().replace('-', '').replace('_', ''),
        );
    };

    /**
    * フォームの送信処理
    * TODO Tについての理解が出来ていない。勉強が必要
    * 
    * - 認証に成功した場合は、アクセストークンとリフレッシュトークンをローカルストレージに保存
    * - transformData関数を用いて、フォームデータをAPIリクエストに適した形に変換
    * 
    * @param data フォームデータ（型 T）
    */
    const onSubmit = async (data: T) => {
        try {
            setLoading(true);
            const transformedData = transformData(data);
            const response = await sendRequest('post', apiEndpoint, transformedData);
            if (response && (response.status === 200 || response.status === 201)) {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                setUser(response.data.user);
                setLoading(false);
                router.push('/');
            }
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                setLoading(false);

                // エラーコードが422の場合、バリデーションエラーとして扱う
                if (err.response && err.response.status === 422) {
                    const validationErrors = err.response.data as Record<string, string[]>;

                    // サーバーからのエラーメッセージをreact-hook-formに登録
                    for (const [field, messages] of Object.entries(validationErrors)) {
                        const camelField = convertSnakeToCamelCase(field);
                        formMethods.setError(camelField as unknown as Path<T>, {
                            type: 'manual',
                            message: messages[0],
                        });
                    }
                }
            } else {
                console.log(err);
            }
        }
    };
    return { formMethods, onSubmit, loading };
};
