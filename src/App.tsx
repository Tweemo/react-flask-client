import React, { useState, useEffect } from "react";

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
console.log(data.members)
  return (
    <div>

      {typeof data.members === 'undefined' ? (
        <p>loading...</p>
      ) : (
        data.members.map((member: any, i: number) => (
          <p key={i}>{member}</p>
        ))
      )}
    </div>
  )
}

export default App