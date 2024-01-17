<svelte:head>
    <title>Logout</title> 
</svelte:head>

<script lang="ts">
  import { onMount } from 'svelte';
  import type {KeycloakLogoutOptions} from 'keycloak-js';

  export let data;
  onMount(
    () => setTimeout(() => {
      let logoutOptions: KeycloakLogoutOptions = {
        redirectUri: data.home,
      };
      if (data.keycloak) {
        data.keycloak.logout(logoutOptions);
      }
    }, 3000)
  );
</script>


<p>Logging Out...</p>