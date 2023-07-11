import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { RegisterValidatedSchema } from "@/components/atoms/schema/RegisterValidatedSchema";
import { SubmitButton } from "@/components/atoms/form/SubmitButton";
import RegisterPageTemplate from "@/components/templates/RegisterPageTemplate";
import RegisterForm from "@/components/organisms/RegisterForm";
import { auth } from "./firebase";
import { useRouter } from "next/router";
import Link from "next/link";
import { Typography } from "@mui/material";

import { LoginFormDataTypes } from "../typs/LoginFormDataTypes"; //formMethods 内の配列の型

const RegisterPage = () => {
  // バリデーションスキーマを取得するコンポーネント
  const schema = RegisterValidatedSchema();

  // textfieldにバリデーションを渡すため
  const formMethods = useForm<LoginFormDataTypes>({
    defaultValues: {
      loading: false,
    },
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginFormDataTypes) => {
    // const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential: any) => {
        // Signed in
        const user = userCredential.user;

        // ユーザーデータをLaravelに送信する
        fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((response) => response.json())
          .then((data) => {
            // Laravelからのレスポンスを処理する
            console.log(data);
            // ここでNext.jsのステートやコンポーネントの更新などを行う
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <RegisterPageTemplate>
      <Typography variant="h4">新規登録</Typography>

      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <RegisterForm formMethods={formMethods} />
        <SubmitButton
          loading={formMethods.watch("loading") || false}
          text={"新規登録"}
        />
      </form>
      <Link href="/LoginPage">既にアカウントを持っている</Link>
    </RegisterPageTemplate>
  );
};

export default RegisterPage;
