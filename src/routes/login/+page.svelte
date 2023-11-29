<style src="./login.scss"></style>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap" rel="stylesheet"> 

<svelte:head>
  <title>Log in to Tabunganku</title>
	<html lang="en" />
</svelte:head>

<script>
  export let form;

  let error;
</script>

<div class="main">  	
  <input type="checkbox" id="chk" aria-hidden="true">

    <div class="signup">
      <form action="?/register" method="POST">
        <label for="chk" aria-hidden="true">Sign up</label>
        <input type="text" name="txt" placeholder="User name" required="">
        <input type="email" name="email" placeholder="Email" required="">
        <input type="password" name="pswd" placeholder="Password" required="">
        <button>Sign up</button>
      </form>
    </div>

    <div class="login">
      <form action="?/login" method="POST">
        <label for="chk" aria-hidden="true">Login</label>
        <input type="email" name="email" placeholder="Email" required="">
        <input type="password" name="pswd" placeholder="Password" required="">
        {#if form?.invalid}
          <span class="failedlogin">Email and password is required</span>
        {/if}
        {#if form?.credentials}
          <span class="failedlogin">Failed to Login</span>
        {/if}
        <button>Login</button>
      </form>
    </div>
</div>