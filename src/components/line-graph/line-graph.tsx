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

  setupChart = () => {
    const myChartRef = this.chartRef.current?.getContext("2d");
    
    if(myChartRef) {
      let gradient = myChartRef.createLinearGradient(0, 0, 0, 225);
      gradient.addColorStop(0, 'rgba(234, 240, 253, 1)');
      gradient.addColorStop(1, 'rgba(234, 240, 253, 0)');

      new Chart(myChartRef, {
        type: "line",
        data: {
          labels: this.props.labels,
          datasets: [
            {
              borderWidth: 2,
              label: 'New cases',
              data: this.props.data,
              pointBackgroundColor: '#4285f4',
              borderColor: '#4285f4',
              backgroundColor: gradient,
              lineTension: 0,
              pointRadius: 0
            }
          ]
        },
        options: {
          //Customize chart options
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false
              },
              ticks: {
                minRotation: 360
              }
            }],
            yAxes: [{
              gridLines: {
                display:true,
                color: '#f5f5f5'
              },
              ticks: {
                maxTicksLimit: 6
              }
            }]
          }
        }
      });
    }
  }

  componentDidMount() {
    this.setupChart();
  }

  componentDidUpdate() {
    this.setupChart();
  }

  render() {
    return (
      <div className="graph-container">
        <canvas
          height="225"
          id="myChart"
          ref={this.chartRef}
        />
      </div>
    )
  }
}
