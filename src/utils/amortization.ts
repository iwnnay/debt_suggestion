import { moment } from 'moment';

export default class Amortization {
    constructor (payment: integer, debtStore: Debts) {
        const debts = Object.assign({}, debtStore.data.debts);
        this.payment = payment;
        this.currentMonth = moment();
        this.strategies = {
            snowball: { debts },
            smartball: { debts },
            noball: { debts },
        }
    }

    runStrategies() {
        this.currentMonth = this.currentMonth.add(1, 'month');
        this.calcSnowball();
        this.calcSmartball();
        this.calcNoball();
    }

    calcSnowball(){}
    calcSmartball(){}
    calcNoball() {
        // need to go through month by month for each debt
        // apply the same mount
        // if the total amount is zero or less then we're doen
    }

    get noBall() { return this.strategies.noball; }
}