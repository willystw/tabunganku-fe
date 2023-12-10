<svelte:head>
  <title>Log in to Tabunganku</title>
	<html lang="en" />
</svelte:head>

<link href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap" rel="stylesheet"> 
<style src="./login.scss"></style>

<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import type { PageData } from './$types';
  export let data: PageData;

  const { 
    form, 
    errors, 
    enhance, 
    message,
    constraints
  } = superForm(data.loginForm, {resetForm: true});

  const {
    form: registerForm,
    errors: registerErrors,
    enhance: registerEnhance,
    message: registerMessage,
    constraints: registerConstraints
  } = superForm(data.registerForm, {resetForm: true});
</script>

<body>
  <div class="main">  	
    <input type="checkbox" id="chk" aria-hidden="true">

      <div class="signup">
        <form action="?/register" method="POST" use:registerEnhance>
          <label for="chk" aria-hidden="true">Sign up</label>
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            required
            bind:value={$form.username}
            {...$registerConstraints.username}
            aria-invalid={$registerErrors.username ? 'true' : undefined} />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            required
            bind:value={$form.email} 
            {...$registerConstraints.email}
            aria-invalid={$registerErrors.email ? 'true' : undefined} />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            required
            bind:value={$form.password}
            {...$registerConstraints.password}
            aria-invalid={$registerErrors.password ? 'true' : undefined}/>
          <button>Sign up</button>
        </form>
      </div>

      <div class="login">
        <form action="?/login" method="POST" use:enhance>
          <label for="chk" aria-hidden="true">Login</label>
          <input type="email" 
            name="email" 
            placeholder="Email" 
            bind:value={$form.email} 
            aria-invalid={$errors.email ? 'true' : undefined} />
          <input type="password" 
            name="password" 
            placeholder="Password" 
            bind:value={$form.password} 
            aria-invalid={$errors.password ? 'true' : undefined}/>
          {#if $message}
            <span class="failedlogin">{$message}</span>
          {/if}
          <button>Login</button>
        </form>
      </div>
  </div>
</body>