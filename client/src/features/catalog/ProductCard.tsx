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
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToBasket = (productId: number) => {
    setIsLoading(true);
    agent.Basket.addItem(productId)
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

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
          <LoadingButton
            loading={isLoading}
            onClick={() => handleAddToBasket(product.id)}
            size="small"
          >
            ADD TO CART
          </LoadingButton>
          <Button size="small" component={Link} to={"/catalog/" + product.id}>
            VIEW
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
