<script>
    export let data;
    const { categories } = data;
</script>
<style src="./transaction.scss"></style>

<main class="admin__main">
    <h2>Add Transaction</h2>

    <form method= "POST" class="theForm" action="?/addTransaction">
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

        <button class ="theForm__input theForm__button">Submit</button>
    </form>
</main>