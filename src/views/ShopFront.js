import React from 'react'
import useAsyncAwait from "../customHooks/useAsyncAwait"

export default function ShopFront() {
  const { loading, error, apiData } = useAsyncAwait(url);
  return (<>{loading ? (<p>Loading...</p>) : error ? (`${error}`) : (<div>{apiData && console.log({ apiData })}
    <ul>{path.map((item, index) => (<li key={index}>{item}</li>))}</ul>
  </div>)}</>)
}


