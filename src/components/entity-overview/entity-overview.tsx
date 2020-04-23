import React from 'react';

import { Grid } from '@material-ui/core';

import './entity-overview.css';

const formatNumber = (a: number): string => {
  let b = [];

  while (a > 0) {
    b.push(a % 1000);
    a = Math.floor(a/1000);
  }

  return b.reverse().join(',');
}

export function EntityOverview(props: any) {
  return (
    <div className="entity-overview">
      <div className="entity-name">
        { props.entityName }
      </div>
      
      <Grid container>
        <Grid className="status-wrapper" item xs={4}>
          <div className="status-overview">
            <div className="status">Confirmed</div>
            <div className="number">{ formatNumber(props.confirmed) }</div>
          </div>
        </Grid>

        <Grid className="status-wrapper" item xs={4}>
          <div className="status-overview">
            <div className="status">Recovered</div>
            <div className="number">{ formatNumber(props.recovered) }</div>
          </div>
        </Grid>

        <Grid className="status-wrapper" item xs={4}>
          <div className="status-overview">
            <div className="status">Deaths</div>
            <div className="number">{ formatNumber(props.deaths) }</div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
