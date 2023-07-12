import React from "react";
import Link from "next/link";

import { NextPage } from "next";
import { Box } from "@mui/system";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const Home: NextPage = () => {
  React.useEffect(() => {
    const checkUser = async () => {
      const user = auth.currentUser;
      if (user) {
        // ユーザーがログインしている場合の処理
        console.log("User is logged in");
      } else {
        // ユーザーがログインしていない場合の処理
        console.log("User is not logged in");
      }
      console.log(user);
    };

    checkUser();
  }, []);
  return (
    <React.StrictMode>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
      >
        Welcome to my site
        {/* 各ページヘのリンク */}
        <Link href="/AddNewItemPage">AddNewItemPage</Link>
        <Link href="/ItemPage">ItemPage</Link>
        <Link href="/SearchPage">SearchPage</Link>
        <Link href="/RegisterPage">RegisterPage</Link>
      </Box>
    </React.StrictMode>
  );
};

export default Home;
