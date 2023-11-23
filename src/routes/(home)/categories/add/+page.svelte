<style src="./categories.scss"></style>

<main class="admin__main">
    <h2>Add Category</h2>
    <form method= "POST" class="theForm" action="?/addCategory">
        <label class="theForm__label" for="name">Name</label>
        <input type="text" class ="theForm__input" placeholder="Insert name" name="name" id="name" required>

        <label class="theForm__label" for="transaction_type">Type</label>
        <select class ="theForm__input" name = "transaction_type" id ="transaction_type" required>
            <option value="EARNING">EARNING</option>
            <option value="EXPENSE">EXPENSE</option>
        </select>

        <button class ="theForm__input theForm__button">Submit</button>
    </form>
</main>