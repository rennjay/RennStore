import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import Product from "../../app/models/Product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              {product.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={product.name}
          titleTypographyProps={{
            sx: { fontWeight: "bold", color: "primary.main" },
          }}
        />
        <CardMedia
          sx={{
            backgroundSize: "contain",
            height: 140,
            bgcolor: "primary.light",
          }}
          image={product.pictureUrl}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="secondary"
          >
            ${(product.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">ADD TO CART</Button>
          <Button size="small">VIEW</Button>
        </CardActions>
      </Card>
    </>
  );
}
