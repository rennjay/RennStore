import {
  Box,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useShopContext } from "../../app/context/ShopContext";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { useState } from "react";
import BasketSummary from "./BasketSummary";
import { formatCurrency } from "../../app/util/util";

export default function Basket() {
  const { basket, setBasket, removeItemFromBasket } = useShopContext();
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });

  const handleQuantityAdd = (productId: number, name: string) => {
    setStatus({ loading: true, name });
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket.value))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  };

  const handleQuantitySubtract = (
    productId: number,
    quantity: number,
    name: string
  ) => {
    setStatus({ loading: true, name });
    agent.Basket.delete(productId, quantity)
      .then(() => removeItemFromBasket(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  };

  if (!basket) return <Typography variant="h3"></Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignContent="center" alignItems="center">
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ maxWidth: "50px", marginRight: "5px" }}
                    />
                    {item.name}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(item.price)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    color="secondary"
                    loading={
                      status.loading && status.name === "add" + item.name
                    }
                    onClick={() =>
                      handleQuantityAdd(item.productId, "add" + item.name)
                    }
                  >
                    <Add />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    color="secondary"
                    loading={
                      status.loading && status.name === "sub" + item.name
                    }
                    onClick={() =>
                      handleQuantitySubtract(
                        item.productId,
                        1,
                        "sub" + item.name
                      )
                    }
                  >
                    <Remove />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(item.price * item.quantity)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    color="error"
                    loading={
                      status.loading && status.name === "rem" + item.name
                    }
                    onClick={() =>
                      handleQuantitySubtract(
                        item.productId,
                        item.quantity,
                        "rem" + item.name
                      )
                    }
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>
      </Grid>
    </>
  );
}
