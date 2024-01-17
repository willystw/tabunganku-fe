<svelte:head>
    <title>Add Transaction</title> 
</svelte:head>

<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    let transactionDateInput = document.getElementById('transaction_date') as HTMLInputElement;
    transactionDateInput.valueAsDate = new Date();
  });

  export let data;
  const { categories } = data;

  import { invalidateAll, goto } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import type { ActionData } from './$types';
	import type { ActionResult } from '@sveltejs/kit';

  export let form: ActionData;
	let error: any;
	
	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const data = new FormData(event.currentTarget);
		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: data,
		});

    let submitButton = document.getElementById('submit_btn') as HTMLButtonElement;
    submitButton.disabled = true;

    const t = await response.text();
	
		const result: ActionResult = deserialize(t);
		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
      await invalidateAll();
		} else {
      submitButton.disabled = false;
    }
		applyAction(result);
	}

</script>
<style src="./transaction.scss"></style>

<main class="admin__main">
    <h2>Add Transaction</h2>

    <form method= "POST" class="theForm" action="/api/transactions/add" on:submit|preventDefault={handleSubmit}>
        <label class="theForm__label" for="amount">Amount</label>
        <input type="text" class ="theForm__input" placeholder="Insert amount" name="amount" id="amount" required>

        <label class="theForm__label" for="category_id">Category</label>
        <select class ="theForm__input" name = "category_id" id ="category_id" required>
            {#each categories as category}
                <option value="{category.category_id}">{category.category_name}</option>
            {/each}
        </select>

        <label class="theForm__label" for="transaction_date">Date</label>
        <input type="date" class ="theForm__input" id="transaction_date" name="transaction_date" required>

        <label class="theForm__label" for="note">Notes</label>
        <textarea placeholder="Insert notes" id="note" class ="theForm__input"  name="note" rows="5" cols="30"></textarea>

        <button class ="theForm__input theForm__button" id="submit_btn">Submit</button>
    </form>
</main>