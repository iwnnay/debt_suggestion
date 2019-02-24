import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Calculator from './components/calculator';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Calculator />
    </AppContainer>,
    document.getElementById('calculator'),
  );
};

render();

if (module.hot) {
  module.hot.accept('./calculator', () => { render(); });
}
