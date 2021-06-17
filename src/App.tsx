import React, { useState } from 'react';
import { useQuery } from 'react-query';
import './App.css';

const fetcher = (url: string) => {
  return fetch(url).then(res => res.json());
}

function Post(props: { id: string, goBack: () => void }) {
  const { data, isLoading } = useQuery(['posts', props.id], () => fetcher(`https://jsonplaceholder.typicode.com/posts/${props.id}`));

  if (isLoading) return <div>Loading ...</div>

  return <div>
    <div onClick={props.goBack}>Go Back</div>
    <h1>{data.title}</h1>
    <p>{data.body}</p>
  </div>
}

function App() {
  const { data: posts, isLoading, isError } = useQuery(['posts'], () => fetcher(`https://jsonplaceholder.typicode.com/posts`));
  const [postId, setPostId] = useState<null | string>(null);

  if (isLoading) return <div>Loading ...</div>
  if (isError) return <div>Error...</div>
  if (postId !== null) return <Post id={postId} goBack={() => setPostId(null)} />

  return (
    <div className="App">
      {posts.map((post: any) => <div onClick={() => setPostId(post.id)} key={post.userId}>
        <span>{post.title}</span>
      </div>)}
    </div>
  );
}

export default App;
