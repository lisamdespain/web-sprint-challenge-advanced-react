import React from 'react'
import axios from 'axios';

export default class AppClass extends React.Component {
  initialValues = {
    x: 2,
    y: 2,
    message: '',
    grid: ['','','','','B','','','',''],
    totalTurns: 0,
    email: '', 
    inputValue:''
  }
  
  state = this.initialValues;

  leftClick = (x, y) =>{
    if (x === 2 || x === 3) {
      const leftX = this.state.x - 1;
      return this.newIdx(leftX, y);      
      } else {
        return this.setState({
          ...this.state,
          message: "You can't go left"})
      }
  }

  rightClick = (x, y) =>{
    if (x === 1 || x === 2) {
      const rightX = this.state.x + 1;
      return this.newIdx(rightX, y)
      } else {
        return this.setState({
          ...this.state,
          message: "You can't go right"
        })
      }
  }

  upClick = (x, y) =>{
    if (y === 2 || y === 3) {
      const upY = this.state.y - 1;
      return this.newIdx(x, upY)
      } else {
        this.setState({
          ...this.state,
          message: "You can't go up"
        })      }
  }

  downClick = (x, y) =>{
    if (y === 1 || y === 2) {
    const downY = this.state.y + 1;
      return this.newIdx(x, downY)
      } else {
        this.setState({
          ...this.state,
          message: "You can't go down"
        })
      }
  }

  resetClick = () =>{
    const emailInput = document.getElementById('email');
    emailInput.value = '';
    return this.setState(this.initialValues);
  }

  newIdx = (x, y) =>{
    const turnTotal = this.state.totalTurns + 1;
    if (x === 1 && y === 1){
    return this.setState({
      ...this.state,
      x: 1,
      y: 1,
      message: '',
      grid: ['B','','','','','','','',''],
      totalTurns: turnTotal
      });
  } else if (x === 2 && y === 1){
    return this.setState({
      ...this.state,
      x: 2,
      y: 1,
      message: '',
      grid: ['','B','','','','','','',''],
      totalTurns: turnTotal});
  } else if (x === 3 && y === 1){
    return this.setState({
      ...this.state,
      x: 3,
      y: 1,
      message: '',
      grid: ['','','B','','','','','',''],
      totalTurns: turnTotal});
  } else if (x === 1 && y === 2){
    return this.setState({
      ...this.state,
      x: 1,
      y: 2,
      message: '',
      grid: ['','','','B','','','','',''],
      totalTurns: turnTotal});
  } else if (x === 2 && y === 2){
    return this.setState({
      ...this.state,
      x: 2,
      y: 2,
      grid: ['','','','','B','','','',''],
      totalTurns: turnTotal});
  } else if (x === 3 && y === 2){
    return this.setState({
      ...this.state,
      x: 3,
      y: 2,
      message: '',
      grid: ['','','','','','B','','',''],
      totalTurns: turnTotal});
  } else if (x === 1 && y === 3){
    return this.setState({
      ...this.state,
      x: 1,
      y: 3,
      message: '',
      grid: ['','','','','','','B','',''],
      totalTurns: turnTotal});
  } else if (x === 2 && y === 3){
    return this.setState({
      ...this.state,
      x: 2,
      y: 3,
      message: '',
      grid: ['','','','','','','','B',''],
      totalTurns: turnTotal});
  }else if (x === 3 && y === 3){
    return this.setState({
      ...this.state,
      x: 3,
      y: 3,
      message: '',
      grid: ['','','','','','','','','B'],
      totalTurns: turnTotal});
  }
  }
onChange = (e) =>{
  this.setState({
   inputValue: e.target.value 
  })
}

onSubmit = (e) =>{
  e.preventDefault();
 
    this.sendToApi(e, this.state.inputValue); 
  
  const emailInput = document.getElementById('email');
  return emailInput.value = '';
  }
  
sendToApi = () =>{
 axios.post("http://localhost:9000/api/result", {x: this.state.x, y: this.state.y, steps: this.state.totalTurns, email: this.state.inputValue})
.then(res => {
  this.setState({
    ...this.state,
    message: res.data.message
  })
})
.catch(err => {
  this.setState({
    ...this.state,
    message: err.response.data.message
  })})
}


  render() {
    
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${this.state.x}, ${this.state.y})`}</h3>
          <h3 id="steps">{this.state.totalTurns === 1 ? `You moved ${this.state.totalTurns} time`: `You moved ${this.state.totalTurns} times`}</h3>
        </div>
          <div id="grid">
          {this.state.grid.map((square, idx) => 
          <div key={idx} className = {square ? 'square active' : 'square'}>{square}</div>)}
 
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={() => this.leftClick(this.state.x, this.state.y)} id="left">LEFT</button>
          <button onClick={() => this.upClick(this.state.x, this.state.y)} id="up">UP</button>
          <button onClick={() => this.rightClick(this.state.x, this.state.y)} id="right">RIGHT</button>
          <button onClick={() => this.downClick(this.state.x, this.state.y)} id="down">DOWN</button>
          <button onClick={() => this.resetClick()} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" name="email" onChange={this.onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
