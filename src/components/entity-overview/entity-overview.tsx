import React from 'react';

import { Grid } from '@material-ui/core';

import './entity-overview.css';

type EntityOverviewProps = {
  entityName: string;
  confirmed: number;
  recovered: number;
  deaths: number;
}

export function EntityOverview(props: EntityOverviewProps) {
  return (
    <div className="entity-overview">
      <div className="entity-name">
        { props.entityName }
      </div>
      
      <Grid container>
        <Grid className="status-wrapper" item xs={4}>
          <div className="status-overview">
            <div className="status">Confirmed</div>
            <div className="number">{ props.confirmed ? props.confirmed.toLocaleString('en') : '-' }</div>
          </div>
        </Grid>

        <Grid className="status-wrapper" item xs={4}>
          <div className="status-overview">
            <div className="status">Recovered</div>
            <div className="number">{ props.recovered ? props.recovered.toLocaleString('en') : '-' }</div>
          </div>
        </Grid>

        <Grid className="status-wrapper" item xs={4}>
          <div className="status-overview">
            <div className="status">Deaths</div>
            <div className="number">{ props.deaths ? props.deaths.toLocaleString('en') : '-' }</div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
