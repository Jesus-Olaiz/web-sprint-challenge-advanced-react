import React from 'react'
import {useState} from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4// the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

    const [index, setIndex] = useState(initialIndex)
  const [message, setMessage] = useState(initialMessage)


  const [formData, setFormData] = useState({"x": 2, "y": 2, "steps": initialSteps, "email": initialEmail, "message": initialMessage})



  function getCoords(index) {
    let y = Math.floor(index/3) + 1
    let x = index % 3 + 1

    return [x,y]


    
  }
  

  function reset() {
    // Use this helper to reset all states to their initial values.
    setIndex(initialIndex)
    setFormData({...formData, x: 2, y: 2, email: "",steps: initialSteps, message: ""})
    setMessage("")

  }

  function getNextIndex(direction) {
    if (direction === "left"){
      if((index === 0) || (index === 3) || (index===6)){
        return index 
      }
      return index - 1
    }
    if (direction === "right"){
      if((index === 2) || (index === 5) || (index === 8)){
        return index
      }
      return index + 1
    }
    if (direction === "up"){
      if(index <= 2){
        return index
      }
      return index - 3
    }
    if (direction === "down"){
      if(index >= 6){
        return index
      }
      return index + 3
    }

  }

  function move(evt) {

    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.

    setIndex(getNextIndex(evt.target.id))
    
    

    if(getNextIndex(evt.target.id) === index){
      setMessage(`You can't go ${evt.target.id}`)
    }
    else{
      let coords = getCoords(getNextIndex(evt.target.id))
      setFormData({...formData, steps: formData.steps + 1, x: coords[0], y: coords[1]})
      setMessage("")
    }
   
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setFormData({...formData, [evt.target.id] : evt.target.value})

    
  }

  

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()
    axios.post(`http://localhost:9000/api/result`, formData)
      .then(res => {
        setMessage(res.data.message)
      })
      .catch(err => setMessage(err.response.data.message))
    
    setFormData({...formData, email: ""})
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({formData.x}, {formData.y})</h3>
        <h3 id="steps">You moved {formData.steps} {formData.steps === 1 ? "time" : "times"}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>

      </div>
      <form onSubmit={onSubmit}>
        <input value={formData.email} id="email" type="email" placeholder="type email" onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
