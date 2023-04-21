import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../hooks/CartProvider";

export default function ShoppingCart() {
  // const { orderItems, setOrderItems } = useContext(CartContext);

  // useEffect(() => {    // * diagnostics
  //   console.log("%c*+*+*+*+*+*+ ShoppingCart useEffect diagnostics *+*+*+*+*+*+", "color: #db7516");
  //   console.log("Context: orderItems:", orderItems);
  //   console.log("%c*+*+*+*+*+*+ /ShoppingCart useEffect diagnostics/ *+*+*+*+*+*+", "color: #db7516");
  // }, [orderItems]);

  // const handlePurchase = async (e) => {
  //   e.preventDefault();
  //   const options = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(orderItems),
  //   };
  //   try {
  //     const response = await fetch(
  //       "https://brewxotic-backend.onrender.com/api/orders",
  //       options
  //     );
  //     if (response.ok) {
  //       setOrderItems({
  //         customer_id: "64249af3f4df2cee8c0c2758",
  //         items: [],
  //       });
  //       console.log("response.ok, orderItems array cleared.");
  //     }
  //   } catch (error) {
  //     console.log({ error });
  //   } finally {
  //     console.log("Order created successfully!");
  //   }
  // };

  // const handleCancel = (e) => {
  //   const emptyShoppingCart = {
  //     customer_id: "64249af3f4df2cee8c0c2758",
  //     first_name: "Trygve",
  //     items: [],
  //   };

  //   setOrderItems(emptyShoppingCart);
  // };

  // return (
  //   <>
  //     <div>ShoppingCart</div>
  //     <div>
  //       {customerLoading || productLoading ? (
  //         <p>Loading...</p>
  //       ) : customerError || productError ? (
  //         `${customerError}${productError}`
  //       ) : (
  //         <>
  //           <p>{customerData && `Hey there ${customerData.first_name}`}</p>
  //           {orderItems && orderItems.items.length > 0 ? (
  //             <>
  //               <p>Your shopping cart has:</p>
  //               {orderItems.items.map((item) => (
  //                 <p key={item.id}>
  //                   {item.quantity} x {item.product_id}
  //                 </p>
  //               ))}
  //               <p>Would you like to purchase the items?</p>
  //               <button onClick={(e) => handlePurchase(e)}>Purchase</button>
  //               <button onClick={(e) => handleCancel(e)}>Cancel</button>
  //             </>
  //           ) : (
  //             <>Your Shopping cart is empty</>
  //           )}
  //         </>
  //       )}
  //     </div>
  //   </>
  // );
}
