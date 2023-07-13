import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";

import { LoginValidatedSchema } from "@/components/atoms/schema/LoginValidatedSchema";
import { SubmitButton } from "@/components/atoms/form/SubmitButton";
import RegisterPageTemplate from "@/components/templates/RegisterPageTemplate";
import LoginForm from "@/components/organisms/LoginForm";
import { auth } from "./firebase";
import { useRouter } from "next/router";
import Link from "next/link";
import { Typography } from "@mui/material";
import { LoginFormDataTypes } from "../typs/LoginFormDataTypes"; //formMethods 内の配列の型

const LoginPage = () => {
  // バリデーションスキーマを取得するコンポーネント
  const schema = LoginValidatedSchema();

  // textfieldにバリデーションを渡すため
  const formMethods = useForm<LoginFormDataTypes>({
    defaultValues: {
      loading: false,
    },
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginFormDataTypes) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        router.push("/"); // リダイレクト
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
      <Typography variant="h4">ログイン</Typography>

      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <LoginForm formMethods={formMethods} />
        <SubmitButton
          loading={formMethods.watch("loading") || false}
          text={"ログイン"}
        />
      </form>
      <Link href="/RegisterPage">アカウントを持っていない</Link>
    </RegisterPageTemplate>
  );
};

export default LoginPage;
