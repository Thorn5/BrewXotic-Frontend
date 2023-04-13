import { useState, useEffect } from "react";

const useAsyncAwait = (url) => {
  if (typeof url !== "string" || url.length === 0) {
    throw new Error("Invalid URL");
  }
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState(null);

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
  }, []);

  return { loading, error, apiData };
};

export default useAsyncAwait;

// const { loading, error, apiData } = useAsyncAwait(url);
// return (<>{loading ? (<p>Loading...</p>) : error ? (`${error}`) : (<div>{apiData && console.log({apiData})}</div>)}</>)
// map: <ul>{path.map((item, index) => (<li key={index}>{item}</li>))}</ul>