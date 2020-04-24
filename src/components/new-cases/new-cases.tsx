import React from 'react';

import './new-cases.css';
import { LineGraph } from '../line-graph/line-graph';
import { LocationSelector } from '../location-selector/location-selector';
import { countries } from '../../shared/countries';
import { DataDisclaimer } from '../data-disclaimer/data-disclaimer';

type NewCasesProps = {
  chartLabels: string[];
  chartData: number[];
  currentCountry: string;
  onCountryChange: any;
}

export function NewCases(props: NewCasesProps) {
  return (
    <div className="new-cases">
      <div className="title">
        New cases
      </div>

      <div className="new-cases-content">
        <div className="selector">
          <LocationSelector value={props.currentCountry} onChange={(slug: string) => props.onCountryChange(slug)} countries={countries} />
        </div>

        { props.chartLabels.length && <LineGraph labels={props.chartLabels} data={props.chartData} /> }
      </div>
      <DataDisclaimer />
    </div>
  )
}
