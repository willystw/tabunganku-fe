<script lang="ts">
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
      setTimeout(() => { 
        invalidateAll();
      }, 2000);
			
		} else {
      submitButton.disabled = false;
    }
		applyAction(result);
	}
</script>

<svelte:head>
    <title>Add Category</title> 
</svelte:head>

<style src="./categories.scss"></style>
<main class="admin__main">
    <h2>Add Category</h2>
    <form method= "POST" class="theForm" action="/api/categories/add" on:submit|preventDefault={handleSubmit}>
        <label class="theForm__label" for="name">Name</label>
        <input type="text" class ="theForm__input" placeholder="Insert name" name="name" id="name" required>

        <label class="theForm__label" for="transaction_type">Type</label>
        <select class ="theForm__input" name = "transaction_type" id ="transaction_type" required>
            <option value="EARNING">EARNING</option>
            <option value="EXPENSE">EXPENSE</option>
        </select>

        <button class ="theForm__input theForm__button" id="submit_btn">Submit</button>
    </form>
</main>