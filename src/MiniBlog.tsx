import React, { useState } from 'react';
import { useQuery } from 'react-query';
import './App.css';
import client from "./react-query-client";

const fetcher = (url: string) => {
  return fetch(url).then(res => res.json());
}

function Post(props: { id: string, goBack: () => void }) {
  const { data, isLoading } = useQuery(['post', props.id], () => fetcher(`https://jsonplaceholder.typicode.com/posts/${props.id}`));

  if (isLoading) return <div>Loading ...</div>

  return <div>
    <div onClick={props.goBack}>Go Back</div>
    <h1>{data.title}</h1>
    <p>{data.body}</p>
  </div>
}

function MiniBlog() {
  const { data: posts, isLoading, isError } = useQuery(['posts'], () => fetcher(`https://jsonplaceholder.typicode.com/posts`), {
    select: posts => posts.slice(0, 5)
  });
  const [postId, setPostId] = useState<null | string>(null);

  if (isLoading) return <div>Loading ...</div>
  if (isError) return <div>Error...</div>
  if (postId !== null) return <Post id={postId} goBack={() => setPostId(null)} />
  const updatePost = (postId: string) => {
    client.setQueryData(['post', postId], (data: any) => {
      if (data) return {
        ...data,
        title: 'New Title'
      }
    })
  }
  return (
    <div className="MiniBlog">
      {posts.map((post: any) => {
        const cachedPost = client.getQueryData(['post', post.id]);
        return <div key={post.userId}>
          <div onClick={() => setPostId(post.id)}>
            <span>{post.title}</span>
            <span>{cachedPost ? '(visited)' : '(fresh)'}</span>
          </div>
          <button onClick={() => updatePost(post.id)}>Update title</button>
        </div>
      })}
    </div>
  );
}

export default MiniBlog;
