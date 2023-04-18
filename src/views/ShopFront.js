//todo identify when more than one item is selected
//todo add "add all" card
//todo zero all selection boxes when added
//todo populate context
//todo zero selection when added to card
//todo resolve clashes

import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../hooks/CartProvider";
// import useAsyncAwait from '../hooks/useAsyncAwait';
import mockApiData from "../hooks/useMockApiData";

export default function ShopFront() {
  const customerId = "642df8cc72b64c7447006cb4";
  // const { loading, error, apiData, moduleCalled } = useAsyncAwait("http://localhost:5050/api/products");
  const { loading, error, apiData, moduleCalled } = mockApiData();
  const [selectedQty, setSelectedQty] = useState({});
  const { orderItems, setOrderItems } = useContext(CartContext); //! Remember to clear CartConext state in CartProvider.js!
  // console.log("orderItems Context: ", orderItems);

  const handleQtyChange = (e, id) => {
    const updatedQty = { ...selectedQty, [id]: +e.target.value };
    if (updatedQty[id] === 0) {
      delete updatedQty[id];
    };
    setSelectedQty(updatedQty);
    const cartItem = apiData.find((item) => item._id === id); //pull object details from id. Testing use only.
    console.clear();
    console.log("%c++++++++++++ handleQtyChange ++++++++++++", 'color: #1cd945');
    console.log(`Selected quantity for product ${id} - ${cartItem.name}: ${updatedQty[id]}`);
    console.log("id: ",id);
    console.log("cartItem: ", cartItem); //full product details
    console.log("selectedQty, (previous value): ", selectedQty);
    console.log("updatedQty, (current value): ", updatedQty);
    console.log("%c++++++++++++ /handleQtyChange ++++++++++++", 'color: #1cd945');
  };
  
  const handleCartClick = (e, id) => {
    setOrderItems({
      customer_id: customerId,
      items: [{ product_id: id, quantity: selectedQty.quantity }],
    });
    // Deal with item repition
    console.clear();
    console.log("%c++++++++++++ handleCartClick ++++++++++++", 'color: #c75cd1');
    console.log("orderItems: ", orderItems);
    console.log("selectedQty: ", selectedQty);
    console.log("%c++++++++++++ /handleCartClick ++++++++++++", 'color: #c75cd1');
  };

  const renderCards = () => {
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
            value={selectedQty[item._id] || 0}
            onChange={(e) => handleQtyChange(e, item._id)}
          //   style={{
          //   backgroundColor: selectedQty[item._id] ? 'white' : 'gainsboro',
          //   color: selectedQty[item._id] ? 'black' : 'grey',
          // }}

          >
            {[...Array(item.quantity_available + 1).keys()].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <button onClick={(e) => handleCartClick(e, item._id)}>
            Add to Cart
          </button>
          <p></p>
        </div>
      ));
    }
  };

  return (
    <div>
      <div className="ShopFront">ShopFront</div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        `${error}`
      ) : (
        <div>{apiData && console.assert({ moduleCalled, apiData })}</div> //* changed .log to .assert to reduce annoyance.
      )}
      <div style={{ display: "flex", flexWrap: "wrap" }}>{renderCards()}</div>
    </div>
  );
}

