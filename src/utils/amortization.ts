export default class Amortization {
    constructor (payment: integer, debts: Debts) {
        this.payment = payment;
        this.debts = debts;
        this.strategies = {
            snowball: {},
            smartball: {},
            noball: {},
        }
    }

    runStrategies() {
        this.calcSnowball();
        this.calcSmartball();
        this.calcNoball();
    }

    calcSnowball(){}
    calcSmartball(){}
    calcNoball(){}

    get noBall() { this.strategies.noball; }
}