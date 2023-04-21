import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../hooks/CartProvider";
import useAsyncAwait from '../hooks/useAsyncAwait';
// import mockApiData from "../hooks/useMockApiData";

export default function ShopFront() {
  const [selectedItems, setSelectedItems] = useState({});
  const [visState, setVisState] = useState("hidden");
  const { orderItems, setOrderItems } = useContext(CartContext);
  const url = "https://brewxotic-backend.onrender.com/api/products";
  const { loading, error, apiData, moduleCalled } = useAsyncAwait(url);
  // const { loading, error, apiData, moduleCalled } = mockApiData();

  const handleQtyChange = (e, id) => { // * When a customer selects an item quantity
    const displayQuantity = e.target.value;
    if (displayQuantity === 0) {
      const { [id]: _, ...newSelectedItems } = selectedItems;
      setSelectedItems(newSelectedItems);
    } else {
      setSelectedItems({ ...selectedItems, [id]: displayQuantity });
    }
    if (Object.keys(selectedItems).length > 1) {
      // If more than one quantity selected, make bulk purchase button visible
      setVisState("visible");
    } else {
      setVisState("hidden");
    }
    // Convert selectedItems quantity from string to number
    for (let key in selectedItems) {
      selectedItems[key] = parseInt(selectedItems[key]);
      console.log("converted selectedItems: ", selectedItems);
    }
  };

  const handleCartClick = (e, id) => { // * When a customer clicks "Add to Cart"
    const itemToPush = { product_id: id, quantity: selectedItems[id] };
    if (itemToPush.quantity !== undefined) {
      console.log("itemToPush.quantity is defined, processing push!");
      if (orderItems.items.length > 0) {
        console.log("orderItems.items.length > 0, applying filter");
        const filteredItems = orderItems.items.filter(
          (item) => item.product_id !== itemToPush.product_id
        );
        filteredItems.push(itemToPush);
        const processedOrderItems = { ...orderItems, items: filteredItems };
        setOrderItems(processedOrderItems);
      } else {
        console.log("orderItems.items.length = 0, no need to filter");
        setOrderItems({ ...orderItems, items: [itemToPush] });
      }
    } else {
      console.log("itemToPush.quantity selected... nothign to do");
    }
    // todo resetSelectionBox
  };

  const handleAllToCartClick = (e, id) => { // * When a customer clicks "Add all selected items to Cart"
  };

  useEffect(() => { // * diagnostics
    console.log("%c*+*+*+*+*+*+ ShopFront useEffect diagnostics *+*+*+*+*+*+", "color: #35e859");
    console.log(moduleCalled, apiData);
    console.log("orderItems: ", orderItems);
    console.log("%c*+*+*+*+*+*+ /ShopFront useEffect diagnostics/ *+*+*+*+*+*+", "color: #35e859");
  }, [apiData, orderItems]);

  if (loading) { // * Display loading notification
    return("Page loading")
  };
  
  if (error) { // * Display error notification
    return ("Error while loading data!")
  }

  const renderCards = () => { // * Product card render template
    if (apiData) {
      return apiData.map((item) => (
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
          <h3>Price: €{item.price.$numberDecimal}</h3>

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
    
  return ( // * Display ShopFront page and render cards
  <div>
      <div className="ShopFront">BrewXotic ShopFront</div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>{renderCards()}</div>
    </div>
  );
}

// todo change data shape
// * change schema
// * change code
// * check post
// todo fix price display
// ! Why can't I zero the selection box!
// * write new items to context
// * Cart buttons revert
// * add indicator to cart buttons
// * move on
// todo zero all selection boxes when added to context
// todo zero selection when added to card
// todo resolve clashes
// todo populate shopping cart view
// todo add purchase
// todo move to convirmation view
