<script>
	import RoundInform from './RoundInform.svelte';
	import RoundPlay from './RoundPlay.svelte';
	import RoundDefense from './RoundDefense.svelte';
	import RoundVote from './RoundVote.svelte';
	import RoundResults from './RoundResults.svelte';
	import RoundEnd from './RoundEnd.svelte';
	export let data;
</script>

<div>
	{#if data.game.stage == 'inform detectives'}
		<RoundInform {data} />
	{:else if data.game.stage == 'submit evidence'}
		<RoundPlay {data} />
	{:else if data.game.stage == 'defend evidence'}
		<RoundDefense {data} />
	{:else if data.game.stage == 'vote on conspirator'}
		<RoundVote {data} />
	{:else if data.game.stage == 'view results'}
		<RoundResults {data} />
	{:else if data.game.stage == 'round end'}
		<RoundEnd {data} />
	{/if}
</div>

<style lang="postcss">
</style>
