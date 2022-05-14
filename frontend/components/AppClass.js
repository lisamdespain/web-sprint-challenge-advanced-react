import React from 'react'

export default class AppClass extends React.Component {
  state = {
    x: 2,
    y: 2,
    message: '',
    grid: ['','','','','B','','','',''],
    totalTurns: 0,
  }

  leftClick = (x, y) =>{
    if (x === 2 || x === 3) {
       this.setState({
        x: x - 1,
        message: "",
        totalTurns: this.state.totalTurns + 1
        });  
        return this.newIdx(x-1, y);      
      } else {
        return this.setState({
          message: "You can't go left"})
      }
  }

  rightClick = (x, y) =>{
    if (x === 1 || x === 2) {
      this.setState({
        x: x + 1, 
        message: "",
        totalTurns: this.state.totalTurns + 1
        });
        return this.newIdx(x+1, y)
      } else {
        return this.setState({
          message: "You can't go right"
        })
      }
  }

  upClick = (x, y) =>{
    if (y === 2 || y === 3) {
      this.setState({
        y: y - 1,
        message: "",
        totalTurns: this.state.totalTurns + 1
      });
        return this.newIdx(x, y-1)
      } else {
        this.setState({
          message: "You can't go up"
        })      }
  }

  downClick = (x, y) =>{
    if (y === 1 || y === 2) {
      this.setState({
        y: y + 1,
        message: "",
        totalTurns: this.state.totalTurns + 1});
      return this.newIdx(x, y+1)
      } else {
        this.setState({
          message: "You can't go down"
        })
      }
  }

  resetClick = () =>{
    return this.setState({
        x: 2,
        y: 2,
        message: '',
        grid: ['','','','','B','','','',''],
        totalTurns: 0,
      }
    );
  }
//  makeSquareActive is not yet working
// makeSquareActive = () =>{
//   this.state.grid.filter((text) => text === "B" ? this.setState({activeSquare: true}) : this.setState({activeSquare: false}));
// }

newIdx = (x, y) =>{
  if (x === 1 && y === 1){
    return this.setState({
      grid: ['B','','','','','','','','']});
} else if (x === 2 && y === 1){
  return this.setState({
    grid: ['','B','','','','','','','']});
} else if (x === 3 && y === 1){
  return this.setState({
    grid: ['','','B','','','','','','']});
} else if (x === 1 && y === 2){
  return this.setState({
    grid: ['','','','B','','','','','']});
} else if (x === 2 && y === 2){
  return this.setState({
    grid: ['','','','','B','','','','']});
} else if (x === 3 && y === 2){
  return this.setState({
    grid: ['','','','','','B','','','']});
} else if (x === 1 && y === 3){
  return this.setState({
    grid: ['','','','','','','B','','']});
} else if (x === 2 && y === 3){
  return this.setState({
    grid: ['','','','','','','','B','']});
}else if (x === 3 && y === 3){
  return this.setState({
    grid: ['','','','','','','','','B']});
}
}
onChange = (e) =>{

}

  render() {
    
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${this.state.x}, ${this.state.y})`}</h3>
          <h3 id="steps">{`You moved ${this.state.totalTurns} times`}</h3>
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
        <form>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
