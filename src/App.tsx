import React from 'react';
import { useMutation } from "react-query";
import './App.css';

const timer = (duration: number, variables: Record<string, any>) => new Promise((resolve) => setTimeout(() => {
  console.log(`Mutation Running with variables ${JSON.stringify(variables, null, 2)}`)
  resolve('Data received')
}, duration))

function App() {
  const mutation = useMutation((variables: Record<string, any>) => timer(1000, variables), {
    onSuccess(data) {
      console.log(`Data: ${data}`)
    },
    onError(error) {
      console.log(`An error occurred, ${error}`)
    },
    onSettled(data, error) {
      console.log({ data, error })
    }
  });

  async function callMutation() {
    console.log("Calling mutation")
    await mutation.mutateAsync({
      input: {
        name: 'Devorein'
      }
    });
    console.log("Mutation ran")
  }

  return (
    <div onClick={callMutation} className="App">
      Hello World
    </div>
  );
}

export default App;
