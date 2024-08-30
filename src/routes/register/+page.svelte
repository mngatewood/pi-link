<script>
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { VisibleIcon, NotVisibleIcon } from '$lib/index.js';
	export let form;

	let showPassword = false;
	let showConfirm = false;
	let password = '';
	let confirm = '';
	let email = form?.email || '';
	let emailError;
	let emailInput;

	$: emailError = email == form?.email ? form.message : '';

	$: passMatchError = password?.length && confirm?.length && password == confirm ? false : true;
	$: passLengthError = password?.length >= 8 && confirm?.length >= 8 ? false : true;
	$: showPassError = (passMatchError || passLengthError) && password?.length && confirm?.length;
	$: showEmailError = form?.error && form?.types.includes('email') && email == form?.email;

	onMount(async () => {
		emailInput = document.getElementById('email');
	});

	$: if (emailInput && showEmailError) {
		emailInput.focus();
	}
</script>

<div class="container register-container">
	<div>
		<h1>Register</h1>
	</div>

	<div class="w-full">
		<form method="post" action="?/register" class="mb-8" use:enhance>
			<div class="form-item">
				<label for="firstname">First Name<sup><small>*</small></sup></label>
				<br />
				<input
					value={form?.firstname ?? ''}
					id="firstname"
					data-testid="register-firstname"
					type="text"
					name="firstname"
					required
				/>
			</div>

			<div class="form-item">
				<label for="lastname">Last Name<sup><small>*</small></sup></label>
				<br />
				<input
					value={form?.lastname ?? ''}
					id="lastname"
					data-testid="register-lastname"
					type="text"
					name="lastname"
					required
				/>
			</div>

			<div class="form-item">
				<label for="email">Email Address<sup><small>*</small></sup></label>
				<br />
				<input
					bind:value={email}
					class:fieldError={form?.message}
					id="email"
					data-testid="register-email"
					type="email"
					name="email"
					required
				/>
			</div>

			<div class="form-item">
				<label for="password"
					>Password<sup><small>*</small></sup> <em>(Minimum 8 characters)</em></label
				>
				<div class="visibility-container">
					{#if !showPassword}
						<input
							bind:value={password}
							class:fieldError={passMatchError || passLengthError}
							type="password"
							id="password"
							data-testid="register-password"
							name="password"
							required
						/>
						<button
							class="btn-visibility"
							type="button"
							on:click={() => (showPassword = true)}
							tabindex="-1"
						>
							<img class="mag-glass" src={VisibleIcon} alt="Magnifying Glass Icon" />
						</button>
					{:else}
						<input
							bind:value={password}
							class:fieldError={passMatchError || passLengthError}
							type="text"
							id="password"
							data-testid="register-confirm-pw"
							name="password"
							required
						/>
						<button
							class="btn-visibility"
							type="button"
							on:click={() => (showPassword = false)}
							tabindex="-1"
						>
							<img
								class="mag-glass"
								src={NotVisibleIcon}
								alt="Strikethrough Magnifying Glass Icon"
							/>
						</button>
					{/if}
				</div>
			</div>

			<div class="form-item">
				<label for="passwordConfirm">Confirm Password<sup><small>*</small></sup></label>
				<div class="visibility-container">
					{#if !showConfirm}
						<input
							bind:value={confirm}
							class:fieldError={passMatchError || passLengthError}
							type="password"
							id="passwordConfirm"
							name="passwordConfirm"
							required
						/>
						<button
							class="btn-visibility"
							type="button"
							tabindex="-1"
							on:click={() => (showConfirm = true)}
						>
							<img class="mag-glass" src={VisibleIcon} alt="Magnifying Glass Icon" />
						</button>
					{:else}
						<input
							bind:value={confirm}
							class:fieldError={passMatchError || passLengthError}
							type="text"
							id="passwordConfirm"
							name="passwordConfirm"
							required
						/>
						<button
							class="btn-visibility"
							type="button"
							tabindex="-1"
							on:click={() => (showConfirm = false)}
						>
							<img
								class="mag-glass"
								src={NotVisibleIcon}
								alt="Strikethrough Magnifying Glass Icon"
							/>
						</button>
					{/if}
				</div>
			</div>

			<div class="form-item alert">
				{#if showPassError}
					{#if passMatchError}
						<div><small>Passwords do not match!</small></div>
					{:else if passLengthError}
						<div><small>Password must be at least 8 characters!</small></div>
					{/if}
				{:else if showEmailError}
					<div><small>{emailError}</small></div>
				{/if}
			</div>

			<div class="form-item">
				<div class="flex justify-between w-full">
					<a class="href-button button-cancel inline-button" href="/">Cancel</a>
					<button
						disabled={passMatchError || passLengthError}
						type="submit"
						class="button-submit inline-button"
						id="submit-registration">Sign Up</button
					>
				</div>
			</div>
		</form>
	</div>
</div>

<style lang="postcss">

	button.btn-visibility {
		padding-top: 0;
	}

</style>
