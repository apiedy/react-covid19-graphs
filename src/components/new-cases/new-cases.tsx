import React from 'react';
import moment from 'moment';

import './new-cases.css';
import { LineGraph } from '../line-graph/line-graph';
import { LocationSelector } from '../location-selector/location-selector';
import { countries } from '../../shared/countries';
import { DataDisclaimer } from '../data-disclaimer/data-disclaimer';

type NewCasesState = {
  chartLabels: string[];
  chartData: number[];
  currentCountry: string;
}

export class NewCases extends React.Component<{}, NewCasesState> {
  private startDate = moment('2020-03-16T00:00:00Z');

  constructor(props: any) {
    super(props);
    this.state = {
      chartLabels: [],
      chartData: [],
      currentCountry: ''
    }
  }

  fetchCountryData = (slug: string) => {
    fetch(`https://api.covid19api.com/total/country/${slug}`)
      .then(res => res.json())
      .then((data) => {
        this.computeChartData(data);
      })
  }

  computeChartData = (data: any) => {
    const dayBeforeStart = moment(this.startDate).subtract(1, 'd');
    const filteredCaseData = data.filter((x: any) => moment(x.Date).isSameOrAfter(dayBeforeStart)).map((x: any) => ({cases: x.Confirmed, date: x.Date}));
    const newCaseData = ((data: any[]) => {
      let sixFromCurrent = moment(this.startDate).add(6, 'd');
      let x = [];
      for (let i = 1; i < data.length; i++) {
        const dateLabel = moment(data[i].date).isBefore(sixFromCurrent) ? '' : data[i].date;
        if (moment(data[i].date).isSame(sixFromCurrent)) sixFromCurrent.add(6, 'd');
        x.push({newCases: data[i].cases - data[i - 1].cases, date: dateLabel});
      }
      return x;
    })(filteredCaseData);

    this.setState({
      chartLabels: newCaseData.map(x => (x.date !== '') ? moment(x.date).utc().format('MMM D') : x.date),
      chartData: newCaseData.map(x => x.newCases)
    });
  }

  handleCountryChange = (slug: string) => {
    this.setState({
      currentCountry: slug
    });
    this.fetchCountryData(slug);
  }

  componentDidMount() {
    const sortedCountries = countries.sort((a: any, b: any) => a.Country.localeCompare(b.Country));
    this.setState({
      currentCountry: sortedCountries[0].Slug
    });
    this.fetchCountryData(sortedCountries[0].Slug);
  }

  render() {
    return (
      <div className="new-cases">
        <div className="title">
          New cases
        </div>

        <div className="new-cases-content">
          <div className="selector">
            <LocationSelector value={this.state.currentCountry} onChange={(slug: string) => this.handleCountryChange(slug)} countries={countries} />
          </div>

          { this.state.chartLabels.length && <LineGraph labels={this.state.chartLabels} data={this.state.chartData} /> }
        </div>
        <DataDisclaimer />
      </div>
    )
  }
}
