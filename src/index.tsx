import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Calculator from './components/calculator';

const render = () => {
  ReactDOM.render(<Calculator />, document.getElementById('calculator'));
};
