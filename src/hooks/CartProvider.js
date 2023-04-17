import React, { createContext, useState } from "react";

// Create a context
// export const CartContext = React.createContext();
export const CartContext = createContext();

// Create a component that will provide the context
const CartProvider = ({ children }) => {
  //! Remember to clear CartConext state in CartProvider.js!
  const [orderItems, setOrderItems] = useState(
    {
      orderDetails: {
        qty: 3,
        customer: {
          _id: { $oid: "64249af3f4df2cee8c0c2758" },
          first_name: "Trygve",
          surname: "Horn",
          address: {
            street: "Eifelstraße",
            house_number: "37a",
            postal_code: "42699",
            city: "Solingen",
            country: "Germany",
          },
          contact_details: {
            email: "tryghorn+dbtest@gmail.com",
            landline: "021264763450",
            cell: "01704738434",
          },
          payment_details: {
            preferred_method: "bank transfer",
            IBAN: "DE893704004405320130001",
            bank: "BundesBank",
          },
        },
      },
      items: [
        {
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
  ]
    },  );

  return (
    <CartContext.Provider value={{ orderItems, setOrderItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
