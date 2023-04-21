import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../hooks/CartProvider";

export default function ShoppingCart() {
  const { orderItems, setOrderItems } = useContext(CartContext);

  useEffect(() => {    // * diagnostics
    console.log("%c*+*+*+*+*+*+ ShoppingCart useEffect diagnostics *+*+*+*+*+*+", "color: #db7516");
    console.log("Context: orderItems:", orderItems);
    console.log("%c*+*+*+*+*+*+ /ShoppingCart useEffect diagnostics/ *+*+*+*+*+*+", "color: #db7516");
  }, [orderItems]);

  const handlePurchase = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderItems),
    };
    try {
      const response = await fetch(
        // "https://brewxotic-backend.onrender.com/api/orders",
        "http://localhost:5050/api/orders",
        options
      );
      if (response.ok) {
        setOrderItems({
          customer_id: "64249af3f4df2cee8c0c2758",
          first_name: "Trygve",
          items: [],
        });
        console.log("response.ok, orderItems array cleared.");
      }
    } catch (error) {
      console.log({ error });
    } finally {
      console.log("Order created successfully!");
    }
  };

  const handleCancel = (e) => {
    const emptyShoppingCart = {
      customer_id: "64249af3f4df2cee8c0c2758",
      first_name: "Trygve",
      items: [],
    };

    setOrderItems(emptyShoppingCart);
  };

  const totalPrice = orderItems.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <>
      <div>ShoppingCart</div>
      <div>
        <p>      {`Hey there ${orderItems.first_name}`}        </p>
        <div>
          {orderItems && orderItems.items.length > 0 ? (
            <>
              <ol>Your shopping cart has:
                {orderItems.items.map((item, index) => (
                  <li key={index} className="cartitem">
                    {item.quantity} x {item.name} @ €{item.price} - Subtotal = €{item.quantity * item.price}
                  </li>
                ))}
              </ol>
              <p>Total Price: €{totalPrice}</p>
              <p>Would you like to purchase the items?</p>
              <button onClick={(e) => handlePurchase(e)}>Purchase</button>
              <button onClick={(e) => handleCancel(e)}>Cancel</button>
            </>
          ) : (
            <>Your Shopping cart is empty</>
          )}
        </div>
      </div>
    </>
  );
}
