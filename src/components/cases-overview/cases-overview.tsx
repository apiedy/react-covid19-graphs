import React from 'react';

import { EntityOverview } from '../entity-overview/entity-overview';

import './cases-overview.css';

type CasesOverviewProps = {
  worldwide: any;
  country: any;
}

export function CasesOverview(props: CasesOverviewProps) {
  return (
    <div className="cases-overview">
      <div className="title">
        Cases overview
      </div>

      <div className="entities">
        {
          props.worldwide &&
          <EntityOverview 
            entityName="Worldwide"
            confirmed={ props.worldwide.TotalConfirmed }
            recovered={ props.worldwide.TotalRecovered }
            deaths={ props.worldwide.TotalDeaths }
          />
        }

        {
          props.country &&
          <EntityOverview
            entityName={ props.country.Country }
            confirmed={ props.country.TotalConfirmed }
            recovered={ props.country.TotalRecovered }
            deaths={ props.country.TotalDeaths }
          />
        }
      </div>
    </div>
  )
}
