import * as React from "react";
import Debt from "components/Debt";

export default class Account extends React.Component {
  render() {
    return (
      <li className="acccount">
        <label htmlFor="account_name">
          Name:
          <input name="account_name" type="text" />
        </label>

        <label htmlFor="apr">
          General APR:
          <input name="apr" type="text" />
        </label>
        <ul>
          <Debt />
        </ul>
      </li>
    );
  }
}
