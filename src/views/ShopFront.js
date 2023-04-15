import React, { useContext, useState } from 'react';
import {CartContext} from '../hooks/CartProvider'
// import useAsyncAwait from '../hooks/useAsyncAwait';
import mockApiData from '../hooks/useMockApiData';

export default function ShopFront() {
  // const { loading, error, apiData, moduleCalled } = useAsyncAwait("http://localhost:5050/api/products");
  const { loading, error, apiData, moduleCalled } = mockApiData();
  const [selectedQty, setSelectedQty] = useState({});
  const [cart, setCart] = useState([]);
  const {orderItems, setOrderItems} = useContext(CartContext);
  console.log("orderItems Context: ", orderItems);

  const handleQtyChange = (e, id) => {
    setSelectedQty({ ...selectedQty, [id]: +e.target.value });  
  };

  const renderCards = () => {
    if (apiData) {
      return apiData.map(item => (
        <div
          key={item._id}
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
          </select>
          <button>Add to Cart</button>
          <p></p>
        </div>
      ));
    }
  };

  return (
    <div>
      <div>ShopFront</div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        `${error}`
      ) : (
        <div>{apiData && console.log({ apiData, moduleCalled })}</div>
      )}
      <div  style={{ display: "flex", flexWrap: "wrap" }}>{renderCards()}</div>
    </div>
  );
}