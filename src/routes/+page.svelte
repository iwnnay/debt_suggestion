<script lang="ts">
    import AmortizationSchedule from '$lib/components/AmortizationSchedule.svelte';
    import DebtForm from '$lib/components/DebtForm.svelte';
    import DebtList from '$lib/components/DebtList.svelte';
    import PayoffSummary from '$lib/components/PayoffSummary.svelte';
    import type { DebtInput, DebtType, Strategy } from '$lib/types/debt';
    import { createBlankDebt, createDefaultPromoEnd, simulatePayoff } from '$lib/utils/payoff';

    const today = new Date();
    const defaultPromoEnd = createDefaultPromoEnd(today);

    let strategy: Strategy = 'avalanche';
    let extraPayment = 200;

    let debts: DebtInput[] = [
        {
            id: crypto.randomUUID(),
            name: 'Visa Card',
            type: 'credit-card',
            balance: 4200,
            minPayment: 120,
            apr: 24.99,
            promoEnd: defaultPromoEnd
        },
        {
            id: crypto.randomUUID(),
            name: 'Car Loan',
            type: 'loan',
            balance: 9800,
            minPayment: 275,
            apr: 6.25
        }
    ];

    let form: DebtInput = createBlankDebt('credit-card', today);

    function addDebt(): void {
        if (!form.name.trim()) return;
        if (form.balance <= 0) return;
        if (form.minPayment <= 0) return;
        if (form.apr < 0) return;

        debts = [
            ...debts,
            {
                ...form,
                id: crypto.randomUUID(),
                name: form.name.trim(),
                promoEnd: form.type === 'credit-card' ? form.promoEnd : undefined
            }
        ];

        form = createBlankDebt(form.type, today);
    }

    function removeDebt(id: string): void {
        debts = debts.filter((debt) => debt.id !== id);
    }

    function updateFormType(type: DebtType): void {
        form = {
            ...form,
            type,
            promoEnd: type === 'credit-card' ? form.promoEnd ?? defaultPromoEnd : undefined
        };
    }

    const result = $derived(simulatePayoff(debts, strategy, extraPayment, today));
    const totalDebt = $derived(debts.reduce((sum, debt) => sum + debt.balance, 0));
    const totalMinimums = $derived(debts.reduce((sum, debt) => sum + debt.minPayment, 0));
</script>

<svelte:head>
    <title>Debt Calculator</title>
    <meta
            name="description"
            content="Debt payoff calculator with avalanche, snowball, promo APR, and live amortization schedule."
    />
</svelte:head>

<div class="page">
    <section class="hero">
        <div>
            <p class="eyebrow">Single Page Debt Calculator</p>
            <h1>Plan your payoff with live numbers</h1>
            <p class="subtitle">
                Add credit cards and loans, choose avalanche or snowball, include extra monthly
                payments, and see your amortization schedule update instantly.
            </p>
        </div>
    </section>

    <section class="grid">
        <DebtForm form={form} onAdd={addDebt} onTypeChange={updateFormType} />

        <PayoffSummary
                {strategy}
                {extraPayment}
                {totalDebt}
                {totalMinimums}
                monthsToPayoff={result.monthsToPayoff}
                totalInterestPaid={result.totalInterestPaid}
                isPayoffPossible={result.isPayoffPossible}
                payoffOrder={result.payoffOrder}
                finalDebts={result.finalDebts}
                onStrategyChange={(value) => (strategy = value)}
                onExtraPaymentChange={(value) => (extraPayment = value)}
        />
    </section>

    <DebtList debts={debts} onRemove={removeDebt} />

    <AmortizationSchedule schedule={result.schedule} />
</div>

<style>
    :global(body) {
        margin: 0;
        font-family:
                Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
        color: #0f172a;
    }

    .page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem 4rem;
    }

    .hero {
        margin-bottom: 1.5rem;
    }

    .eyebrow {
        margin: 0 0 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.75rem;
        font-weight: 700;
        color: #6366f1;
    }

    h1 {
        margin: 0;
        font-size: clamp(2rem, 4vw, 3rem);
        line-height: 1.05;
    }

    .subtitle {
        max-width: 70ch;
        color: #475569;
    }

    .grid {
        display: grid;
        gap: 1rem;
        margin-bottom: 1rem;
    }
</style>
