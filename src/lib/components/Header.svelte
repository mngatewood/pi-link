<script>
	import { HomeIcon, AccountIcon, MaximizeIcon, MinimizeIcon } from '$lib/index.js';
	import { browser } from '$app/environment';
	import { debounce } from '$lib/utils';

	let isMobileDevice, fullscreenEnabled, fullscreenActive = false;

	$: if(browser) {
		isMobileDevice = window.innerWidth < 768 || screen.width < 768;
		fullscreenEnabled = document.fullscreenEnabled;
		fullscreenActive = document.fullscreenElement != null;
		window.addEventListener('resize', debounce(() => {
			isMobileDevice = window.innerWidth < 768 || screen.width < 768;
		}));
	}

	const toggleFullscreen = (event) => {
		event.preventDefault();
		fullscreenActive ? document.exitFullscreen() : document.body.requestFullscreen();
		fullscreenActive = !fullscreenActive;
	}

</script>

<div>
	<div class="header-container">
		<div class="title-container">
			<div class="title"><strong>PI Link</strong></div>
		</div>
		<nav class="icons-container">
			<a class="image-container" href="/account">
				<img class="header-img" src={AccountIcon} alt="account icon" />
			</a>
			<a class="image-container" href="/">
				<img class="header-img" src={HomeIcon} alt="home icon" />
			</a>
			
			{#if isMobileDevice}
				<a class="image-container" href="/">
					<button id="toggle-fullscreen" on:click={(e) => { toggleFullscreen(e) }}>
						{#if fullscreenActive}
							<img class="header-img" src={MinimizeIcon} alt="exit fullscreen icon" />
						{:else}
							<img class="header-img" src={MaximizeIcon} alt="enable fullscreen icon" />
						{/if}
					</button>
				</a>
			{/if}
		</nav>
	</div>
</div>


<style lang="postcss">

	button#toggle-fullscreen {
		margin: 0;
		padding: 0;
		max-height: unset;
		min-height: unset;
		background-color: transparent;
		box-shadow: none;
	}

	.header-container {
		display: flex;
		justify-content: space-between;
		border-bottom: solid theme('colors.orange.1');
		background-color: solid theme('colors.gray.50');
	}

	.title-container {
		background-color: theme('colors.orange.1');
	}

	.icons-container {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-right: 1rem;
	}

	.image-container {
		width: 2rem;
		height: 2rem;
		margin: 0 0.75rem;
	}
</style>
