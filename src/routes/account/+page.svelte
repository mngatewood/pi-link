<script>
	export let data;
</script>

<div class="container">
	<h1>Account</h1>
	{#if data.user}
		<h4 class="uppercase">{data.user.email}</h4>
		<a data-sveltekit-preload-data="off" href="/logout" class="button href-button">Log Out</a>
	{:else}
		<h4>Please <a data-testid="login-inline" class="href-inline" href="/login">login</a> or <a data-testid="register-inline" class="href-inline" href="/register">register</a>.</h4>
		<div class="buttons-container w-full">
			<a data-testid="register-button" class="href-button" href="/register">Register</a>
			<a data-testid="login-button" class="href-button" href="/login">Login</a>
		</div>
	{/if}

</div>

<style lang="postcss">
</style>
