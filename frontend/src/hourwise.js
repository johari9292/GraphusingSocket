import React, { Component } from "react";
// import socketIOClient from "socket.io-client";
import axios from 'axios'
import { Line, Bar } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Daywise extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      dateuniqe: [],
      dataarr: [],
      date: [],
      response: [],
      available: true,
      startDate: new Date(),
      endpoint: "http://127.0.0.1:4001",
    }
  }

  componentDidMount() {
//     const { endpoint } = this.state;

//     const socket = socketIOClient(endpoint);

//     socket.on("FromAPI", data => this.setState({
//       dataarr: this.state.dataarr.concat(data)

//     })

//     );
//     socket.on("mydata", data => this.setState({
//       dataarr: data
//     }))
   
  
  }

  handleChange = dates => {
    this.state.dataarr =[]
    axios.get(`http://graphtask.herokuapp.com/getdata/`+dates)
    .then(res => {
      const tasks = res.data;
      console.log(tasks)
      this.setState({ dataarr: tasks });
    })
    let istrue = true
    // this.state.dataarr =[]
  //  this.state.tasks.map(({no_task,date})=>{
  // //   if (istrue === true) {
  // //     this.state.dataarr.push({ "x": (new Date(date).setHours(6, 0, 0)), "y": 0 })
  // //     istrue = false
  // // }
  //    this.state.dataarr.push({"x":date,"y":no_task})
  //   //  console.log("dataarrrr",this.state.dataarr)
  //  })
    this.state.startDate = null
    this.setState({
      startDate: dates,

    });

  };

  render() {
    console.log("Start Date",this.state.startDate)

    var lineChartData;
    if (this.state.dataarr.length > 0) {
      lineChartData = {

        labels: [this.state.startDate.setHours(6, 0, 0), this.state.startDate.setHours(20, 0, 0)],
        datasets: [
          {
            label: "PV Yield",
            borderColor: "#FF9300",
            pointRadius: 0,
            fill:false,
            backgroundColor: '#FF9300',
            borderColor: '#FF9300',
            borderWidth: 2,
            data: this.state.dataarr
          },
          {
            type: "line",
            label: "Intensity",
            fill:false,
            borderColor: "#0089FF",
            pointRadius: 0,
            borderWidth: 2,
            linetension:1.2,
            backgroundColor: '#0089FF',
            borderColor: '#0089FF',
            data:[{"x":this.state.startDate.setHours(6, 0, 0), y:0},
            {"x":this.state.startDate.setHours(7, 0, 0), y:10},
            {"x":this.state.startDate.setHours(8, 0, 0), y:20},
            {"x":this.state.startDate.setHours(9, 0, 0), y:30},
            {"x":this.state.startDate.setHours(10, 0, 0), y:40},
            {"x":this.state.startDate.setHours(11, 0, 0), y:50},
            {"x":this.state.startDate.setHours(12, 0, 0), y:60},
            {"x":this.state.startDate.setHours(13, 0, 0), y:70},
            {"x":this.state.startDate.setHours(14, 0, 0), y:60},
            {"x":this.state.startDate.setHours(15, 0, 0), y:50},
            {"x":this.state.startDate.setHours(16, 0, 0), y:40},
            {"x":this.state.startDate.setHours(17, 0, 0), y:30},
            {"x":this.state.startDate.setHours(18, 0, 0), y:20},
            {"x":this.state.startDate.setHours(19, 0, 0), y:10},
            {"x":this.state.startDate.setHours(20, 0, 0), y:0},





          ]
          }
        ],
        
      }
    }
    else {
      lineChartData = {
        labels:[ this.state.startDate.setHours(6, 0, 0),this.state.startDate.setHours(20, 0, 0)],
        datasets: [{
          label: 'No data Data Available',
          backgroundColor: ['#D3D3D3'],
          data: []
        }]
      }
    }
    var lineChartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      
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
          display: true,
          ticks: {
            callback: function(value, index, values) {

              return value + "k"
          },
            suggestedMin: 0,
            suggestedMax: 80,
            

          }
        }],
        xAxes: [{
          bounds: 'ticks',
          type: 'time',
          gridLines: {
            display:false
        },
          ticks: {
            callback: function(value, index, values) {
              if(index < 2){
                return value + "AM"
              }
              else{
                return value + "PM"
              }            
          },
          },
          time: {
          
            unit: 'hour',
            unitStepSize: 3,
            displayFormats: {
              'minute': 'HH:mm',
              'hour': 'hh:mm',
             
            },

          }


        }],

      }
    }
    return (
      <div>

     
        <div><DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
        /></div>
        <div>   <h4>Today's Yield </h4>

          <Line
            data={lineChartData}
            options={lineChartOptions}

          /></div>

      </div>
    );
  }
}
export default Daywise;
