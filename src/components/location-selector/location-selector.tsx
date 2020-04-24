import React from 'react';

import { MenuItem, Select, InputBase, Theme, withStyles, createStyles } from '@material-ui/core';

// function countryToFlag(isoCode: string) {
//   return typeof String.fromCodePoint !== 'undefined'
//     ? isoCode
//         .toUpperCase()
//         .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
//     : isoCode;
// }

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
      backgroundColor: '#E8F0FE',
      border: '1px solid #dfe1e5',
      fontSize: 14,
      height: 18,
      padding: '8px 12px',
      '&:focus': {
        borderRadius: 18,
        backgroundColor: '#E8F0FE'
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
        { props.countries.sort((a: any, b: any) => a.Country.localeCompare(b.Country))
                          .map((country: any) => <MenuItem key={country.Slug} value={country.Slug}>{country.Country}</MenuItem>) }
      </Select>
    </div>
  )
}
