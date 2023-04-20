import { useState, useEffect } from "react";

const useAsyncAwait = (url) => {
  if (typeof url !== "string" || url.length === 0) {
    throw new Error("Invalid URL");
  }
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState(null);
  const moduleCalled = "Data fetched using useAsyncAwait";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      setError(error.message);
      console.log({ error });
    } finally {
      setLoading(false);
    }
    
  };

  useEffect(() => {
    fetchData();
  },   []  );

  return { loading, error, apiData, moduleCalled };
};

export default useAsyncAwait;

// Bring to parent component:
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