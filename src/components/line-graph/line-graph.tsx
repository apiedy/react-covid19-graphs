import React from 'react';
import Chart from 'chart.js';

type LineGraphProps = {
  labels: string[];
  data: number[];
}

export class LineGraph extends React.Component<LineGraphProps, {}> {
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
        labels: this.props.labels,
        datasets: [
          {
            label: "New cases",
            data: this.props.data,
            pointBackgroundColor: '#4285f4',
            borderColor: '#4285f4',
            backgroundColor: '#EAF0FD',
            lineTension: 0,
            pointRadius: 0
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
