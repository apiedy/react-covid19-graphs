import React from 'react';
import moment from 'moment';

import './new-cases.css';
import { LineGraph } from '../line-graph/line-graph';

const AvailableCountries = [
  "Argentina", "Australia", "United States of America"
];

type NewCasesState = {
  chartLabels: string[];
  chartData: number[];
}

export class NewCases extends React.Component<{}, NewCasesState> {
  private startDate = moment('2020-03-16T00:00:00Z');

  constructor(props: any) {
    super(props);
    this.state = {
      chartLabels: [],
      chartData: []
    }
  }

  fetchCountries = () => {
    fetch('https://api.covid19api.com/countries')
      .then(res => res.json())
      .then((data) => {
        const filteredData = data.filter((x: any) => AvailableCountries.indexOf(x.Country));
        const sortedData = filteredData.sort((a: any, b: any) => a.Country.localeCompare(b.Country));

        this.fetchCountryData(sortedData[0].Slug);
      })
      .catch((err) => console.log(err))
  }

  fetchCountryData = (slug: string) => {
    fetch(`https://api.covid19api.com/total/country/${slug}`)
      .then(res => res.json())
      .then((data) => {
        this.computeChartData(data);
      })
  }

  computeChartData = (data: any) => {
    const dayBeforeStart = this.startDate.subtract(1, 'days');
    const filteredCaseData = data.filter((x: any) => moment(x.Date).isSameOrAfter(dayBeforeStart)).map((x: any) => ({cases: x.Confirmed, date: x.Date}));
    const newCaseData = ((data: any[]) => {
      let x = [];
      for (let i = 1; i < data.length; i++) {
        x.push({newCases: data[i].cases - data[i - 1].cases, date: data[i].date})
      }
      return x;
    })(filteredCaseData);
    
    this.setState({
      chartLabels: newCaseData.map(x => moment(x.date).utc().format('MMM D')),
      chartData: newCaseData.map(x => x.newCases)
    });
  }

  componentDidMount() {
    this.fetchCountries();
  }

  render() {
    return (
      <div className="new-cases">
        <div className="title">
          New cases
        </div>

        {this.state.chartLabels.length &&
        <div className="graph">
          <LineGraph labels={this.state.chartLabels} data={this.state.chartData} />
        </div>}
      </div>
    )
  }
}
