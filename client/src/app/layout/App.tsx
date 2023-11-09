import Catalog from "../../features/catalog/Catalog";
import { CssBaseline, createTheme } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { Outlet } from "react-router-dom";

function App() {
  const [isDarkMode, setDarkMode] = useState(false);
  const paletteType = isDarkMode ? "dark" : "light";
  const themeContext = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType == "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!isDarkMode);
  }
  return (
    <ThemeProvider theme={themeContext}>
      <CssBaseline />
      <Header handleThemeChange={handleThemeChange} isDarkMode={isDarkMode} />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
