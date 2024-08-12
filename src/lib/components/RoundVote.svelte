<script>
    import { enhance } from '$app/forms';
	import FooterGuide from './FooterGuide.svelte';
	import RoundHeader from "./RoundHeader.svelte";
    export let data;

    const isInformant = data.game.playerRoles[data.user.id] == "Informant";
    const playerRoles = JSON.stringify(data.game.playerRoles);
    const results = data.game.results ? JSON.stringify(data.game.results) : JSON.stringify({});
    let clue = data.game.clue;

    const candidates = data.game.expand.players.filter((player) =>
        player.id != data.user.id && data.game.playerRoles[player.id] != "Informant"
    )

    const informantId = Object.keys(data.game.playerRoles).find(key => data.game.playerRoles[key] == "Informant");
    const players = data.game.players.filter((playerId) => playerId != informantId)

    let votes, voted, disableSubmit;
    $: votes = data.game.votes ? JSON.stringify(data.game.votes) : JSON.stringify({});
    $: voted = data.game.votes ? Object.keys(data.game.votes).includes(data.user.id) : false;
    $: disableSubmit = !data.game.votingCompleted;
    $: disableVoteSubmit = true;
</script>

<RoundHeader {data} />
<div class="stage-container">
    {#if !isInformant && !voted}
        <div class="vote-container">
            <h5>Select a player.</h5>
            <form method="post" action="?/submitVote" class="vote-form" use:enhance>
                <div class="form-item">
                    <input type="hidden" name="gameId" value={data.game.id} />
                    <input type="hidden" name="userId" value={data.user.id} />
                    <input type="hidden" name="votes" value={votes} />
                    <input type="hidden" name="players" value={players} />
                    <input type="hidden" name="isInformant" value={isInformant} />
                </div>

                {#each candidates as player}
                    <label class="radio-label form-item round-header-card player-card">
                        <input type="radio" name="candidates" value="{player.id}" on:click={() => disableVoteSubmit = false}/>
                        <div class="ml-4">{player.firstname} {player.lastname[0]}.</div>
                    </label>
                {/each}

                <div class="form-item">
                    <div class="mt-8">
                        <button disabled={disableVoteSubmit} type="submit" id="submit-clue" class="button-submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    {/if}
    {#if isInformant}
        <h3 class="mb-8">Once all players have voted, advance to the next stage by clicking the button below.</h3>
    {:else if voted}
        <h3>Your vote has been submitted.  Once all players have voted, the Informant will advance the game to review the results.</h3>
    {/if}
    {#if isInformant}
        <form method="post" action="?/finishVoting" class="w-full" use:enhance>
            <div class="form-item">
                <input type="hidden" name="gameId" value={data.game.id} />
                <input type="hidden" name="isInformant" value={isInformant} />
                <input type="hidden" name="playerRoles" value={playerRoles} />
                <input type="hidden" name="results" value={results} />
                <input type="hidden" name="votes" value={votes} />
                <input type="hidden" name="round" value={data.game.round} />
                <button type="submit" disabled={disableSubmit} id="continue-results" class="href-button button-submit">Proceed to next stage.</button>
            </div>
        </form>
    {/if}
</div>
<FooterGuide {data} />

<style lang="postcss">
    
    .radio-label > input { 
        visibility: hidden;
        position: absolute;
    }

    .radio-label:has(input:checked) {
        color: theme("colors.white.1");
        background-color: theme("colors.blue.1");
    }

    .player-card {
        cursor:pointer;
    }


</style>