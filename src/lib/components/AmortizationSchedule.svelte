<script lang="ts">
    import type { MonthRow } from '$lib/types/debt';
    import { currency } from '$lib/utils/payoff';

    type Props = {
        schedule: MonthRow[];
    };

    let { schedule }: Props = $props();
</script>

<section class="card">
    <h2>Live amortization schedule</h2>

    {#if schedule.length === 0}
        <p class="empty">The schedule will appear as soon as you add debt items.</p>
    {:else}
        <div class="table-wrap tall">
            <table>
                <thead>
                <tr>
                    <th>Month</th>
                    <th>Date</th>
                    <th>Focus Debt</th>
                    <th>Start Balance</th>
                    <th>Interest</th>
                    <th>Payment</th>
                    <th>End Balance</th>
                </tr>
                </thead>
                <tbody>
                {#each schedule as row}
                    <tr>
                        <td>{row.month}</td>
                        <td>{row.dateLabel}</td>
                        <td>{row.focusDebt ?? '—'}</td>
                        <td>{currency(row.startingBalance)}</td>
                        <td>{currency(row.interestCharged)}</td>
                        <td>{currency(row.paymentApplied)}</td>
                        <td>{currency(row.endingBalance)}</td>
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

    .table-wrap.tall {
        max-height: 520px;
        overflow: auto;
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
