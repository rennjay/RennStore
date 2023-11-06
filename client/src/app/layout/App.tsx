import Catalog from "../../features/catalog/Catalog";
import { CssBaseline } from "@mui/material";
import Header from "./Header";

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Catalog />
    </>
  );
}

export default App;
