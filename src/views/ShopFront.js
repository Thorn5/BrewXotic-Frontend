import React from 'react'
// import useAsyncAwait from "../customHooks/useAsyncAwait"
import mockApiData from '../customHooks/useMockApiData';

export default function ShopFront() {
  // const baseUrl = "https://api.publicapis.org";
  // const requestEndpoint = "/entries"
  // const requestParams = ``;
  // const url = `${baseUrl}${requestEndpoint}${requestParams}`;
  // const { loading, error, apiData, moduleCalled } = useAsyncAwait(url);
  const { loading, error, apiData, moduleCalled } = mockApiData();

  return (<>
    {loading ? (<p>Loading...</p>) : error ? (`${error}`) : (<div>{apiData && console.log({ apiData, moduleCalled })} </div>)}
    <div>ShopFront</div>
  </>)
}

