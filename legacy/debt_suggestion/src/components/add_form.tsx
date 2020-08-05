import * as React from 'react';

//const Input = (props) => {
//}

export default class AddForm extends React.Component {
  render() {
    return (
      <div id="addForm">
        <label htmlFor="account_name">
          Name:
          <input name="account_name" type="text" />
        </label>
      </div>
    );
  }
}
