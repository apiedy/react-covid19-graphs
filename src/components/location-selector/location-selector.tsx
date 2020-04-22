import React from 'react';

import { MenuItem, Select, InputBase, Theme, withStyles, createStyles } from '@material-ui/core';

function countryToFlag(isoCode: string) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
    }
  }
};

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    input: {
      borderRadius: 18,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #dfe1e5',
      fontSize: 14,
      height: 18,
      padding: '8px 12px',
      '&:focus': {
        borderRadius: 18,
        backgroundColor: theme.palette.background.paper
      }
    }
  })
)(InputBase);

export function LocationSelector(props: any) {
  return (
    <div>
      <Select
        id="country-select"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        MenuProps={MenuProps}
        input={<BootstrapInput />}
      >
        { props.countries.map((country: any) => <MenuItem key={country.Slug} value={country.Slug}>{countryToFlag(country.ISO2)} {country.Country}</MenuItem>) }
      </Select>
    </div>
  )
}
