import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import Header from "./Header";

import themeOptions from "@/styles/themes/themeOptions";

const theme = createTheme(themeOptions);

export default function App() {
  return (
    <ThemeProvider theme={themeOptions}>
      <Box sx={{ pt: "64px" }}>
        <CssBaseline />
        <Header />
      </Box>
    </ThemeProvider>
  );
}
