import React from 'react';
import './app.css';

import { CountryGraphs } from '../country-graphs/country-graphs';
import { Grid } from '@material-ui/core';
import { CasesOverview } from '../cases-overview/cases-overview';

function App() {
  return (
    <div className="app">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <CountryGraphs />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CasesOverview />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
