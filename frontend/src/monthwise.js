import React, { Component } from "react";
import axios from 'axios'
import {  Bar } from 'react-chartjs-2';
import {  Form, FormGroup, Label, Input } from 'reactstrap';



import "react-datepicker/dist/react-datepicker.css";
var datearr =[];
class Daywise extends Component {
  constructor() {
    super();
    this.state = {
      dataarr: [],
      date: [],
      type:'hour',
      year: new Date()
     
    }
  }
  componentWillMount() {
   
  }

  handleChange = (e)=> {
    this.state.dataarr =[]
      let year = new Date(new Date().setFullYear(e.target.value)).getFullYear()
      console.log("yearrrrrr", year)
    axios.get('https:graphtask.herokuapp.com/getyear/1/2/'+ year)
    .then(res => {
      const tasks = res.data;
      this.setState({ dataarr:tasks });
    })
    
    this.setState({
     
      year:e.target.value
    })
    
  }
  render() {
    console.log("year task",this.state.dataarr)
var lineChartData
if (this.state.dataarr.length > 0) {
    lineChartData = {
      labels: [new Date(this.state.year).setMonth(0),new Date(this.state.year).setMonth(11)],
      datasets: [
        {
          
          label: "PV Yield",
            borderColor: "#FF9300",
            
            fill:true,
            backgroundColor: '#FF9300',
            borderColor: '#FF9300',
            borderWidth: 6,
          data: this.state.dataarr
        },
        {
          
          label: "Intensity",
            borderColor: "#0089FF",
            
            fill:true,
            backgroundColor: '#0089FF',
            borderColor: '#0089FF',
            borderWidth: 6,
           data: [
           {"x":new Date(this.state.year).setMonth(0),y :111},{"x":new Date(this.state.year).setMonth(2),y : 70},
            {"x":new Date(this.state.year).setMonth(3),y :109}, {"x":new Date(this.state.year).setMonth(4),y :50},
             {"x":new Date(this.state.year).setMonth(5),y :130}, {"x":new Date(this.state.year).setMonth(6),y :90},
             {"x":new Date(this.state.year).setMonth(7),y : 70},{"x":new Date(this.state.year).setMonth(8),y : 29}, 
             {"x":new Date(this.state.year).setMonth(10),y :79},{"x":new Date(this.state.year).setMonth(11),y : 105}]
        }
      ]
    }}
    else{
      lineChartData = {
        labels: [new Date(this.state.year).setMonth(0),new Date(this.state.year).setMonth(11)],
        datasets: [{
          label: 'No data Data Available',
          backgroundColor: ['#D3D3D3'],
          data: []
        }]
      }
    }
    var lineChartOptions = {
      responsive: true,
      maintainAspectRatio:true,
      tooltips: {
        enabled: true
      },
      legend: {
        align:'end',
        
        labels: {
         usePointStyle: true,
         padding:20
       }
       },
      scales: {
        yAxes: [{
          // display: true,
          ticks: {
            
              callback: function(value, index, values) {
  
                return value + "k"
            },
            suggestedMin: 0,
            suggestedMax: 80,

          }
        }],
        xAxes: [{
          // bounds: 'ticks',
          type: 'time',
        //   offset: true,
          // stepSize:2,
          gridLines: {
            display:false
        },

          time: {
         
            displayFormats: {
              month: ' MMM YYYY '
            },
            unit: 'month'

          }


        }]

      }
    }
   
    return (
      <div>

 

<div> <Form> <FormGroup>
        <Label for="exampleSelect">Select Year</Label>
        <Input type="select" onChange={this.handleChange} value={this.state.year} name="select" id="exampleSelect">
        <option defaultValue >{new Date(2023,1,1,0,0,0).getFullYear()}</option>
    <option>{new Date(2022,1,1,0,0,0).getFullYear()}</option>
    <option>{new Date(2021,1,1,0,0,0).getFullYear()}</option>        
    <option>{new Date(2020,1,1,0,0,0).getFullYear()}</option>
    <option>{new Date(2019,1,1,0,0,0).getFullYear()}</option>
    <option>{new Date(2018,1,1,0,0,0).getFullYear()}</option>
    <option>{new Date(2017,1,1,0,0,0).getFullYear()}</option>
    <option>{new Date(2016,1,1,0,0,0).getFullYear()}</option>
    <option>{new Date(2015,1,1,0,0,0).getFullYear()}</option>
    <option>{new Date(2014,1,1,0,0,0).getFullYear()}</option>
    <option>{new Date(2013,1,1,0,0,0).getFullYear()}</option>
    <option>{new Date(2012,1,1,0,0,0).getFullYear()}</option>
    <option>{new Date(2011,1,1,0,0,0).getFullYear()}</option>
    <option>{new Date(2010,1,1,0,0,0).getFullYear()}</option>


        </Input>
      </FormGroup></Form> 
      

</div>
     <div style={{height:100}}>   <p>Yearwise Bar Chart </p>
        <Bar
          data={lineChartData}
          options={lineChartOptions}
          
        /></div>

      </div>
    );
  }
}
export default Daywise;
