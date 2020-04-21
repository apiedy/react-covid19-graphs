import React from 'react';

import { Grid } from '@material-ui/core';
import { StatusOverview } from '../status-overview/status-overview';

import './entity-overview.css';

export function EntityOverview(props: any) {
  return (
    <div className="entity-overview">
      <div className="entity-name">
        { props.entityName }
      </div>
      
      <Grid container>
        <Grid item xs={4}>
          <StatusOverview number={ props.confirmed } status="Confirmed"></StatusOverview>
        </Grid>

        <Grid item xs={4}>
          <StatusOverview number={ props.recovered } status="Recovered"></StatusOverview>
        </Grid>

        <Grid item xs={4}>
          <StatusOverview number={ props.deaths } status="Deaths"></StatusOverview>
        </Grid>
      </Grid>
    </div>
  )
}
