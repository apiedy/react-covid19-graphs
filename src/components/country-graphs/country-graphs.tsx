import React from "react";
import { Card } from "@material-ui/core";
import { LocationSelector } from "../location-selector/location-selector";
import { Chart } from "../chart/chart";

interface GraphsState {
  countries: any[];
  countryData: any[];
  currentSlug: string;
}

export class CountryGraphs extends React.Component<{}, GraphsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      countries: [],
      countryData: [],
      currentSlug: ''
    }
  }

  fetchCountries = () => {
    fetch('https://api.covid19api.com/countries')
      .then(res => res.json())
      .then((data) => {
        const sortedData = data.sort((a: any, b: any) => a.Country.localeCompare(b.Country));
        this.setState({
          countries: sortedData,
          currentSlug: sortedData[0].Slug
        });
        this.fetchCountryData(sortedData[0].Slug);
      })
      .catch((err) => console.log(err))
  }

  fetchCountryData = (slug: string) => {
    fetch(`https://api.covid19api.com/total/country/${slug}`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          countryData: data
        });
      })
  }

  handleCountryChange = (e: any) => {
    this.setState({
      currentSlug: e.target.value
    });
    this.fetchCountryData(e.target.value);
  }

  componentDidMount() {
    this.fetchCountries();
  }

  render() {
    return (
      this.state.countries[0] ?
        <Card>
          <LocationSelector onChange={this.handleCountryChange} value={this.state.currentSlug} countries={this.state.countries} />
          <Chart data={this.state.countryData} />
        </Card>
        : null
    );
  }
}
