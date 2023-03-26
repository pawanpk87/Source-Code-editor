import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { commonColors, darkColors, lightColors } from "./colors";
import { selectDarkMode } from "@/src/app/store/slices/darkModeSlice";
import { useSelector } from "react-redux";

function CustomThemeProvider({ children }) {
  const darkMode = useSelector(selectDarkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: commonColors.primary,
      },
    },
    background: darkMode ? darkColors.background : lightColors.background,
    font: darkMode ? darkColors.font : lightColors.font,
    commonColors,
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default CustomThemeProvider;
