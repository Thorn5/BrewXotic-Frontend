import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../hooks/CartProvider";
import useAsyncAwait from "../hooks/useAsyncAwait"
import useMockApiData from "../hooks/useMockApiData";


export default function ShopFront() {
  const [selectedItems, setSelectedItems] = useState({});
  const [visState, setVisState] = useState("hidden");
  const { orderItems, setOrderItems } = useContext(CartContext);

  const { // * fetch mock product data
    loading: productLoading,
    error: productError,
    apiData: productData,
    moduleCalled: productModuleCalled,
  } = useMockApiData();

  // const productUrl = "https://brewxotic-backend.onrender.com/api/products";
  // const productUrl = "http://localhost:5050/api/products";
  // const customerUrl = "https://brewxotic-backend.onrender.com/api/customers/64249af3f4df2cee8c0c2758";
  // const customerUrl = "http://localhost:5050/api/customers/64249af3f4df2cee8c0c2758";

  // const { // * fetch product data
  //   loading: productLoading,
  //   error: productError,
  //   apiData: productData,
  //   moduleCalled: productModuleCalled,
  // } = useAsyncAwait(productUrl);

  // const { // * fetch customer data
  //   loading: customerLoading,
  //   error: customerError,
  //   apiData: customerData,
  //   moduleCalled: customerModuleCalled,
  // } = useAsyncAwait(customerUrl);

  useEffect(() => { // * API diagnostics
    console.log("%c*+*+*+*+*+*+ API useEffect diagnostics *+*+*+*+*+*+", "color: #35e859");
    // console.log("Customer", customerModuleCalled, customerData);
    console.log("Product", productModuleCalled, productData);
    console.log("orderItems:", orderItems);
    console.log("%c*+*+*+*+*+*+ /API useEffect diagnostics/ *+*+*+*+*+*+", "color: #35e859");
  }, [ /* customerModuleCalled, */   /* customerData, */  productModuleCalled, productData, orderItems,]);

  const handleQtyChange = (e, id) => { // * When a customer selects an item quantity
    const displayQuantity = e.target.value;
    console.log("displayQuantity:", displayQuantity);
    if (displayQuantity === '0') { // * Remove from selectedItems if qty = 0
      const { [id]: _, ...newSelectedItems } = selectedItems;
      setSelectedItems(newSelectedItems);
    } else { // * else add the item(s) to the selectedItems array
      setSelectedItems({ ...selectedItems, [id]: displayQuantity });
    }
    // if (visState === "hidden" && Object.keys(selectedItems).length > 3) {// * If more than one item selected, make bulk purchase button visible
    //   setVisState("visible");
    // } 
    // if (visState = "visible" && Object.keys(selectedItems).length < 2) {
    //   setVisState("hidden");
    // }
    if (Object.keys(selectedItems).length > 0) {
      setVisState("visible");
    } else {
      setVisState("hidden");
    }
  };

  useEffect(() => { // * handleQtyChange diagnostics
    console.log("%c*+*+*+*+*+*+ handleQtyChange useEffect diagnostics *+*+*+*+*+*+", "color: #21b0db");
    console.log("selectedItems:", selectedItems);
    console.log("Object.keys(selectedItems).length:", Object.keys(selectedItems).length);
    console.log("visState:", visState);
    console.log("%c*+*+*+*+*+*+ /handleQtyChange useEffect diagnostics/ *+*+*+*+*+*+", "color: #21b0db");
  }, [selectedItems, visState]);

  const handleCartClick = (e, id) => { // * When a customer clicks "Add to Cart"
    const itemData = productData.find(product => product._id === id);
    const itemToPush = { product_id: id, quantity: selectedItems[id], price: itemData.price, name: itemData.name };
    if (itemToPush.quantity !== undefined) {
      console.log("itemToPush.quantity is defined, processing push!");
      if (itemToPush.quantity > 0 && orderItems.items.length > 0) {
        console.log("orderItems.items.length > 0, applying filter");
        const filteredItems = orderItems.items.filter((item) => item.product_id !== id);
        filteredItems.push(itemToPush);
        const processedOrderItems = { ...orderItems, items: filteredItems };
        setOrderItems(processedOrderItems);
      } if (orderItems.items.length === 0) {
        console.log("current orderItems.items.length = 0, no need to filter");
        setOrderItems({ ...orderItems, items: [itemToPush] });
      }
    } else {
      console.log("itemToPush.quantity undefined, assuming zero, removing item from cart");
      const filteredItems = orderItems.items.filter(item => item.product_id !== id);
      setOrderItems(prevState => ({ ...prevState, items: filteredItems }));
    }
    // todo resetSelectionBox
  };

  const handleAllToCartClick = (e, id) => { // * When a customer clicks "Add all selected items to Cart"
  };

  const renderCards = () => { // * Product card render template
    if (productData) {
      return productData.map((item) => (
        <div
          key={item._id}
          className="product_card"
          id={item._id}
          style={{
            width: "33rem",
            margin: "0.5rem",
            backgroundColor: "lightblue",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px grey",
            textAlign: "center",
          }}
        >
          <h3>{item.name}</h3>
          <img src={item.images.thumbnail} alt={item.name} />
          `<h3>Price: €${item.price.toFixed(2)}</h3>`

          <select
            id={`qty_${item._id}`}
            value={selectedItems[item._id]}
            onChange={(e) => handleQtyChange(e, item._id)}
          >
            {[...Array(item.quantity_available + 1).keys()].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <button onClick={(e) => handleCartClick(e, item._id)}>
            Add to Cart
          </button>
          <p>
            <button
              style={{ visibility: visState }}
              onClick={(e) => handleAllToCartClick(e, item._id)}
            >
              Add all selected items to Cart
            </button>
          </p>
        </div>
      ));
    }
  };

  if ( // * Show Loading
    // customerLoading || 
    productLoading) {
    return "Page loading";
  };

  if ( // * Display error
    // customerError || 
    productError) {
    return "Error while loading data!";
  };

  return ( // * Display ShopFront page and render cards
    <div>
      <div className="ShopFront">BrewXotic ShopFront</div>
      <div className="ShopFront">{`Greetings ${orderItems.first_name}`}</div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>{renderCards()}</div>
    </div>
  );
}
