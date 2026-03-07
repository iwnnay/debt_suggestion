<script lang="ts">
    import type { DebtInput, DebtType } from '$lib/types/debt';

    type Props = {
        form: DebtInput;
        onAdd: () => void;
        onTypeChange: (type: DebtType) => void;
    };

    let { form, onAdd, onTypeChange }: Props = $props();

    function handleTypeChange(event: Event): void {
        const target = event.currentTarget as HTMLSelectElement;
        onTypeChange(target.value as DebtType);
    }

    function handleAddClick(): void {
        onAdd();
    }
</script>

<div class="card">
    <h2>Add a debt</h2>

    <div class="form-grid">
        <label>
            <span>Type</span>
            <select
                    bind:value={form.type}
                    onchange={handleTypeChange}
            >
                <option value="credit-card">Credit Card</option>
                <option value="loan">Loan</option>
            </select>
        </label>

        <label>
            <span>Name</span>
            <input bind:value={form.name} placeholder="e.g. Chase Freedom" />
        </label>

        <label>
            <span>Balance</span>
            <input bind:value={form.balance} type="number" min="0" step="0.01" />
        </label>

        <label>
            <span>Minimum payment</span>
            <input bind:value={form.minPayment} type="number" min="0" step="0.01" />
        </label>

        <label>
            <span>APR (%)</span>
            <input bind:value={form.apr} type="number" min="0" step="0.01" />
        </label>

        {#if form.type === 'credit-card'}
            <label>
                <span>0% promo end date</span>
                <input bind:value={form.promoEnd} type="date" />
            </label>
        {/if}
    </div>

    <button class="primary" onclick={handleAddClick}>Add debt</button>
</div>

<style>
    .card {
        background: rgba(255, 255, 255, 0.82);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(148, 163, 184, 0.2);
        border-radius: 18px;
        padding: 1.25rem;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
    }

    h2 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }

    .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 0.9rem;
        margin-bottom: 1rem;
    }

    label {
        display: grid;
        gap: 0.35rem;
        font-size: 0.92rem;
        font-weight: 600;
        color: #334155;
    }

    input,
    select,
    button {
        font: inherit;
    }

    input,
    select {
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

    button {
        border: none;
        border-radius: 12px;
        padding: 0.75rem 1rem;
        cursor: pointer;
        font-weight: 700;
    }

    button.primary {
        background: #4f46e5;
        color: white;
    }

    button.primary:hover {
        background: #4338ca;
    }
</style>
