import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../hooks/CartProvider'
// import useAsyncAwait from '../hooks/useAsyncAwait';
import mockApiData from '../hooks/useMockApiData';

export default function ShopFront() {
  // const { loading, error, apiData, moduleCalled } = useAsyncAwait("http://localhost:5050/api/products");
  const { loading, error, apiData, moduleCalled } = mockApiData();
  const [selectedQty, setSelectedQty] = useState({});
  const [cart, setCart] = useState([]);
  const { orderItems, setOrderItems } = useContext(CartContext); //! Remember to clear CartConext state in CartProvider.js!
  console.log("orderItems Context: ", orderItems);

  const handleQtyChange = (e, id) => {
    const updatedQty = { ...selectedQty, [id]: +e.target.value };
    setSelectedQty(updatedQty);
    console.log(`Selected quantity for product ${id}:`, updatedQty[id]);
    const cartItem = apiData.find(item => item._id === id);
    console.log(cartItem);
  };

  const renderCards = () => {
    if (apiData) {
      return apiData.map(item => (
        <div
          key={item._id}
          className="product_card"
          id={item._id}
          style={{
            width: "28rem",
            margin: "0.5rem",
            backgroundColor: "lightblue",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px grey",
            textAlign: "center"
          }}
        >
          <h3>{item.name}</h3>
          <img src={item.images.thumbnail} alt={item.name} />
          <h3>Price: €{item.price.$numberDecimal}</h3>

          <select value={selectedQty[item._id] || 0} onChange={e => handleQtyChange(e, item._id)}>
            {[...Array(item.quantity_available).keys()].map(num => (
              <option key={num} value={num + 1}>
                {num + 1}
              </option>
            ))}
            console.log(selectedQty);
          </select>
          <button>Add to Cart</button>
          <p></p>
        </div>
      ));
    }
  };

  return (
    <div>
      <div className='ShopFront'>ShopFront</div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        `${error}`
      ) : (
        <div>{apiData && console.log({ moduleCalled, apiData })}</div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap" }}>{renderCards()}</div>
    </div>
  );
}