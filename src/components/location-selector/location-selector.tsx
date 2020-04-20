import React from "react";

import { MenuItem, Select } from '@material-ui/core';

export function LocationSelector(props: any) {
  return (
    <Select
      value={props.value}
      onChange={(e) => props.onChange(e)}
      displayEmpty
      className='select-country'
    >
      { props.countries.map((country: any) => <MenuItem key={country.Slug} value={country.Slug}>{country.Country}</MenuItem>) }
    </Select>
  )
}
