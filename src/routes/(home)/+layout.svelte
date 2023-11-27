<script>
    export let data;
    const {user} = data;
</script>

<style global src="./layout.scss"></style>

<div class="admin">
    <header class="admin__header">
      <a href="/" class="logo">
        <h1>Tabunganku</h1>
      </a>
      <div class="toolbar">
        <strong class="username">{user.username}</strong>
        <strong class="logout">Logout</strong>
      </div>
    </header>
    <nav class="admin__nav">
      <ul class="menu">
        <li class="menu__item">
          <a class="menu__link" href="/categories/add" data-sveltekit-preload-data>Add Category</a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="/transactions/add" data-sveltekit-preload-data>Add Transaction</a>
        </li>
      </ul>
    </nav>
    <slot/>
  </div>