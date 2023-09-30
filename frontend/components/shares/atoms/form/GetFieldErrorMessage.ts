import { FieldErrors, FieldError } from 'react-hook-form';

/**
 * 指定したフィールド名に対応するエラーメッセージを取得します。
 * 
 * @param errors - react-hook-form から取得した `errors` オブジェクト
 * @param name - エラーメッセージを取得するフィールドの 'name' 属性
 * @returns エラーメッセージまたは空の文字列
 */
export const GetFieldErrorMessage = (errors: FieldErrors<any>, name: string): string => {
    const currentFieldError = errors[name] as FieldError | undefined;
    return currentFieldError?.message ? currentFieldError.message : '';
}
