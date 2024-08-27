<script>
	import { guide } from '$lib';
	import { page } from '$app/stores';  

	export let data;
	let stage;
	let bullets = [];
	let expandGuide = false; // start with guide hidden
	let bulletsHeight = "0px";
	let bulletsTransition = "max-height 1s";

	const playerRole = () => {
		if (data?.game?.playerRoles) {
			return data.game.playerRoles[data.user.id];
		} else if (data?.game?.stage == 'round end') {
			return data.game.host == data.user.id ? 'host' : 'player';
		} else {
			return "user";
		}
	};

	$: stage = data?.game?.stage ? data.game.stage : $page.url.pathname.slice(0,10);
	$: bullets = guide[stage].find((roleObject) => roleObject.roles.includes(playerRole())).bullets;
	$: bulletsHeight = expandGuide ? "1000px" : "0px";
	$: bulletsTransition = expandGuide ? "max-height 1s" : "max-height 100ms";
</script>

<div id="footer-guide-container">
	<div class="tabs-container">
		<div class="tab tab-left"></div>
		<button class="tab tab-center" on:click={() => expandGuide = !expandGuide}>
			<span>
				{#if expandGuide}
					[-]
				{:else}
					[+]
				{/if}
				&nbsp; <span class="underline">Help</span>
			</span>
		</button>
		<div class="tab tab-right"></div>
	</div>
	<div class="footer-guide-bullets-container" style="max-height:{bulletsHeight}; transition:{bulletsTransition}" >
		{#if bullets.length}
			<ul class="list-disc">
				{#each bullets as bullet}
					<li>{bullet}</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style lang="postcss">
	#footer-guide-container {
		position: absolute;
		bottom: 0;
		left: 5%;
		width: 90%;
		max-height: 85%;
		overflow: scroll;
		background-color: transparent;
	}

	.tabs-container {
		display: flex;
		flex-direction: row;
		height: 2rem;
	}

	.tab {
		border: 2px theme('colors.orange.1');
	}

	.tab-left {
		width: 25%;
		border-style: none;
		background-color: transparent;
	}

	.tab-center {
		width: 50%;
		min-height: unset;
		max-height: unset;
		max-width: 150px;
		margin: 0 auto;
		padding-top: 2px;
		font-size: 1rem;
		background-color: rgba(187, 101, 60, 0.9);
		border-style: solid none none none;
		border-radius: 2rem 2rem 0 0;
		box-shadow: 5px 3px 10px theme('colors.orange.1');
		-webkit-tap-highlight-color: transparent;
	}

	.tab-right {
		width: 25%;
		border-style: none;
		background-color: transparent;
	}

	.footer-guide-bullets-container {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		background-color: rgba(187, 101, 60, 0.9);
		border: 2px theme('colors.orange.1');
		border-radius: 2rem 2rem 0 0;
		border-style: none;
		box-shadow: 5px 3px 10px theme('colors.orange.1');
		overflow: scroll;
		transition: max-height 500ms;
	}

	li {
		font-family: 'Caveat', cursive;
		font-size: 1.5rem;
		font-weight: 500;
		color: theme('colors.gray.50');
		list-style-position: inside;
		text-indent: -1.7rem;
		margin: 1rem 1rem 1rem 3rem;
		opacity: 1;
	}
</style>
