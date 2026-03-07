export type DebtType = 'credit-card' | 'loan';
export type Strategy = 'avalanche' | 'snowball';

export type DebtInput = {
	id: string;
	name: string;
	type: DebtType;
	balance: number;
	minPayment: number;
	apr: number;
	promoEnd?: string;
};

export type DebtSnapshot = DebtInput & {
	currentBalance: number;
	paidOffMonth: number | null;
	totalInterestPaid: number;
};

export type MonthRow = {
	month: number;
	dateLabel: string;
	startingBalance: number;
	interestCharged: number;
	paymentApplied: number;
	endingBalance: number;
	focusDebt: string | null;
};

export type SimulationResult = {
	schedule: MonthRow[];
	payoffOrder: string[];
	totalInterestPaid: number;
	monthsToPayoff: number;
	isPayoffPossible: boolean;
	finalDebts: DebtSnapshot[];
};
