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
import axios from "axios";

import { RegisterFormDataTypes } from "../typs/RegisterFormDataTypes"; //formMethods 内の配列の型

const RegisterPage = () => {
  // バリデーションスキーマを取得するコンポーネント
  const schema = RegisterValidatedSchema();

  // textfieldにバリデーションを渡すため
  const formMethods = useForm<RegisterFormDataTypes>({
    defaultValues: {
      loading: false,
    },
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterFormDataTypes) => {
    // const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential: any) => {
        // Signed in
        const user = userCredential.user;
        console.log("firebase OK");

        // LaravelのエンドポイントにPOSTリクエストを送信
        const response = axios
          .post("http://localhost:8000/api/register", {
            userId: user.uid,
            name: data.name,
            email: user.email,
          })
          .then((response) => {
            //レスポンスをログに出力
            console.log(response);
          })
          .catch((error) => {
            console.error("Error occurred while calling API: ", error);
          });
        router.push("/"); // リダイレクト

        // ...
      })
      .catch((error) => {
        console.log(error.response);
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
