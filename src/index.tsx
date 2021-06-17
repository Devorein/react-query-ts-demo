import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from './App';
import './index.css';
import client from "./react-query-client";

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
