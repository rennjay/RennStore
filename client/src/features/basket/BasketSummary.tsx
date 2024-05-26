import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import { useShopContext } from "../../app/context/ShopContext";
import { formatCurrency } from "../../app/util/util";

export default function BasketSummary() {
  const { basket } = useShopContext();
  const subtotal =
    basket?.items.reduce(
      (sum, currentBasket) =>
        sum + currentBasket?.price * currentBasket?.quantity,
      0
    ) ?? 0;
  const deliveryFee = subtotal > 10000 ? 0 : 1000;

  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{formatCurrency(subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align="right">{formatCurrency(deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">
                {formatCurrency(subtotal + deliveryFee)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: "italic" }}>
                  *Orders over $100 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
