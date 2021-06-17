import React from 'react';
import { useQuery } from "react-query";
import './App.css';

interface AppProps { }

function App({ }: AppProps) {
  const { data, error, isLoading, isError, isFetched, isFetching, isIdle, isSuccess } = useQuery<any, any>('first-request', () => {
    return Promise.reject(5)
  });

  return (
    <div className="App">
      {JSON.stringify({ isError, isFetched, isFetching, isIdle, isSuccess }, null, 2)}
    </div>
  );
}

export default App;
