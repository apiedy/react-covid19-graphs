import React from 'react';

import { EntityOverview } from '../entity-overview/entity-overview';

import './cases-overview.css';

type CasesOverviewState = {
  worldwide: any;
  country: any;
}

export class CasesOverview extends React.Component<{}, CasesOverviewState> {
  constructor(props: any) {
    super(props);

    this.state = {
      worldwide: null,
      country: null
    };
  }

  fetchOverview = () => {
    fetch('https://api.covid19api.com/summary')
      .then(res => res.json())
      .then(data => {
        this.setState({
          worldwide: data.Global,
          country: data.Countries[23]
        });
      });
  }

  componentDidMount() {
    this.fetchOverview();
  }

  render() {
    return (
      <div className="cases-overview">
        <div className="title">
          Cases overview
        </div>

        <div className="entities">
          {
            this.state.worldwide &&
            <EntityOverview 
              entityName="Worldwide"
              confirmed={ this.state.worldwide.TotalConfirmed }
              recovered={ this.state.worldwide.TotalRecovered }
              deaths={ this.state.worldwide.TotalDeaths }
            />
          }

          {
            this.state.country &&
            <EntityOverview
              entityName={ this.state.country.Country }
              confirmed={ this.state.country.TotalConfirmed }
              recovered={ this.state.country.TotalRecovered }
              deaths={ this.state.country.TotalDeaths }
            />
          }
        </div>
      </div>
    )
  }
}
