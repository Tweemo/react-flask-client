import React, { useState, useEffect } from "react";
import FoodForm from "./Form";

function App() {

  const [food, setFood] = useState([]);

  useEffect(() => { 
    fetch("/pantry").then(
      res => res.json()
    ).then(
      food => {
      setFood(food.pantry)
      }
    )
  }, [])

  return (
    <div>
      <FoodForm />
      {typeof food === 'undefined' ? (
        <p>loading...</p>
        ) : (
          food.map((item: any, i: number) => (
            <p key={i}>{item.food}</p>
            ))
            )}
    </div>
  )
}

export default App