import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  //! Remember to clear CartConext state in CartProvider.js!
  const [orderItems, setOrderItems] = useState({
    customer_id: { $oid: "64249af3f4df2cee8c0c2758" },
    items: [
      {
        product_id: { $oid: "642dd56a163feb4a0795985a" },
        quantity: { $numberInt: "48" },
      },
      {
        product_id: { $oid: "642dd588163feb4a0795985b" },
        quantity: { $numberInt: "12" },
      },
      {
        product_id: { $oid: "642dd5e1163feb4a07959860" },
        quantity: { $numberInt: "6" },
      },
      {
        product_id: { $oid: "642dd622163feb4a07959864" },
        quantity: { $numberInt: "2" },
      },
    ],
  });

  return (
    <CartContext.Provider value={{ orderItems, setOrderItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
