import React, { useContext, useEffect, useState } from "react";
import useAsyncAwait from '../hooks/useAsyncAwait';
import { CartContext } from "../hooks/CartProvider";

export default function ShoppingCart() {
  const { orderItems, setOrderItems } = useContext(CartContext);
  const url1 = "https://brewxotic-backend.onrender.com/api/customers/64249af3f4df2cee8c0c2758";
  const url2 = "https://brewxotic-backend.onrender.com/api/products";

  const useCustomerAsyncAwait = () => {
    return useAsyncAwait(url1);
  };
  const useProductAsyncAwait = () => {
    return useAsyncAwait(url2);
  };
  const {
    loading: customerLoading,
    error: customerError,
    apiData: customerData,
  } = useCustomerAsyncAwait();
  const {
    loading: productLoading,
    error: productError,
    apiData: productData,
  } = useProductAsyncAwait();
  const [productNames, setProductNames] = useState({});
  // const [productPrices, setProductPrices] = useState({});

  useEffect(() => {
    if (productData && productData.length) {
      const names = {};
      productData.forEach((product) => {
        names[product._id] = product.name;
      });
      setProductNames(names);
    }
  }, [productData]);

  // useEffect(() => {
  //   console.log("*+*+*+*+*+*+ useEffect check *+*+*+*+*+*+");
  //   console.log("customerData: ", customerData);
  //   console.log("productData: ", productData);
  //   console.log("orderItems: ", orderItems);
  //   console.log("*+*+*+*+*+*+ /useEffect check/ *+*+*+*+*+*+");
  // }, [customerData, productData, orderItems]);

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
                      {item.quantity} x {productNames[item.product_id]}
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
}

//     const baseUrl = "https://whatever";
//     const requestEndpoint = "/end/point/"
//     const apiKey = "12345";
//     const requestParams = `?api_key=${apiKey}`;
//     const url = `${baseUrl}${requestEndpoint}${requestParams}`;
//     const { loading, error, apiData, moduleCalled } = useAsyncAwait(url);
// using multiple connections:
//     const useCustomerAsyncAwait = () => { return useAsyncAwait(url1) };
//     const useProductAsyncAwait = () => { return useAsyncAwait(url2) };
//     const { loading: customerLoading, error: customerError, apiData: customerData, moduleCalled: customerModuleCalled, } = useCustomerAsyncAwait();
//     const { loading: productLoading, error: productError, apiData: productData, moduleCalled: productModuleCalled, } = useProductAsyncAwait();
//     return (<>{loading ? (<p>Loading...</p>) : error ? (`${error}`) : (<div>{apiData && console.log(apiData, moduleCalled)}</div>)}</>)
//     map: <ul>{path.map((item, index) => (<li key={index}>{item}</li>))}</ul>