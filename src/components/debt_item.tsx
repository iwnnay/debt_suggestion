import * as React from 'react';
import LineItem from './line_item'


export default class DebtItem extends React.Component {
    render() {
        if (true) {
            return (
                <li>
                    <label htmlFor="account_name">
                    Name:
                    <input name="account_name" type="text" />
                    </label>

                    <label htmlFor="apr">
                    General APR:
                    <input name="apr" type="text" />
                    </label>

                    <ul>
                        <LineItem />
                    </ul>
                </li>
            );
        } else {
            return (
                <li>
                        <button className="add-debt">+</button>
                </li>
            );
        }
    }
}