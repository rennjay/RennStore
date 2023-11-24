import { Button, Container } from "@mui/material";
import Product from "../../app/models/Product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    agent.Catalog.list().then((data) => setProducts(data));
  }, []);

  return (
    <Container>
      <ProductList products={products} />
    </Container>
  );
}
