import { Typography } from "@mui/material";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Basket } from "../../app/models/Basket";

export default function Basket() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [basket, setBasket] = useState<Basket | null>(null);

  useEffect(() => {
    agent.Basket.get()
      .then((basketResponse) => setBasket(basketResponse))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingComponent message="Loading Basket..." />;

  if (!basket) return <Typography variant="h3"></Typography>;

  return <Typography variant="h3">BuyerId: {basket.buyerId}</Typography>;
}
