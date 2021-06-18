import React, { useState } from 'react';
import { useMutation, useQuery } from "react-query";
import './App.css';

interface ITodo {
  activity: string
  done: boolean
  id: string
}

function App() {
  const [todo, setTodo] = useState('');

  const { data, isLoading, isError } = useQuery<{
    todos: ITodo[]
  }>(['todos'], () => {
    return fetch(`http://localhost:5000/todos`).then((res) => res.json())
  })

  const mutation = useMutation((variables: {
    data: Omit<ITodo, "id">
  }) => {
    return fetch(`http://localhost:5000/add-todo`, {
      method: 'POSt',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(variables)
    })
  }, {
    onSuccess(data) {
      console.log(`Data: ${data}`)
    },
    onError(error) {
      console.log(`An error occurred, ${error}`)
    }
  });

  async function callMutation() {
    await mutation.mutateAsync({
      data: {
        activity: todo,
        done: false
      }
    });
  }

  if (isLoading) return <div>Fetching todos ...</div>
  if (isError) return <div>Error fetching todos</div>

  return (
    <div className="Langs">
      <input value={todo} onChange={(e) => setTodo(e.target.value)} />
      <button onClick={callMutation}>Create</button>
      {data && data.todos.map(todo => <div key={todo.id}>
        <span>Activity: {todo.activity}</span>
        <span>Done: {todo.done}</span>
        <span>x</span>
      </div>)}
    </div>
  );
}

export default App;
