import * as React from 'react';
import Account from 'components/Account';
import Wallet from 'components/Wallet';
// import Button from '@material-ui/core/Button';

const Ledger = () => (
  <div>
    <Wallet />
    <ul id="ledger">
      <Account />
    </ul>
  </div>
);

export default Ledger;
