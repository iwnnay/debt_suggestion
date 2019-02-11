import * as React from 'react';
import Button from '@material-ui/core/Button';

export interface CalculatorProps { compiler: string; framework: string; }

const Calculator = (props: CalculatorProps) => (
  <Button>
    Hello World
  </Button>
);

export default Calculator;
