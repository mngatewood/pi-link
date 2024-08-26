<script>
	export let data;
</script>

<div class="container">
	<div>
		<h1>Host a New Game</h1>
		<h4 class="px-4">Share the following code to allow other detectives to join.</h4>
	</div>
	<div data-testid="host-code-notepad" class="notepad">
		<h2 id="host-code">{data.code?.toString().padStart(4, '0')}</h2>
	</div>
	<h4 class="mb-8">
		Once all participants have the code, press the Continue button to proceed to the lobby.
	</h4>
	<div class="flex w-full">
		<a class="href-button button-cancel inline-button" id="cancel-host" href="/play">Cancel</a>
		<a
			class="href-button button-submit inline-button"
			id="submit-host"
			href="/play/game/{data.gameId}">Continue</a
		>
	</div>
</div>

<style lang="postcss">
</style>
