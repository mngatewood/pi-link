<script>
	import { page } from '$app/stores';

	const removed = $page.url.searchParams.get('removed');
	const ended = $page.url.searchParams.get('ended');
	const host = $page.url.searchParams.get('host');
</script>

<div class="container">
	<div>
		<h1>Welcome!</h1>
		<h4>
			<a class="href-inline" href="/play/join">Join</a> an existing game or
			<a class="href-inline" href="/play/host">host</a> a new game.
		</h4>
	</div>

	{#if removed}
		<div class="text-center alert">
			<small>You were removed from the game.</small>
		</div>
	{:else if ended}
		<div class="text-center alert">
			{#if host == 'true'}
				<small>You ended the game.</small>
			{:else}
				<small>The game was ended by the host.</small>
			{/if}
		</div>
	{/if}
	<div class="buttons-container w-full">
		<a class="href-button" href="/play/join">Join a Game</a>
		<a class="href-button" href="/play/host">Host a Game</a>
	</div>
</div>

<style lang="postcss">
</style>
