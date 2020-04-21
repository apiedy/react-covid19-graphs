import React from 'react';

import './status-overview.css';

export function StatusOverview(props: any) {
  return (
    <div className="status-overview">
      <div className="status">{ props.status }</div>
      <div className="number">{ props.number }</div>
    </div>
  );
}
