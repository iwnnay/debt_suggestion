import * as React from "react";
import Account from "./Account";
// import Button from '@material-ui/core/Button';

const Ledger = () => (
  <div>
    // over payment information
    <ul id="ledger">
      <Account />
    </ul>
  </div>
);

export default Ledger;
