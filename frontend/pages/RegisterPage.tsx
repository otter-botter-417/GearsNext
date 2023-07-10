// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { RegisterValidatedSchema } from "@/components/atoms/schema/RegisterValidatedSchema";
import { SubmitButton } from "@/components/atoms/form/SubmitButton";
import RegisterPageTemplate from "@/components/templates/RegisterPageTemplate";
import RegisterForm from "@/components/organisms/RegisterForm";

const RegisterPage = () => {
  // バリデーションスキーマを取得するコンポーネント
  const schema = RegisterValidatedSchema();

  // textfieldにバリデーションを渡すため
  const formMethods = useForm({
    defaultValues: {
      loading: false,
    },
    resolver: yupResolver(schema),
  });

  return (
    <RegisterPageTemplate>
      <form
        onSubmit={formMethods.handleSubmit((data) => {
          console.log(data);
        })}
      >
        <RegisterForm formMethods={formMethods} />
        <SubmitButton
          loading={formMethods.watch("loading") || false}
          text={"データ送信"}
        />
      </form>
      <div>すでにあかうんとをもっている</div>
    </RegisterPageTemplate>
  );
};

export default RegisterPage;
