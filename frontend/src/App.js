import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Daywise from './hourwise'
import Monthwise from './daywise'
import Yearwise from './monthwise'
class  App extends React.Component{
  constructor() {
    super();
    this.state = {
     
      type:'hour',
     
     
    }
  }

day = ()=>{
  return(<div>
    <Daywise/>
  </div>)
}
handleSubmit=(e)=>{
  this.setState({
      type:e.target.name
  })
}
month = ()=>{
  return(<div>
    <Monthwise/>
  </div>)
}
year = ()=>{
  return(<div>
    <Yearwise/>
  </div>)
}
 render(){
   return(
     <div>
        <p>Chage graph visulize data Daily ,Monthly,Yearly </p>
                 <Button onClick={this.handleSubmit} color='info' name="hour">Hourwise Graph </Button>
        <Button onClick={this.handleSubmit} color='info' name="day">Daywise Graph</Button>
        <Button onClick={this.handleSubmit} color='info'  name="month">Monthwise Graph</Button>

                 {this.state.type === "hour" && this.day() }
                 {this.state.type === "day" && this.month() }
                 {this.state.type === "month" && this.year() }
        
          
               
     </div>
   )
 }
}



export default App;