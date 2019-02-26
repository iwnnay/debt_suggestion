import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import Calculator from '../src/components/calculator';

describe('main app file', () => {
  it('should be able to render a calculator', () => {
    const app = TestRenderer.create(<Calculator />).root;

    expect(app.findByType('main')).not.toBeNull();
  });
});
