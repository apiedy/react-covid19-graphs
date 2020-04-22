import React from 'react';
import './app.css';

import { Grid, Container } from '@material-ui/core';
import { CasesOverview } from '../cases-overview/cases-overview';
import { NewCases } from '../new-cases/new-cases';

function App() {
  return (
    <div className="app">
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <NewCases />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CasesOverview />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
