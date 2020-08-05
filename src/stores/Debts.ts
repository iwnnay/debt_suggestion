import Store, { create } from './BeagleRoy';

export class Purchase {
  constructor(amount, apr) {
    this.amount = amount;
    this.apr = apr;
  }
}

class Debts extends Store {
  add(name: string, purchases: array) {
    let { debts } = this.data;
    debts[name] = { purchases };
    this.then({ debts });
  }

  get clone() {
    return Object.assign({}, this.beagleRoy.data.debts);
  }
}

export default create(Debts, { debts: [] });
