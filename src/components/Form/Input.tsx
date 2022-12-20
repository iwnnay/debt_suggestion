import * as React from 'react';
import Info from './Info';

interface Props {
  label: string;
  name: string;
  info?: string;
  value?: number | string | [];
  onChange?: any; // figure out how to add a function as a type
}

const Input = (props: Props) => (
  <label htmlFor={props.name}>
    {props.label}:
    <input name={props.name} type="text" onChange={props.onChange} />
    <Info text={props.info} />
  </label>
);

export default Input;
