import Debts, { Purchase } from '../stores/Debts';
import Amortization from './amortization';

describe('Amortization', () => {
    it('no ball should take 1 month to pay off exact amount', () => {
        // 300 in debt - 300 payment with 0% APR should be one month
        Debts.add('One Month', [new Purchase(300, 0)])
        const amor = new Amortization(300, Debts)
        expect(amor.noBall.totalMonths).toEqual(1);
    });
});