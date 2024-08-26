<script>
	export let data;
</script>

<div class="container">
	<h1>Account</h1>
	<h4 class="uppercase">{data.user.email}</h4>
	<a data-sveltekit-preload-data="off" href="/logout" class="button href-button">Log Out</a>
</div>

<style lang="postcss">
</style>
