import * as React from "react";

type Props = {}

type State = {
  active: boolean,
}

export default class LineItem extends React.Component<Props, State> {
  readonly state: State = {
    active: false,
  }

  render() {
    // if (this.state.active) { 
    if (true) {
      return (
        <li>
          <label htmlFor="amount1">
            Amount:
            <input name="amount1" type="text" />
          </label>
          <select>
            <option value="1">General APR</option>
            <option value="2">Another APR</option>
            <option value="3">Another APR For a Specific Time</option>
          </select>
        </li>
      );
    } else {
      return (
        <li>
          <button className="add-line-item">+</button>
        </li>
      );
    }
  }
}
