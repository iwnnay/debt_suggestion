import * as React from "react";
import AccountComponent from "./Account";
// import Button from '@material-ui/core/Button';

const Ledger = () => (
  <div>
    // over payment information
    <ul id="ledger">
      <AccountComponent />
    </ul>
  </div>
);

export default Ledger;
