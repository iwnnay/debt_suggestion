import * as React from 'react';
import Input from 'components/Form/Input';
import generalStore from 'stores/GeneralStore';

const info = "At the end of everymonth you'lll add this much onto your minimum payments.";
const storeExtraPayment = (e: Event) => {
  debugger;
  generalStore.updateExtraPayment(10);
};

export default class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Input
          name="extra"
          label="Extra Paymet"
          info={info}
          onChange={storeExtraPayment}
          value={generalStore.data.extraPayment}
        />
      </div>
    );
  }
}
