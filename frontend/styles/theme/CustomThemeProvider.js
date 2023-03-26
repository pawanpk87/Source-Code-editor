import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { commonColors, darkColors, lightColors } from "./colors";

function CustomThemeProvider({ children }) {
  const darkMode = false;

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: commonColors.primary,
      },
    },
    backgroud: darkMode ? darkColors.background : lightColors.background,
    font: darkColors ? darkColors.font : lightColors.font,
    commonColors,
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default CustomThemeProvider;
