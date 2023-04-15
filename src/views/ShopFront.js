import React from 'react'
import mockApiData from '../customHooks/useMockApiData';
export default function ShopFront() {
  const { loading, error, apiData, moduleCalled } = mockApiData();
  return (
    <>
      <div>ShopFront</div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (`${error}`) : (
        <div className="grid-container">
          {apiData &&
            apiData.map(item => (
              <div key={item._id} className="grid-item" id={item._id} style={{ backgroundColor: 'lightblue', borderRadius: '7px', boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.2)', width: '13rem' }}>
                <div><img src={item.images.thumbnail} alt={item.name} /></div>
                <div>Name: {item.name}</div>
                <div>Price: €{item.price['$numberDecimal']}</div>
                <div>Quantity Available: {item.quantity_available}</div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}