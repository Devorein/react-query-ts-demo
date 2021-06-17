import React, { useState } from 'react';
import { useQuery } from "react-query";
import './App.css';

interface AppProps { }

function Fetch() {
  const { data, error, isLoading, isError, isFetched, isFetching, isIdle, isSuccess } = useQuery<any, any>('first-request', () => {
    return new Promise((resolve) => setTimeout(() => resolve(Math.random()), 2000))
  });
  return <div>
    <div>
      Data is {data}
    </div>
    <div>
      {JSON.stringify({ isError, error, isLoading, isFetched, isFetching, isIdle, isSuccess }, null, 2)}
    </div>
  </div>
}

function App({ }: AppProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="App">
      <button onClick={() => setIsVisible((visible) => !visible)}>Toggle Visibility</button>
      {isVisible && <Fetch />}
    </div>
  );
}

export default App;
