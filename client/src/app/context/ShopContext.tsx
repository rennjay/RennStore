import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../models/Basket";

interface IShopContext {
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  removeItemFromBasket: (productId: number, quantity: number) => void;
}

export const ShopContext = createContext<IShopContext | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useShopContext = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("ShopContext is undefined. Provider is missing?");
  }

  return context;
};

export const ShopContextProvider = ({ children }: PropsWithChildren) => {
  const [basket, setBasket] = useState<Basket | undefined>(undefined);

  const removeItemFromBasket = (productId: number, quantity: number) => {
    if (!basket) return;

    const items = [...basket.items];
    const itemIndex = basket.items.findIndex((i) => i.productId === productId);
    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quantity;

      if (items[itemIndex].quantity === 0) {
        items.splice(itemIndex, 1);
        setBasket((prevState) => ({ ...prevState!, items: items }));
      }
    }
  };

  return (
    <ShopContext.Provider
      value={{
        basket: basket!,
        setBasket: setBasket,
        removeItemFromBasket: removeItemFromBasket,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
