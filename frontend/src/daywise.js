import React, { Component } from "react";
import axios from 'axios'
import {  Bar } from 'react-chartjs-2';
import MonthPicker from "@9softstudio/react-monthpicker";

import "@9softstudio/react-monthpicker/dist/reactmonthpicker.css";


import "react-datepicker/dist/react-datepicker.css";
var datearr =[];
class Daywise extends Component {
  constructor() {
    super();
    this.state = {
      dataarr: [],
      date: [],
      month: new Date().getMonth() ,
      year: new Date().getFullYear(),
     
    }
  }
  componentWillMount() {
   
  }
  handleSelect = (month, year) => {
    this.state.dataarr = []
    axios.get(`https://graphtask.herokuapp.com/getdata/` + month +'/' + year)
    .then(res => {
      const tasks = res.data;
      this.setState({ dataarr:tasks });
    })
    console.log("dataarr",this.state.dataarr)
    this.setState({
      month:month -1,
      year:year
    })
    
  };

  render() {
 
 
let dayvaalue;
if(this.state.month + 1 === 2){
   dayvaalue = 28
}
 else if(this.state.month +1   === 11||this.state.month +1 === 4||this.state.month +1 ===6||this.state.month +1 ===9){
  dayvaalue = 30
}
else{
  dayvaalue = 31
}
var lineChartData
if (this.state.dataarr.length > 0) {
    lineChartData = {
      labels: [new Date(this.state.year,this.state.month ).setDate(1),new Date(this.state.year,this.state.month ).setDate(dayvaalue)],
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
           {"x":new Date(this.state.year,this.state.month ).setDate(17),y :111},{"x":new Date(this.state.year,this.state.month ).setDate(18),y : 70},
            {"x":new Date(this.state.year,this.state.month ).setDate(19),y :109}, {"x":new Date(this.state.year,this.state.month ).setDate(20),y :50},
             {"x":new Date(this.state.year,this.state.month ).setDate(21),y :130}, {"x":new Date(this.state.year,this.state.month ).setDate(22),y :90},
             {"x":new Date(this.state.year,this.state.month ).setDate(25),y : 70},{"x":new Date(this.state.year,this.state.month ).setDate(26),y : 29}, 
             {"x":new Date(this.state.year,this.state.month ).setDate(27),y :79},{"x":new Date(this.state.year,this.state.month ).setDate(28),y : 105}]
        }
      ]
    }}
    else{
      lineChartData = {
        labels: [new Date(this.state.year,this.state.month ).setDate(1),new Date(this.state.year,this.state.month ).setDate(dayvaalue)],
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
          offset: true,
          // stepSize:2,
          gridLines: {
            display:false
        },

          time: {
         
            displayFormats: {
              day: 'MMM D'
            },
            unit: 'day'

          }


        }]

      }
    }
   
    return (
      <div>

  

<div> <MonthPicker onSelect={this.handleSelect} />
</div>
     <div>   <p>Monthwise Bar Chart </p>
        <Bar
          data={lineChartData}
          options={lineChartOptions}

        /></div>

      </div>
    );
  }
}
export default Daywise;
