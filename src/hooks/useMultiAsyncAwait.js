import { useState, useEffect } from "react";

const useMultiAsyncAwait = (urls) => {
  if (!Array.isArray(urls) || urls.length === 0) {
    throw new Error("Invalid URLs");
  }
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState([]);
  const moduleCalled = "Data fetched using useMultiAsyncAwait";

  const fetchData = async () => {
    setLoading(true);
    try {
      const responses = await Promise.all(
        urls.map((url) => fetch(url))
      );
      const data = await Promise.all(
        responses.map((response) => response.json())
      );
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
  }, [urls]);

  return { loading, error, apiData, moduleCalled };
};

export default useMultiAsyncAwait;


// Bring to parent component:
// const baseUrl = "https://whatever";
// const requestEndpoint = "/end/point/"
// const apiKey = "12345";
// const requestParams = `?api_key=${apiKey}`;
// const url = `${baseUrl}${requestEndpoint}${requestParams}`;

// const { loading, error, apiData, moduleCalled } = useMultiAsyncAwait(["url_1","url_2"]);

// return (<>{loading ? (<p>Loading...</p>) : error ? (`${error}`) : (<div>{apiData && console.log({apiData, moduleCalled})}</div>)}</>)
// map: <ul>{path.map((item, index) => (<li key={index}>{item}</li>))}</ul>
