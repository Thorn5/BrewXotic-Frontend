import React from 'react'
// import useAsyncAwait from "../customHooks/useAsyncAwait"
import mockApiData from '../customHooks/useMockApiData';

export default function ShopFront() {
  // const apiKey = "";
  // const requestParams = ``;
  // const baseUrl = "https://api.publicapis.org";
  // const requestEndpoint = "/entries"
  // const url = `${baseUrl}${requestEndpoint}${requestParams}`;
  // const { loading, error, apiData } = useAsyncAwait(url);
  const { loading, error, apiData } = mockApiData();

  return (<>
    {loading ? (<p>Loading...</p>) : error ? (`${error}`) : (<div>{apiData && console.log({ apiData })} </div>)}
    <div>ShopFront</div>
  </>)
}

