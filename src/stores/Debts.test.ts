import debts, { Purchase } from 'stores/Debts';

describe('Debts', () => {
    it('should add a debt to the store', () => {
        debts.add('Example', []);
        expect(debts.clone).toEqual({'Example': []});
    })
});