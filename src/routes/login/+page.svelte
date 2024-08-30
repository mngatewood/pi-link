<script>
	import { VisibleIcon, NotVisibleIcon } from '$lib/index.js';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	export let form;

	// Render registration success message if newly registered
	const newlyRegistered = $page.url.searchParams.get('registered');

	let showPassword = false;
	let password = '';
	let email = '';

	let disableSubmit = false;
	$: disableSubmit = !(password?.length || email?.length);

	$: {
		if (email && form?.error) email.focus();
	}
</script>

<div class="container">
	<h1>Login</h1>
	{#if newlyRegistered}
		<div class="form-item">
			<small>Registration successful. Please login.</small>
		</div>
	{/if}
	<form method="post" action="?/login" use:enhance>
		<div class="form-item">
			<label for="email">Email Address<sup><small>*</small></sup></label>
			<br />
			<input
				bind:this={email}
				class:fieldError={form?.error}
				value={form?.email ?? ''}
				id="email"
				type="email"
				name="email"
				required
			/>
		</div>

		<div class="form-item">
			<label for="password">Password<sup><small>*</small></sup></label>
			<div class="visibility-container">
				{#if !showPassword}
					<input bind:value={password} type="password" id="password" name="password" required />
					<button class="btn-visibility" type="button" on:click={() => (showPassword = true)}>
						<img class="mag-glass" src={VisibleIcon} alt="Magnifying Glass Icon" />
					</button>
				{:else}
					<input bind:value={password} type="text" id="password" name="password" required />
					<button class="btn-visibility" type="button" on:click={() => (showPassword = false)}>
						<img class="mag-glass" src={NotVisibleIcon} alt="Strikethrough Magnifying Glass Icon" />
					</button>
				{/if}
			</div>
		</div>

		<div class="form-item">
			{#if form?.error}
				<small>{form?.message}</small>
			{/if}
		</div>

		<div class="form-item flex">
			<a class="href-button button-cancel inline-button" href="/">Cancel</a>
			<button
				disabled={disableSubmit}
				type="submit"
				id="submit-registration"
				class="button-submit inline-button">Log In</button
			>
		</div>
	</form>
</div>

<style lang="postcss">
	button.btn-visibility {
		padding-top: 0;
	}
</style>
