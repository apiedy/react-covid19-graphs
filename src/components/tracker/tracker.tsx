import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { NewCases } from '../new-cases/new-cases';
import { CasesOverview } from '../cases-overview/cases-overview';
import moment from 'moment';

type TrackerState = {
  chartLabels: string[];
  chartData: number[];
  currentCountry: string;
  worldOverview: any;
  countryOverview: any;
}

export class Tracker extends React.Component<{}, TrackerState> {
  private startDate = moment('2020-03-16T00:00:00Z');

  constructor(props: any) {
    super(props);
    this.state = {
      chartLabels: [],
      chartData: [],
      currentCountry: '',
      worldOverview: null,
      countryOverview: null
    }
  }

  componentDidMount() {
    this.setState({
      currentCountry: 'united-states'
    });
    this.fetchCountryData('united-states');
    this.fetchOverview('united-states');
  }

  fetchOverview = (slug: string) => {
    fetch('https://api.covid19api.com/summary')
      .then(res => res.json())
      .then(data => {
        const countryOverview = data.Countries.find((country: any) => country.Slug === slug);

        this.setState({
          worldOverview: data.Global,
          countryOverview: countryOverview
        });
      });
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
      let x = [];
      for (let i = 1; i < data.length; i++) {
        x.push({newCases: data[i].cases - data[i - 1].cases, date: data[i].date});
      }

      return x;
    })(filteredCaseData);

    this.setState({
      chartLabels: newCaseData.map(x => moment(x.date).utc().format('MMM D')),
      chartData: newCaseData.map(x => x.newCases)
    });
  }

  handleCountryChange = (slug: string) => {
    this.setState({
      currentCountry: slug
    });
    this.fetchCountryData(slug);
    this.fetchOverview(slug);
  }

  render() {
    return(
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7}>
            <NewCases chartLabels={ this.state.chartLabels } chartData={ this.state.chartData } currentCountry={ this.state.currentCountry } onCountryChange={ this.handleCountryChange } />
          </Grid>

          <Grid item xs={12} sm={5}>
            <CasesOverview worldwide={ this.state.worldOverview } country={ this.state.countryOverview } />
          </Grid>
        </Grid>
      </Container>
    )
  }
}
