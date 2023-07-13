// import {
//   createTheme,
//   responsiveFontSizes,
//   ThemeProvider,
// } from "@mui/material/styles";
// import { Box, CssBaseline } from "@mui/material";
// import Header from "./Header";
// import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";

// import themeOptions from "@/styles/themes/themeOptions";
// import SearchPage from "./SearchPage";
// import { userState } from "@/components/atoms/state/userAuth.State";
// import { useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase";

// const theme = createTheme(themeOptions);

// export default function App() {
//   const setUser = useSetRecoilState(userState);
// //
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <ThemeProvider theme={theme}>
//       <RecoilRoot>
//         <Box sx={{ pt: "64px" }}>
//           <CssBaseline />
//           <Header />
//           <SearchPage />
//         </Box>
//       </RecoilRoot>
//     </ThemeProvider>
//   );
// }
