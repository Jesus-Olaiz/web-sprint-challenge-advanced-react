import React from 'react'
import axios from 'axios'



// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
  x: 2,
  y: 2,
  error: initialMessage
}

export default class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState
    this.move = this.move.bind(this)
    this.getNextIndex = this.getNextIndex.bind(this)
    this.reset = this.reset.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  


  reset() {
    this.setState({index: 4, steps: 0})
    this.getCoords(initialIndex)
    this.setState({email: "", message: ""})
  }

  

  getNextIndex(direction) {
    if (direction === "left"){
      if((this.state.index === 0) || (this.state.index === 3) || (this.state.index===6)){
        return this.state.index 
      }
      this.setState({steps : this.state.steps + 1})
      return this.state.index - 1
    }
    if (direction === "right"){
      if((this.state.index === 2) || (this.state.index === 5) || (this.state.index === 8)){
        return this.state.index
      }
      this.setState({steps : this.state.steps + 1})
      return this.state.index + 1
    }
    if (direction === "up"){
      if(this.state.index <= 2){
        return this.state.index
      }
      this.setState({steps : this.state.steps + 1})
      return this.state.index - 3
    }
    if (direction === "down"){
      // YOU WERE MESSING WITH THIS ONE TO SEE IF THE VALUE CHANGED APPROPRIATELY
      if(this.state.index >= 6){
        return this.state.index
      }
      this.setState({steps : this.state.steps + 1})
      return this.state.index + 3
    }

  }

  getCoords(index) {
    let y = Math.floor(index/3) + 1
    let x = index % 3 + 1

    this.setState({x : x, y : y})


    
  }

  move(evt) {
    this.setState({index : this.getNextIndex(evt.target.id)})
    
    this.getCoords(this.getNextIndex(evt.target.id))
    
    if(this.getNextIndex(evt.target.id) === this.state.index){
      this.setState({message: `You can't go ${evt.target.id}`})
    }else{
      this.setState({message: ""})
    }
  }

  onChange(evt) {
    this.setState({[evt.target.id] : evt.target.value})
    console.log(this.state.email)
  }


  onSubmit(evt) {
    evt.preventDefault()
    axios.post(`http://localhost:9000/api/result`, this.state)
    .then(res => this.setState({message: res.data.message}))
    .catch(err => this.setState({message: err.response.data.message}))

    this.setState({email: ""})
  }
  

  

  render() {
    const {className} = this.props
    
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps === 1 ? "time" : "times"}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.move} id="left">LEFT</button>
          <button onClick={this.move} id="up">UP</button>
          <button onClick={this.move} id="right">RIGHT</button>
          <button onClick={this.move} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange} value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
