<script lang="ts">
	import { enhance } from '$app/forms';
	import RoundHeader from './RoundHeader.svelte';
	export let data;

	let isInformant;
	let clueWord = '';
	let disableSubmit = false;

	$: isInformant = data.game.playerRoles[data.user.id] == 'Informant';
	$: disableSubmit = clueWord?.length < 2;

	const handleInvalid = (event: Event) => {
		if (event.target instanceof HTMLInputElement) {
			event.target.setCustomValidity('Please enter one word.');
		}
	}

	const handleInput = (event: Event) => {
		if (event.target instanceof HTMLInputElement) {
			event.target.setCustomValidity('');
		}
	}
</script>

<RoundHeader {data} />
<div class="stage-container">
	{#if isInformant}
		<form method="post" action="?/submitClue" use:enhance>
			<div class="form-item mx-4">
				<input type="hidden" name="gameId" value={data.game.id} />
				<input type="hidden" name="isInformant" value={isInformant} />
				<input
					bind:value={clueWord}
					id="clue"
					type="text"
					name="clue"
					class="h-20 text-5xl"
					placeholder="Enter Clue"
					pattern="^[a-zA-Z0-9\-]+$"
					maxlength="20"
					on:invalid={handleInvalid}
					on:input={handleInput}
					required
				/>
			</div>

			<div class="form-item">
				<div class="flex justify-between w-full">
					<button
						type="button"
						id="clear-clue"
						class="href-button button-cancel inline-button"
						on:click={() => (clueWord = '')}>Clear</button
					>
					<button disabled={disableSubmit} type="submit" id="submit-clue" class="inline-button"
						>Submit</button
					>
				</div>
			</div>
		</form>
	{:else}
		<h3>Waiting for the Informant to submit a clue.</h3>
	{/if}
</div>

<style lang="postcss">
	/* Hack for iPhone not using global styles on Submit button */
	button#submit-clue {
		background-color: theme('colors.brown.1');
	}

	button#submit-clue:disabled {
		background-color: theme('colors.gray.400');
	}

	::placeholder {
		color: theme('colors.brown.1');
		opacity: 1;
	}
</style>
