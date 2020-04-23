import React from 'react';
import Chart from 'chart.js';

Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
  draw: function(ease: any) {
    Chart.controllers.line.prototype.draw.call(this, ease);

    if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
      var activePoint = this.chart.tooltip._active[0],
        ctx = this.chart.ctx,
        x = activePoint.tooltipPosition().x,
        topY = this.chart.legend.bottom,
        bottomY = this.chart.chartArea.bottom;

      // draw line
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#dfe1e5';
      ctx.stroke();
      ctx.restore();
    }
  }
});

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
        type: 'LineWithLine',
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
              lineTension: 0.05,
              pointRadius: 0
            }
          ]
        },
        options: {
          //Customize chart options
          tooltips: {
            intersect: false,
            backgroundColor: '#ffffff',
            titleFontFamily: 'Roboto',
            titleFontSize: 14,
            titleFontColor: '#3c4043',
            titleFontStyle: 'normal',
            bodyFontFamily: 'Roboto',
            bodyFontColor: '#202124',
            bodyFontStyle: 'bold',
            bodyFontSize: 14,
            caretSize: 0,
            caretPadding: 5,
            displayColors: false,
            footerFontStyle: 'bold',
            borderWidth: 1,
            borderColor: '#dfe1e5',
            cornerRadius: 2
          },
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false
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
