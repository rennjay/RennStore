import Catalog from "../../features/catalog/Catalog";
import { CssBaseline, createTheme } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";

function App() {
  const [isDarkMode, setDarkMode] = useState(false);
  const paletteType = isDarkMode ? "dark" : "light";
  const themeContext = createTheme({
    palette: {
      mode: paletteType,
    },
  });

  function handleThemeChange() {
    setDarkMode(!isDarkMode);
  }
  return (
    <ThemeProvider theme={themeContext}>
      <CssBaseline />
      <Header handleThemeChange={handleThemeChange} isDarkMode={isDarkMode} />
      <Catalog />
    </ThemeProvider>
  );
}

export default App;
