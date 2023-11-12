import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Product from "../../app/models/Product";
//TODO: geturlid from search bar
// load product
// call from axios
// loading state
export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <h4>Loading...</h4>;

  if (!product) return <h4>No Product Found!</h4>;

  return <Typography variant="h2">{product.name}</Typography>;
}
