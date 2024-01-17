<script lang="ts">
  import { onMount } from 'svelte';
  export let data;
  export let {keycloak} = data;

  onMount(() => {
    if (!keycloak) {
      window.location.reload();
    }
  });

</script>
<style global src="./layout.scss"></style>
<div class="admin">
  <header class="admin__header">
    <a href="/" class="logo">
      <h1>Tabunganku</h1>
    </a>
    <nav class="toolbar">
      <span>Hi,
        <strong class="username"> {keycloak.tokenParsed.preferred_username} </strong>!
      </span>
      <a href="/logout" class="logout">Logout</a>
    </nav>
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
  {#if keycloak}
    <slot/>
  {/if}
</div>