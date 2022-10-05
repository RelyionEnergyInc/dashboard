import React from "react";


import { ReactDOM } from "react";
import ApexCharts from 'apexcharts'
import {ReactApexChart, getNewSeries} from "apexcharts";

// Testing out ApexCharts for dashboard use
// Demo adapted from https://apexcharts.com/react-chart-demos/line-charts/realtime/
export default class LineChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
              series: [{
                data:[[1324508400000, 34], [1324594800000, 54] , [1326236400000, 43]]
            }],
            options: {
              chart: {
                id: 'realtime',
                height: 350,
                type: 'line',
                animations: {
                  enabled: true,
                  easing: 'linear',
                  dynamicAnimation: {
                    speed: 1000
                  }
                },
                toolbar: {
                  show: false
                },
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'smooth'
              },
              title: {
                text: 'Dynamic Updating Chart',
                align: 'left'
              },
              markers: {
                size: 0
              },
              xaxis: {
                type: 'datetime',
                // range: XAXISRANGE,
              },
              yaxis: {
                max: 100
              },
              legend: {
                show: false
              },
            },
          
          
          };
        }

      
        componentDidMount() {
          window.setInterval(() => {
            getNewSeries(this.lastDate, {
              min: 10,
              max: 90
            })
            
            ApexCharts.exec('realtime', 'updateSeries', [{
              data: this.data
            }])
          }, 1000)
        }
      

        render() {
          return (
            


      <div id="chart">
  <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
</div>
    


          );
        }
      }