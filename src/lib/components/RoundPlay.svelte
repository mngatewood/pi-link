<script>
	import { enhance } from '$app/forms';
	import RoundHeader from './RoundHeader.svelte';
	export let data;

	const isInformant = data.game.playerRoles[data.user.id] == 'Informant';
	let displayContinue = 'flex';
	let displayConfirm = 'none';
</script>

<RoundHeader {data} />
<div class="stage-container">
	{#if isInformant}
		<form method="post" action="?/finishPlay" class="w-full" use:enhance>
			<div class="form-item">
				<input type="hidden" name="gameId" value={data.game.id} />
				<input type="hidden" name="isInformant" value={isInformant} />
				<button
					type="button"
					style="display:{displayContinue}"
					id="continue"
					class="href-button button-fit-content button-submit"
					on:click={() => {
						(displayConfirm = 'flex'), (displayContinue = 'none');
					}}>All players have played two cards.</button
				>
				<button
					type="submit"
					style="display:{displayConfirm}"
					id="confirm"
					class="href-button button-fit-content button-submit"
					on:click={() => {
						(displayConfirm = 'none'), (displayContinue = 'flex');
					}}>Proceed to next stage.</button
				>
			</div>
		</form>
	{:else}
		<h3>Waiting for all players to play two cards.</h3>
	{/if}
</div>

<style lang="postcss">
	button.button-submit {
		padding: 0.75rem;
	}

	button#confirm {
		color: white;
		background-color: theme('colors.red.500');
	}
</style>
