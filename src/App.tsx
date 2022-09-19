import React, { useState, useEffect } from "react";
import FoodForm from "./Form";

function App() {

  const [data, setData] = useState({"members": []});

  useEffect(() => { 
    fetch("/members").then (
      res => res.json()
    ).then(
      data => {
      setData(data)
      console.log(data)
      }
    )
  }, [])

  return (
    <div>

      {typeof data.members === 'undefined' ? (
        <p>loading...</p>
      ) : (
        data.members.map((member: any, i: number) => (
          <p key={i}>{member}</p>
        ))
      )}
      <FoodForm />
    </div>
  )
}

export default App