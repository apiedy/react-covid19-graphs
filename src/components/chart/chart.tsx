import React from "react";

import { Line } from 'react-chartjs-2';

export function Chart(props: any) {
  const startDate = new Date("2020-03-18T00:00:00Z");
  const endDate = new Date();
  const dateInterval = 6;
  let labels: string[] = [];
  
  let date = startDate;
  while (date < endDate) {
    labels.push(date.toISOString());
    date = new Date(date.setDate(date.getDate() + dateInterval));
  }

  const filteredData = props.data.filter((day: any) => labels.includes(new Date(day.Date).toISOString()));
  const filteredLabels = filteredData.map((day: any) => new Date(day.Date).toDateString());
  const data = filteredData.map((day: any) => day.Confirmed);

  const chartData = {
    labels: filteredLabels,
    datasets: [
      {
        label: 'No. of confirmed cases',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data
      }
    ]
  };

  return (
    <Line data={chartData}></Line>
  )
}
