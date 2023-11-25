import Catalog from "../../features/catalog/Catalog";
import { Container, CssBaseline, createTheme } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

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
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header handleThemeChange={handleThemeChange} isDarkMode={isDarkMode} />
      <Container maxWidth="lg" style={{ paddingTop: "30px" }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
