import type { DebtInput, DebtSnapshot, SimulationResult, Strategy } from '$lib/types/debt';

export function currency(value: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	}).format(value);
}

export function percent(value: number): string {
	return `${value.toFixed(2)}%`;
}

export function createDefaultPromoEnd(baseDate = new Date()): string {
	return new Date(baseDate.getFullYear(), baseDate.getMonth() + 6, 1)
		.toISOString()
		.slice(0, 10);
}

export function createBlankDebt(
	type: DebtInput['type'],
	baseDate = new Date()
): DebtInput {
	return {
		id: crypto.randomUUID(),
		name: '',
		type,
		balance: 0,
		minPayment: 0,
		apr: 0,
		promoEnd: type === 'credit-card' ? createDefaultPromoEnd(baseDate) : undefined
	};
}

function monthLabelFromOffset(baseDate: Date, offset: number): string {
	const d = new Date(baseDate.getFullYear(), baseDate.getMonth() + offset, 1);
	return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function monthsUntilPromoEnd(baseDate: Date, promoEnd?: string): number {
	if (!promoEnd) return -1;

	const end = new Date(`${promoEnd}T00:00:00`);
	return (end.getFullYear() - baseDate.getFullYear()) * 12 + (end.getMonth() - baseDate.getMonth());
}

function effectiveAprForMonth(baseDate: Date, debt: DebtSnapshot, monthIndex: number): number {
	if (debt.type !== 'credit-card' || !debt.promoEnd) return debt.apr;

	const monthsLeft = monthsUntilPromoEnd(baseDate, debt.promoEnd);
	return monthIndex <= monthsLeft ? 0 : debt.apr;
}

function monthlyRate(apr: number): number {
	return apr / 100 / 12;
}

function sortDebtsForStrategy(
	baseDate: Date,
	items: DebtSnapshot[],
	monthIndex: number,
	mode: Strategy
): DebtSnapshot[] {
	return [...items]
		.filter((debt) => debt.currentBalance > 0.009)
		.sort((a, b) => {
			if (mode === 'snowball') {
				if (a.currentBalance !== b.currentBalance) {
					return a.currentBalance - b.currentBalance;
				}

				return effectiveAprForMonth(baseDate, b, monthIndex) - effectiveAprForMonth(baseDate, a, monthIndex);
			}

			const aprDiff =
				effectiveAprForMonth(baseDate, b, monthIndex) - effectiveAprForMonth(baseDate, a, monthIndex);

			if (aprDiff !== 0) return aprDiff;

			return a.currentBalance - b.currentBalance;
		});
}

export function simulatePayoff(
	items: DebtInput[],
	mode: Strategy,
	extra: number,
	baseDate = new Date()
): SimulationResult {
	const working: DebtSnapshot[] = items.map((debt) => ({
		...debt,
		currentBalance: debt.balance,
		paidOffMonth: null,
		totalInterestPaid: 0
	}));

	if (working.length === 0) {
		return {
			schedule: [],
			payoffOrder: [],
			totalInterestPaid: 0,
			monthsToPayoff: 0,
			isPayoffPossible: true,
			finalDebts: working
		};
	}

	const schedule: SimulationResult['schedule'] = [];
	const payoffOrder: string[] = [];
	let totalInterestPaid = 0;
	let month = 0;
	const safetyLimit = 600;

	while (working.some((debt) => debt.currentBalance > 0.009) && month < safetyLimit) {
		const activeDebts = working.filter((debt) => debt.currentBalance > 0.009);
		const startingBalance = activeDebts.reduce((sum, debt) => sum + debt.currentBalance, 0);

		let interestCharged = 0;

		for (const debt of activeDebts) {
			const apr = effectiveAprForMonth(baseDate, debt, month);
			const interest = debt.currentBalance * monthlyRate(apr);
			debt.currentBalance += interest;
			debt.totalInterestPaid += interest;
			interestCharged += interest;
		}

		totalInterestPaid += interestCharged;

		let paymentPool =
			activeDebts.reduce((sum, debt) => sum + Math.min(debt.minPayment, debt.currentBalance), 0) +
			Math.max(0, extra);

		const ordered = sortDebtsForStrategy(baseDate, working, month, mode);
		const focusDebt = ordered[0]?.name ?? null;

		for (const debt of ordered) {
			if (paymentPool <= 0) break;
			if (debt.currentBalance <= 0.009) continue;

			const minimum = Math.min(debt.minPayment, debt.currentBalance);
			const payment = Math.min(minimum, paymentPool);

			debt.currentBalance -= payment;
			paymentPool -= payment;
		}

		const orderedAfterMinimums = sortDebtsForStrategy(baseDate, working, month, mode);

		for (const debt of orderedAfterMinimums) {
			if (paymentPool <= 0) break;
			if (debt.currentBalance <= 0.009) continue;

			const extraToApply = Math.min(debt.currentBalance, paymentPool);
			debt.currentBalance -= extraToApply;
			paymentPool -= extraToApply;
		}

		for (const debt of working) {
			if (debt.currentBalance < 0.009) {
				debt.currentBalance = 0;
			}
		}

		const endingBalance = working.reduce((sum, debt) => sum + debt.currentBalance, 0);
		const paymentApplied = startingBalance + interestCharged - endingBalance;

		for (const debt of working) {
			if (debt.currentBalance <= 0.009 && debt.paidOffMonth === null) {
				debt.paidOffMonth = month + 1;
				payoffOrder.push(debt.name);
			}
		}

		schedule.push({
			month: month + 1,
			dateLabel: monthLabelFromOffset(baseDate, month),
			startingBalance,
			interestCharged,
			paymentApplied,
			endingBalance,
			focusDebt
		});

		const remaining = working.filter((debt) => debt.currentBalance > 0.009);

		if (
			remaining.length > 0 &&
			remaining.every((debt) => {
				const apr = effectiveAprForMonth(baseDate, debt, month + 1);
				return debt.minPayment <= debt.currentBalance * monthlyRate(apr);
			})
		) {
			return {
				schedule,
				payoffOrder,
				totalInterestPaid,
				monthsToPayoff: schedule.length,
				isPayoffPossible: false,
				finalDebts: working
			};
		}

		month += 1;
	}

	return {
		schedule,
		payoffOrder,
		totalInterestPaid,
		monthsToPayoff: schedule.length,
		isPayoffPossible: month < safetyLimit,
		finalDebts: working
	};
}
