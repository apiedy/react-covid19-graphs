import React from "react";
import { Card } from "@material-ui/core";
import { LocationSelector } from "../location-selector/location-selector";
import { Chart } from "../chart/chart";

interface GraphsState {
  countries: any[];
  countryData: any[];
}

export class CountryGraphs extends React.Component<{}, GraphsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      countries: [],
      countryData: []
    }
    this.fetchCountries();
  }

  fetchCountries = () => {
    fetch('https://api.covid19api.com/countries')
      .then(res => res.json())
      .then((data) => this.setState({
        countries: data.sort((a: any, b: any) => a.Country.localeCompare(b.Country))
      }))
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <Card>
        <LocationSelector countries={this.state.countries} />
        <Chart data={this.state.countryData} />
      </Card>
    );
  }
}
