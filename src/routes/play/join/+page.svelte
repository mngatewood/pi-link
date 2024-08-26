<script>
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let form;

	let code = '';
	let disableSubmit = false;
	$: disableSubmit = code?.length < 4;

	const clearMessages = () => {
		form = { error: false, message: '' };
	};
</script>

<div class="container join-container">
	<div>
		<h1>Join a Game</h1>
		<h4>Enter the code provided by your game host below and click the Join button.</h4>
	</div>
	<form
		class="flex flex-col h-full"
		method="post"
		use:enhance={({ formData }) => {
			return async ({ result }) => {
				form = result.data;
				code = '';
				if (!form?.error) {
					const game = result.data.game;
					goto(`/play/game/${game.id}`);
				}
			};
		}}
	>
		<div class="form-item notepad">
			<input
				bind:value={code}
				type="text"
				id="code"
				class="h-full mb-0"
				name="code"
				placeholder="Enter Code"
				maxlength="4"
				on:focus={clearMessages}
			/>
		</div>
		<div class="form-item mb-4">
			{#if form?.error}
				<small>{form?.message}</small>
			{/if}
		</div>
		<div class="form-item flex">
			<a class="href-button button-cancel inline-button" id="cancel-join" href="/play">Cancel</a>
			<button
				disabled={disableSubmit}
				class="button-submit inline-button"
				type="submit"
				id="submit-join">Join</button
			>
		</div>
	</form>
</div>

<style lang="postcss">
</style>
