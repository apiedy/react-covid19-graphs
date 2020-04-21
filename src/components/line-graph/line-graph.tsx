import React from 'react';
import Chart from 'chart.js';

export class LineGraph extends React.Component {
  private chartRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: any) {
    super(props);

    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current?.getContext("2d");
    
    myChartRef &&
    new Chart(myChartRef, {
      type: "line",
      data: {
        labels: ['Jan', '', '', 'Apr', 'May'],
        datasets: [
          {
            label: "Sales",
            data: [86, 25, 80, 67, 91],
            pointBackgroundColor: '#4285f4',
            borderColor: '#4285f4',
            backgroundColor: '#EAF0FD'
          }
        ]
      },
      options: {
        //Customize chart options
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display:false
            }
          }],
          yAxes: [{
            gridLines: {
              display:false
            }   
          }]
        }
      }
    });
  }

  render() {
    return (
      <div className="graph-container">
        <canvas
            id="myChart"
            ref={this.chartRef}
        />
      </div>
    )
  }
}
