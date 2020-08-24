import * as React from 'react';
import Info from './Info';

interface Props {
  label: string;
  name: string;
  info: string;
}

const Input = (props: Props) => (
  <label htmlFor={props.name}>
    {props.label}:
    <input name={props.name} type="text" />
    <Info text={props.info} />
  </label>
);

export default Input;
