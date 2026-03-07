<script lang="ts">
    import type { DebtSnapshot, Strategy } from '$lib/types/debt';
    import { currency } from '$lib/utils/payoff';

    type Props = {
        strategy: Strategy;
        extraPayment: number;
        totalDebt: number;
        totalMinimums: number;
        monthsToPayoff: number;
        totalInterestPaid: number;
        isPayoffPossible: boolean;
        payoffOrder: string[];
        finalDebts: DebtSnapshot[];
        onStrategyChange: (value: Strategy) => void;
        onExtraPaymentChange: (value: number) => void;
    };

    let {
        strategy,
        extraPayment,
        totalDebt,
        totalMinimums,
        monthsToPayoff,
        totalInterestPaid,
        isPayoffPossible,
        payoffOrder,
        finalDebts,
        onStrategyChange,
        onExtraPaymentChange
    }: Props = $props();

    function handleStrategyChange(event: Event): void {
        const target = event.currentTarget as HTMLSelectElement;
        onStrategyChange(target.value as Strategy);
    }

    function handleExtraPaymentChange(event: Event): void {
        const target = event.currentTarget as HTMLInputElement;
        onExtraPaymentChange(Number(target.value));
    }
</script>

<div class="grid">
    <div class="card">
        <h2>Payoff settings</h2>

        <div class="stack">
            <label>
                <span>Strategy</span>
                <select
                        bind:value={strategy}
                        onchange={handleStrategyChange}
                >
                    <option value="avalanche">Avalanche (highest APR first)</option>
                    <option value="snowball">Snowball (smallest balance first)</option>
                </select>
            </label>

            <label>
                <span>Additional monthly payment</span>
                <input
                        type="number"
                        min="0"
                        step="0.01"
                        bind:value={extraPayment}
                        oninput={handleExtraPaymentChange}
                />
            </label>
        </div>

        <div class="summary-grid">
            <div class="metric">
                <span>Total debt</span>
                <strong>{currency(totalDebt)}</strong>
            </div>
            <div class="metric">
                <span>Total minimums</span>
                <strong>{currency(totalMinimums)}</strong>
            </div>
            <div class="metric">
                <span>Months to payoff</span>
                <strong>{monthsToPayoff || 0}</strong>
            </div>
            <div class="metric">
                <span>Total interest</span>
                <strong>{currency(totalInterestPaid)}</strong>
            </div>
        </div>

        {#if !isPayoffPossible}
            <p class="warning">
                Your current minimum payments may be too low to fully amortize one or more debts.
                Try increasing the minimum payment or extra payment.
            </p>
        {/if}
    </div>

    <div class="card">
        <h2>Recommended payoff order</h2>

        {#if payoffOrder.length === 0}
            <p class="empty">Add debts to see the projected payoff sequence.</p>
        {:else}
            <ol class="payoff-order">
                {#each payoffOrder as item, index}
                    <li>
                        <span class="order-index">{index + 1}</span>
                        <span>{item}</span>
                    </li>
                {/each}
            </ol>
        {/if}
    </div>

    <div class="card wide">
        <h2>Debt payoff details</h2>

        {#if finalDebts.length === 0}
            <p class="empty">No payoff details yet.</p>
        {:else}
            <div class="table-wrap">
                <table>
                    <thead>
                    <tr>
                        <th>Debt</th>
                        <th>Projected payoff month</th>
                        <th>Total interest</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each finalDebts as debt}
                        <tr>
                            <td>{debt.name}</td>
                            <td>{debt.paidOffMonth ? `${debt.paidOffMonth}` : '—'}</td>
                            <td>{currency(debt.totalInterestPaid)}</td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
        {/if}
    </div>
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .card {
        background: rgba(255, 255, 255, 0.82);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(148, 163, 184, 0.2);
        border-radius: 18px;
        padding: 1.25rem;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
    }

    .wide {
        grid-column: 1 / -1;
    }

    h2 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }

    .stack {
        display: grid;
        gap: 0.9rem;
    }

    label {
        display: grid;
        gap: 0.35rem;
        font-size: 0.92rem;
        font-weight: 600;
        color: #334155;
    }

    input,
    select {
        font: inherit;
        width: 100%;
        box-sizing: border-box;
        padding: 0.75rem 0.85rem;
        border-radius: 12px;
        border: 1px solid #cbd5e1;
        background: white;
        color: #0f172a;
    }

    input:focus,
    select:focus {
        outline: 2px solid #818cf8;
        outline-offset: 1px;
        border-color: #818cf8;
    }

    .summary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 0.75rem;
        margin-top: 1rem;
    }

    .metric {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 14px;
        padding: 0.9rem;
        display: grid;
        gap: 0.25rem;
    }

    .metric span {
        font-size: 0.82rem;
        color: #64748b;
    }

    .metric strong {
        font-size: 1.1rem;
    }

    .warning {
        margin-top: 1rem;
        padding: 0.9rem 1rem;
        border-radius: 12px;
        background: #fff7ed;
        color: #9a3412;
        border: 1px solid #fdba74;
    }

    .empty {
        color: #64748b;
    }

    .payoff-order {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 0.7rem;
    }

    .payoff-order li {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 0.9rem;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 14px;
    }

    .order-index {
        display: inline-grid;
        place-items: center;
        width: 1.9rem;
        height: 1.9rem;
        border-radius: 999px;
        background: #4f46e5;
        color: white;
        font-size: 0.85rem;
        font-weight: 700;
    }

    .table-wrap {
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th,
    td {
        text-align: left;
        padding: 0.85rem 0.75rem;
        border-bottom: 1px solid #e2e8f0;
        white-space: nowrap;
        font-size: 0.94rem;
    }

    th {
        color: #475569;
        font-size: 0.82rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
    }
</style>
