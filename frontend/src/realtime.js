import React, { Component } from "react";
import socketIOClient from "socket.io-client";

import { Line } from 'react-chartjs-2';

class Realtime extends Component {
  constructor() {
    super();
    this.state = {
      response: [],
      dateuniqe: [],
      dataarr: [],
      date: [],
      endpoint: "http://127.0.0.1:4001",


    }
  }
  componentDidMount() {
    const { endpoint } = this.state;

    const socket = socketIOClient(endpoint);

    socket.on("FromAPI", data => this.setState({
      response: this.state.response.concat(data)

    })

    );
    socket.on("mydata", data => this.setState({
      response: data
    }))



  }



  render() {
    var datearr = []
    this.state.response.map(({ no_task, date }) => {
     
      datearr.push({ "x": (new Date(date)), "y": parseInt(no_task, 10) })

    })
    // console.log("datearr", datearr)
    //  var dataarr=[ ]    
    //  dateuniqe.push(dateh[0])
    //   for(var i =1;i< dateh.length -1;i++){

    //      if(harr[i+1] != harr[i]){
    //        dateuniqe.push(dateh[i+1])
    //     }
    // }   
    // var j =0;
    // while(j< date.length- 1 && j < dateh.length-1){

    //     if(date[j+1] != date[j]){
    //     dataarr.push({"y":1,"x":dateh[j]})
    //         j=j+1
    //     }
    //     else{
    //         var k =1
    //         while (date[j+1] == date[j]) {
    //             k = k+1
    //             j=j+ 1

    //         }

    //        dataarr.push({"y":k,"x":dateh[j]})
    //         j = j+1

    //     }

    // }


    var lineChartData = {
      labels: [(new Date(Date.now() - 3600000 * 4)), (new Date(Date.now() + 8640000 * 6))],
      // labels: [],
      datasets: [
        {
          type: "line",
          label: "realtime graph",

          fill: true,

          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          //  data: [120, 3, 100, 90, 29, 69, 22, 9, 111,50, 70, 109, 50, 130, 90, 70, 29, 79, 105]
          data: datearr
        }
      ]
    }
    var lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: true
      },

      scales: {
        yAxes: [{
          display: true,
          ticks: {
            suggestedMin: 0,
            suggestedMax: 80,

          }
        }],
        xAxes: [{
          bounds: 'ticks',
          type: 'time',

          // stepSize:2,

          time: {

            displayFormats: {
              quarter: 'MMM YYYY',
              // distribution: 'series'


            },
            unit: 'hour'

          }


        }]

      }
    }
    // console.log("response", this.state.response)
    return (
      <div>

        {/* The Completeed task is: {this.state.response.map((res)=>{
{res}
        } )} */}


        <p>Real Time Line Chart </p>
        <Line
          data={lineChartData}
          options={lineChartOptions}

        />

      </div>
    );
  }
}
export default Realtime;