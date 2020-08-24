import * as React from 'react';
import Input from 'components/Form/Input';

const info = "At the end of everymonth you'lll add this much onto your minimum payments.";

const Wallet = () => (
  <div>
    <Input name="extra" label="Extra Paymet" info={info} />
  </div>
);

export default Wallet;
