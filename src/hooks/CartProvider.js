import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [orderItems, setOrderItems] = useState(
    {
      "customer_id": "64249af3f4df2cee8c0c2758",
      "items": [
        // { "product_id": "642dd56a163feb4a0795985a", "quantity": 1 },
        // { "product_id": "642dd588163feb4a0795985b", "quantity": 2 },
        // { "product_id": "642dd594163feb4a0795985c", "quantity": 3 },
        // { "product_id": "642dd5c3163feb4a0795985e", "quantity": 4 },
        // { "product_id": "642dd5d3163feb4a0795985f", "quantity": 5 },
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
