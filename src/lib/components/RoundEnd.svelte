<script>
	import { enhance } from '$app/forms';
	import RoundHeader from './RoundHeader.svelte';
	export let data;

	const results = data.game.results;
	let players = data.game.expand.players;

	const rounds = [...Array(data.game.round).keys()].map((i) => i + 1);

	const playerScores = (player) => {
		let scoreSum = 0;
		let tokens = 0;
		rounds.forEach((round) => {
			const score = results[round][player.id];
			player[`score${round}`] = score;
			scoreSum += score;
			if (score > 0) {
				tokens++;
			}
		});
		player['scoreSum'] = scoreSum;
		player['tokens'] = tokens; // tie-breaker
	};

	const breakTie = (leaders) => {
		if (leaders.length < 2) {
			const winner = players.find((player) => player.id == leaders[0]);
			return winner.firstname + ' ' + winner.lastname[0] + '.';
		} else {
			const leadingPlayers = players.filter((player) => leaders.includes(player.id));
			if (leadingPlayers.length > 1) {
				return 'TIED';
			} else {
				const winner = leadingPlayers.sort((a, b) => b.tokens - a.tokens)[0];
				return winner.firstname + ' ' + winner.lastname[0] + '.';
			}
		}
	};

	players.forEach((player) => {
		playerScores(player);
	});

	const highScore = players.sort((a, b) => b.scoreSum - a.scoreSum)[0].scoreSum;
	const leaders = players.filter((player) => player.scoreSum == highScore).map((p) => p.id);
	const winner = breakTie(leaders);
	const isCurrentPlayer = (playerId) => (playerId == data.user.id ? 'current-player' : '');

	let playAnotherRound =
		(players.length < 6 && data.game.round < players.length && players.length) ||
		data.game.round < players.length * 2
			? true
			: false;
	let isHost = data.game.host == data.user.id;
</script>

<RoundHeader {data} />
<div class="stage-container">
	<div class="results-container">
		<div class="results-header">
			<div>Round</div>
			<div class="results-scores">
				{#each rounds as round}
					<div>{round}</div>
				{/each}
				<div class="total">Total</div>
			</div>
		</div>
		{#each players as player}
			<div class="round-header-card player-card {isCurrentPlayer(player.id)}">
				<div>{player.firstname} {player.lastname[0]}.</div>
				<div class="results-scores">
					{#each rounds as round}
						<div>{player[`score${round}`]}</div>
					{/each}
					<div class="total">{player.scoreSum}</div>
				</div>
			</div>
		{/each}
	</div>
	{#if playAnotherRound}
		<h3 class="mt-8">The round has ended.</h3>
		{#if isHost}
			<h4>Click the button below to advance to the next round.</h4>
			<form method="post" action="?/finishRound" class="w-full" use:enhance>
				<div class="form-item">
					<input type="hidden" name="gameId" value={data.game.id} />
					<input type="hidden" name="isHost" value={isHost} />
					<input type="hidden" name="round" value={data.game.round} />
					<input type="hidden" name="playerOrder" value={JSON.stringify(data.game.playerOrder)} />
					<input type="hidden" name="players" value={JSON.stringify(data.game.players)} />
				</div>
				<div class="form-item">
					<div class="flex justify-between w-full">
						<button
							type="submit"
							id="submit-clue"
							class="button href-button button-fit-content button-submit">Finish Round</button
						>
					</div>
				</div>
			</form>
		{:else}
			<h4>Please wait for the host to advance the game to the next round.</h4>
		{/if}
	{:else}
		<h3 class="my-8">
			The game has ended and <span class="whitespace-nowrap font-bold">the winner is {winner}</span>
		</h3>
		{#if isHost}
			<form method="post" action="?/endGame" class="w-full" use:enhance>
				<div class="form-item">
					<input type="hidden" name="gameId" value={data.game.id} />
					<input type="hidden" name="isHost" value={isHost} />
				</div>
				<div class="form-item">
					<div class="flex justify-between w-full">
						<button type="submit" id="submit-clue" class="button button-submit">End Game</button>
					</div>
				</div>
			</form>
		{/if}
	{/if}
</div>

<style lang="postcss">
	.results-container {
		width: 100%;
	}

	.results-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin: 0.5rem 0;
		padding: 0.5rem 1rem;
		font-size: large;
		font-weight: 600;
		border-bottom: solid;
	}

	.results-scores {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: flex-end;
	}

	.results-scores > .total {
		text-align: right;
		width: 1rem;
	}

	.player-card {
		font-size: large;
	}

	.player-card > *,
	.results-header > * {
		width: 50%;
	}

	.current-player {
		font-weight: 700;
		background-color: theme('colors.white.1');
	}
</style>
