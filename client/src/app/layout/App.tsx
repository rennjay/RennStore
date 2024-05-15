import { Container, CssBaseline, createTheme } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useShopContext } from "../context/ShopContext";
import LoadingComponent from "./LoadingComponent";
import agent from "../api/agent";
import { getCookie } from "../util/util";

function App() {
  const [isDarkMode, setDarkMode] = useState(false);
  const { setBasket } = useShopContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const buyerId = getCookie("buyerId");

    if (buyerId) {
      agent.Basket.get()
        .then((basket) => {
          setBasket(basket);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setBasket]);

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

  if (loading) return <LoadingComponent message="Initializing app data" />;

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
