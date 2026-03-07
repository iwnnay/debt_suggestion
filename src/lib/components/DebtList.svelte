<script lang="ts">
    import type { DebtInput } from '$lib/types/debt';
    import { currency, percent } from '$lib/utils/payoff';

    type Props = {
        debts: DebtInput[];
        onRemove: (id: string) => void;
    };

    let { debts, onRemove }: Props = $props();

    function handleRemoveClick(id: string): void {
        onRemove(id);
    }
</script>

<section class="card">
    <h2>Debt list</h2>

    {#if debts.length === 0}
        <p class="empty">No debts yet. Add one above to begin.</p>
    {:else}
        <div class="table-wrap">
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Balance</th>
                    <th>Min Payment</th>
                    <th>APR</th>
                    <th>Promo</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {#each debts as debt}
                    <tr>
                        <td>{debt.name}</td>
                        <td>{debt.type === 'credit-card' ? 'Credit Card' : 'Loan'}</td>
                        <td>{currency(debt.balance)}</td>
                        <td>{currency(debt.minPayment)}</td>
                        <td>{percent(debt.apr)}</td>
                        <td>{debt.type === 'credit-card' && debt.promoEnd ? debt.promoEnd : '—'}</td>
                        <td>
                            <button class="danger" onclick={() => handleRemoveClick(debt.id)}>Remove</button>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    {/if}
</section>

<style>
    .card {
        background: rgba(255, 255, 255, 0.82);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(148, 163, 184, 0.2);
        border-radius: 18px;
        padding: 1.25rem;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
        margin-bottom: 1rem;
    }

    h2 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }

    .empty {
        color: #64748b;
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

    button {
        font: inherit;
        border: none;
        border-radius: 12px;
        padding: 0.75rem 1rem;
        cursor: pointer;
        font-weight: 700;
    }

    button.danger {
        background: #fee2e2;
        color: #b91c1c;
    }

    button.danger:hover {
        background: #fecaca;
    }
</style>
