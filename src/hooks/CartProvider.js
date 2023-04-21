import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [orderItems, setOrderItems] = useState(
{
  "customer_id": "64249af3f4df2cee8c0c2758",
  "items": [
    { "product_id": "642dd56a163feb4a0795985a", "quantity": "1", "price": "3.75", "name": "Flagship Ginger Beer", },
    { "product_id": "642dd588163feb4a0795985b", "quantity": "2", "price": "3.50", "name": "Ginger Beer", },
    { "product_id": "642dd5e1163feb4a07959860", "quantity": "3", "price": "5.99", "name": "Spicy Ginger Beer", },
    { "product_id": "643443f37ff3e46ad7644254", "quantity": "4", "price": "3.80", "name": "Ginger Lemonade", },
    { "product_id": "643443f37ff3e46ad7644254", "quantity": "5", "price": "3.80", "name": "Ginger Lemonade", },
  ]
}
  );

  return (
    <CartContext.Provider value={{ orderItems, setOrderItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
