import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import Header from "./Header";
import { RecoilRoot } from "recoil";

import themeOptions from "@/styles/themes/themeOptions";
import SearchPage from "./SearchPage";

const theme = createTheme(themeOptions);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Box sx={{ pt: "64px" }}>
          <CssBaseline />
          <Header />
          <SearchPage />
        </Box>
      </RecoilRoot>
    </ThemeProvider>
  );
}
