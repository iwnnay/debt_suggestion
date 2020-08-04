import * as React from "react";
import DebtItem from './debt_item'

export default class AddForm extends React.Component {
  render() {
    return (
      <div id="addForm">
        <ul>
          <DebtItem />
        </ul>

        <button>Calculate</button>
      </div>
    );
  }
}
