import React, { createContext, useState } from "react";

// Create a context
// export const CartContext = React.createContext();
export const CartContext = createContext();

// Create a component that will provide the context
const CartProvider = ({ children }) => {
  const [orderItems, setOrderItems] = useState([
    {
      qty: 7,
      product: {
        _id: "642dd5c3163feb4a0795985e",
        name: "Ginger Beer Concentrate",
        description:
          "Our ginger beer concentrate is perfect for making homemade ginger beer or adding a spicy kick to your favorite cocktails. Made with real ginger and natural ingredients.",
        images: {
          full_size:
            "https://i.postimg.cc/gJLVTP9F/Ginger-Beer-Concentrate.jpg",
          thumbnail:
            "https://i.postimg.cc/Q9sKFwx0/Ginger-Beer-Concentrate.jpg",
        },
        price: { $numberDecimal: "45.99" },
        quantity_available: 5,
      },
    },
    {
      qty: 4,
      product: {
        _id: "643443f37ff3e46ad7644254",
        name: "Ginger Lemonade",
        description:
          "A refreshing and zesty drink made with fresh ginger, lemon juice and sparkling water. No added sugar or artificial flavors.",
        images: {
          full_size: "https://i.postimg.cc/W4Fq2650/Ginger-Lemonade.jpg",
          thumbnail: "https://i.postimg.cc/942QbT5f/Ginger-Lemonade.jpg",
        },
        price: { $numberDecimal: "3.80" },
        quantity_available: 12,
      },
    },
  ]);

  return (
    <CartContext.Provider value={{ orderItems, setOrderItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;