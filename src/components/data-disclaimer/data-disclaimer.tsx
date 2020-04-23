import React from 'react';

import './data-disclaimer.css';

export function DataDisclaimer(props: any) {
  return(
    <div className="data-disclaimer">
      <p>New cases are the confirmed cases reported since the previous day.</p>
      <p>Source: <a href="https://covid19api.com/" target="_blank" rel="noopener noreferrer">Covid19 API</a> · About this data</p>
    </div>
  )
}
