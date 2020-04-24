import React, { useState } from 'react';

import { Dialog, DialogContent, Typography } from '@material-ui/core';
import './data-disclaimer.css';

export function DataDisclaimer(props: any) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return(
    <div className="data-disclaimer">
      <p>New cases are the confirmed cases reported since the previous day.</p>
      <p>Source: <a href="https://covid19api.com/" target="_blank" rel="noopener noreferrer">Covid19 API</a> · <span className="link" onClick={handleClickOpen}>About this data</span></p>

      <Dialog className="about-data-dialog" onClose={handleClose} open={open}>
        <DialogContent>
          <Typography>
            <h2>About this data</h2>
          </Typography>

          <Typography>
            <h3>It changes rapidly</h3>
            <p>This data changes rapidly and might not reflect some cases still being reported.</p>
          </Typography>

          <Typography>
            <h3>It only includes people tested</h3>
            <p>Cases only include people who were tested and confirmed positive. Some areas may not have data because they haven’t published their data or haven’t done so recently.</p>
          </Typography>

          <Typography>
            <h3>It comes from COVID19 API</h3>
            <p>Data comes from COVID19 API, and cases are constantly updated from resources around the world.</p>
          </Typography>

          <Typography>
            <h3>Why do I get different data from different sources?</h3>
            <p>There are various sources that are tracking and aggregating coronavirus data. They update at different times and may have different ways of gathering data.</p>
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  )
}
