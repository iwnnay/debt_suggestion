import Store, { create } from './BeagleRoy';

class Debts extends Store {
  incrementBy(amount) {
    this.then({ amount: this.data.amount + amount });
  }

  decrementBy(amount) {
    const newAmount = this.data.amount - amount;
    if (newAmount < 0) {
      return false;
    }

    this.then({ amount: newAmount });
    return true;
  }

  display() {
    return this.data.amount;
  }
}

export default create(Debts, { debts: [] });
