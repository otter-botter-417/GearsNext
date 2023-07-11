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

const LoginPage = () => {
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
        <RegisterForm formMethods={formMethods} />
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
