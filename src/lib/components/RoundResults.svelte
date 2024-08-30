<script>
	import { enhance } from '$app/forms';
	import RoundHeader from './RoundHeader.svelte';
	export let data;

	const isInformant = data.game.playerRoles[data.user.id] == 'Informant';
	const playerRoles = data.game.playerRoles;
	const playerOrder = JSON.stringify(data.game.playerOrder);
	const results = data.game.results;
	let players = data.game.expand.players;
	players.forEach((player) => {
		player['score'] = results[data.game.round][player.id];
		player['role'] = playerRoles[player.id];
	});
</script>

<RoundHeader {data} />
<div class="stage-container">
	<div class="results-container">
		{#each players as player}
			<div class="round-header-card player-card">
				<div>{player.firstname} {player.lastname[0]}.</div>
				<div class="text-sm text-left">{player.role}</div>
				<div>{player.score} <small>VP</small></div>
			</div>
		{/each}
	</div>
	{#if isInformant}
		<form method="post" action="?/finishResults" class="w-full" use:enhance>
			<div class="form-item">
				<input type="hidden" name="gameId" value={data.game.id} />
				<input type="hidden" name="isInformant" value={isInformant} />
				<input type="hidden" name="playerOrder" value={playerOrder} />
				<input type="hidden" name="round" value={data.game.round} />
			</div>
			<div class="form-item">
				<div class="mt-8">
					<button
						type="submit"
						id="submit-clue"
						class="button href-button button-fit-content button-submit">Finish Round</button
					>
				</div>
			</div>
		</form>
	{/if}
</div>

<style lang="postcss">
	.player-card > :nth-child(1) {
		flex-basis: 50%;
	}
</style>
