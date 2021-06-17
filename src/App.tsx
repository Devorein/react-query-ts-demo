import React, { useState } from 'react';
import { useQuery } from "react-query";
import './App.css';

interface AppProps { }

const fetcher = (repo: string) => {
  return fetch(`https://api.github.com/repos/${repo}`).then(res => res.json());
}

function Fetch(props: { repoName: string }) {
  const { data, isLoading } = useQuery<any, any>(['github-data', props.repoName], () => fetcher(props.repoName));
  return <div>
    <div style={{ fontWeight: 'bold' }}>
      {!isLoading ? data && <div><div>Name: {data.name}</div><div>Description: {data.description}</div><div>Stars: {data.stargazers_count}</div></div> : "Loading"}
    </div>
  </div>
}

function App({ }: AppProps) {
  const [repoName, setRepoName] = useState('')
  return (
    <div className="App">
      <input type="text" onChange={(e) => setRepoName(e.target.value)} value={repoName} />
      <Fetch repoName={repoName} />
    </div>
  );
}

export default App;
