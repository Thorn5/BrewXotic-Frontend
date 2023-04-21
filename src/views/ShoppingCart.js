import React, { useContext, useEffect, useState } from "react";
import useAsyncAwait from '../hooks/useAsyncAwait';
import { CartContext } from "../hooks/CartProvider";

export default function ShoppingCart() {
  const { orderItems, setOrderItems } = useContext(CartContext);
  const url1 = "https://brewxotic-backend.onrender.com/api/customers/64249af3f4df2cee8c0c2758";
  const url2 = "https://brewxotic-backend.onrender.com/api/products";

  const useCustomerAsyncAwait = () => { // * fetch customer by id
    return useAsyncAwait(url1);
  };

  const useProductAsyncAwait = () => { // * fetch products
    return useAsyncAwait(url2);
  };

  const { // * setup useCustomerAsyncAwait
    loading: customerLoading,
    error: customerError,
    apiData: customerData,
    moduleCalled: customerModuleCalled,
  } = useCustomerAsyncAwait();

  const { // * setup useProductAsyncAwait
    loading: productLoading,
    error: productError,
    apiData: productData,
    moduleCalled: productModuleCalled,
  } = useProductAsyncAwait();

  useEffect(() => { // * diagnostics
    console.log("%c*+*+*+*+*+*+ ShoppingCart useEffect diagnostics *+*+*+*+*+*+", "color: #db7516");
    console.log("Customer",customerModuleCalled, customerData);
    console.log("Product",productModuleCalled, productData);
    console.log("orderItems:", orderItems);
    console.log("%c*+*+*+*+*+*+ /ShoppingCart useEffect diagnostics/ *+*+*+*+*+*+", "color: #db7516");
  }, [customerData, productData, orderItems]);

  const handlePurchase = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderItems),
    };
    try {
      const response = await fetch("https://brewxotic-backend.onrender.com/api/orders", options);
      if (response.ok) {
        setOrderItems({
          "customer_id": "64249af3f4df2cee8c0c2758",
          "items": []
        });
        console.log("response.ok, orderItems array cleared.");
      }
    } catch (error) {
      console.log({ error });
    } finally {
      console.log("Order created successfully!");
    }
  }

  const handleCancel = (e) => {
    const emptyShoppingCart = {
      customer_id: "64249af3f4df2cee8c0c2758",
      items: [],
    };

    setOrderItems(emptyShoppingCart);
  };

  return (
    <>
      <div>ShoppingCart</div>
      <div>
        {customerLoading || productLoading ? (
          <p>Loading...</p>
        ) : customerError || productError ? (
          `${customerError}${productError}`
        ) : (
          <>
            <p>{customerData && `Hey there ${customerData.first_name}`}</p>
            {orderItems && orderItems.items.length > 0 ? (
              <>
                <p>Your shopping cart has:</p>
                {orderItems.items.map((item) => (
                  <p key={item.id}>
                    {item.quantity} x {item.product_id}
                  </p>
                ))}
                <p>Would you like to purchase the items?</p>
                <button onClick={(e) => handlePurchase(e)}>Purchase</button>
                <button onClick={(e) => handleCancel(e)}>Cancel</button>
              </>
            ) : (<>Your Shopping cart is empty</>)}
          </>
        )}
      </div>
    </>
  );
}
