import React, {useState} from 'react';
import axios from 'axios';

export default function AppFunctional(props) {
  const initialValues = {
    x: 2,
    y: 2,
    message: '',
    grid: ['','','','','B','','','',''],
    totalTurns: 0,
    email: '', 
    inputValue:''
  }
  const [state, setState] = useState(initialValues);

  const resetClick = () =>{
    const emailInput = document.getElementById('email');
    emailInput.value = '';
    return setState(initialValues);
  }
 
   
 
 const leftClick = (x, y) =>{
    if (x === 2 || x === 3) {
      const leftX = state.x - 1;
      return newIdx(leftX, y);      
      } else {
        return setState({
          ...state,
          message: "You can't go left"})
      }
  }

  const rightClick = (x, y) =>{
    if (x === 1 || x === 2) {
      const rightX = state.x + 1;
      return newIdx(rightX, y)
      } else {
        return setState({
          ...state,
          message: "You can't go right"
        })
      }
  }

  const upClick = (x, y) =>{
    if (y === 2 || y === 3) {
      const upY = state.y - 1;
      return newIdx(x, upY)
      } else {
        setState({
          ...state,
          message: "You can't go up"
        })      }
  }

  const downClick = (x, y) =>{
    if (y === 1 || y === 2) {
    const downY = state.y + 1;
      return newIdx(x, downY)
      } else {
        setState({
          ...state,
          message: "You can't go down"
        })
      }
  }
  const newIdx = (x, y) =>{
    const turnTotal = state.totalTurns + 1;
    if (x === 1 && y === 1){
    return setState({
      ...state,
      x: 1,
      y: 1,
      message: '',
      grid: ['B','','','','','','','',''],
      totalTurns: turnTotal
      });
  } else if (x === 2 && y === 1){
    return setState({
      ...state,
      x: 2,
      y: 1,
      message: '',
      grid: ['','B','','','','','','',''],
      totalTurns: turnTotal});
  } else if (x === 3 && y === 1){
    return setState({
      ...state,
      x: 3,
      y: 1,
      message: '',
      grid: ['','','B','','','','','',''],
      totalTurns: turnTotal});
  } else if (x === 1 && y === 2){
    return setState({
      ...state,
      x: 1,
      y: 2,
      message: '',
      grid: ['','','','B','','','','',''],
      totalTurns: turnTotal});
  } else if (x === 2 && y === 2){
    return setState({
      ...state,
      x: 2,
      y: 2,
      grid: ['','','','','B','','','',''],
      totalTurns: turnTotal});
  } else if (x === 3 && y === 2){
    return setState({
      ...state,
      x: 3,
      y: 2,
      message: '',
      grid: ['','','','','','B','','',''],
      totalTurns: turnTotal});
  } else if (x === 1 && y === 3){
    return setState({
      ...state,
      x: 1,
      y: 3,
      message: '',
      grid: ['','','','','','','B','',''],
      totalTurns: turnTotal});
  } else if (x === 2 && y === 3){
    return setState({
      ...state,
      x: 2,
      y: 3,
      message: '',
      grid: ['','','','','','','','B',''],
      totalTurns: turnTotal});
  }else if (x === 3 && y === 3){
    return setState({
      ...state,
      x: 3,
      y: 3,
      message: '',
      grid: ['','','','','','','','','B'],
      totalTurns: turnTotal});
  }
  }
  const onChange = (e) =>{
    setState({
      ...state,
     inputValue: e.target.value 
    })
  }
  
  const onSubmit = (e) =>{
    e.preventDefault();
   
      sendToApi(e, state.inputValue); 
    
    const emailInput = document.getElementById('email');
    return emailInput.value = '';
    }
    
  const sendToApi = () =>{
   axios.post("http://localhost:9000/api/result", {x: state.x, y: state.y, steps: state.totalTurns, email: state.inputValue})
  .then(res => {
    setState({
      ...state,
      message: res.data.message
    })
  })
  .catch(err => {
    return setState({
      ...state,
      message: err.response.data.message
    })})
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
          <h3 id="coordinates">{`Coordinates (${state.x}, ${state.y})`}</h3>
          <h3 id="steps">{state.totalTurns === 1 ? `You moved ${state.totalTurns} time`: `You moved ${state.totalTurns} times`}</h3>
        </div>
          <div id="grid">
          {state.grid.map((square, idx) => 
          <div key={idx} className = {square ? 'square active' : 'square'}>{square}</div>)}
 
        </div>
        <div className="info">
          <h3 id="message">{state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={() => leftClick(state.x, state.y)} id="left">LEFT</button>
          <button onClick={() => upClick(state.x, state.y)} id="up">UP</button>
          <button onClick={() => rightClick(state.x, state.y)} id="right">RIGHT</button>
          <button onClick={() => downClick(state.x, state.y)} id="down">DOWN</button>
          <button onClick={() => resetClick()} id="reset">reset</button>
        </div>
        <form onSubmit={onSubmit}>
          <input id="email" type="email" placeholder="type email" name="email" onChange={onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
  )
}