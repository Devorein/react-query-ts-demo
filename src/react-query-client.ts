import { QueryClient } from "react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 10000,
      staleTime: Infinity
    }
  }
});
export default client;