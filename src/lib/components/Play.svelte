<script>
	import { page } from '$app/stores';

	const removed = $page.url.searchParams.get('removed');
</script>

<div class="container play-container">
	<div>
		<h1>Welcome!</h1>
		<h4>Join an existing game or host a new game.</h4>
	</div>

	{#if removed}
		<div class="text-center alert">
			<small>You were removed from the game.</small>
		</div>
	{/if}

	<a class="href-button" href="/play/join">Join a Game</a>
	<a class="href-button" href="/play/host">Host a Game</a>
</div>

<style lang="postcss">
	.play-container {
		justify-content: space-evenly;
	}
</style>
