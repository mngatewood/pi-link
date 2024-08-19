<script>
    import { PlayerAvatar, RemoveIcon } from '$lib/index';
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    export let data;
    let game;
    $: game = data.game;

    let disableStart;
    $: disableStart = game.players.length < 4 ? true : false;
    const isHost = data.game.host == data.user.id;

    const myCard = (playerId) => {
        if (playerId == data.user.id) {
            return 'my-card';
        } else {
            return '';
        }
    }

    const removeVisibility = (playerId) => {
        if (!isHost) {
            return 'none';
        } else if (playerId == data.game.host) {
            return 'none';
        } else {
            return 'block';
        }
    }

    $: if (!game.players.includes(data.user.id)) {
        goto('/play?removed=true')
    }

    $: if (game == null || game.status == "ended") {
        goto('/play?ended=true')
    }
</script>

<div class="container lobby-container">
    <div class="container lobby-header-container">
        <h1>Waiting for players...</h1>
        {#if (isHost)}
            <h4>Your invitation code is {data.game.code.toString().padStart(4,'0')}.<br>Click 'Start Game' once all players have joined.</h4>
        {:else}
            <h4>Please wait for the host to start the game.</h4>
        {/if}
    </div>
    <div class="container players-container">
        {#each game.expand.players as player}
            <div class="player {myCard(player.id)}">
                <img class="avatar" src={PlayerAvatar} alt="player avatar" />
                <div class="player-name">{player.firstname} {player.lastname[0]}.</div>
                <form action="?/remove" method="post" id="remove-player" style="display:{removeVisibility(player.id)}" use:enhance>
                    <input type="hidden" name="gameId" value={data.game.id} />
                    <input type="hidden" name="playerId" value={player.id} />
                    <button class="remove-button" type="submit">
                        <img class="remove-icon" src={RemoveIcon} alt="player avatar" />
                    </button>
                </form>
                {#if (player.id == game.host)}
                    <div class="player-host"><small>Host</small></div>
                {:else if (!isHost)}
                    <div class="player-host"><small>&nbsp;</small></div>
                {/if}
            </div>
        {/each}
    </div>
    <div class="container buttons-container">
        {#if isHost && disableStart}
            <div class="text-center mb-4 alert"><small>At least 4 players are required to start the game.</small></div>
        {/if}

        {#if (isHost)}
            <div class="flex">
                <form action="?/end" method="post" class="host-button" use:enhance >
                    <input type="hidden" name="gameId" value={data.game.id} />
                    <input type="hidden" name="playerId" value={data.user.id} />
                    <button class="button button-cancel" type="submit">Exit</button>
                </form>
                <form action="?/start" method="post" class="host-button" use:enhance>
                    <input type="hidden" name="gameId" value={data.game.id} />
                    <input type="hidden" name="userId" value={data.user.id} />
                    <button disabled={disableStart} class="button button-submit" type="submit">Start</button>
                </form>
            </div>
        {:else}
            <form action="?/quit" method="post" 
                use:enhance={() => {
                    return async ({ result }) => {
                        if (result.data.success) {
                            goto('/play');
                        }
                    }
                }
            }>
                <input type="hidden" name="gameId" value={data.game.id} />
                <input type="hidden" name="userId" value={data.user.id} />
                <button class="button button-cancel" type="submit">Exit</button>
            </form>
        {/if}
    </div>

</div>

<style (lang="postcss")>

    .lobby-header-container {
        height: auto;
        padding: 1rem 0;
    }

    .players-container {
        justify-content: flex-start;
        padding: 1rem;
        overflow: scroll;
    }

    .player {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 3rem;
        margin: 0.3rem 0;
        padding: 0.5rem;
        border: 2px solid theme('colors.blue.1');
        border-radius: 0.5rem;
        box-shadow: 2px 2px 5px theme('colors.blue.1');
    }

    .my-card {
        background-color: theme('colors.yellow.1');
    }

    .avatar {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: 2px solid theme('colors.blue.1');
        box-shadow: 2px 2px 5px theme('colors.blue.1');
    }

    form#remove-player {
        width: unset;
        padding-top: 6px;
    }

    .remove-button {
        background-color: transparent;
        box-shadow: none;
        margin-right: 0.25rem;
    }

    .remove-icon {
        width: 1.5rem;
        border-radius: 50%;
        box-shadow: 2px 2px 5px theme('colors.brown.1');
    }

    .player-host {
        width: 2rem;
        text-align: center;
        color: theme("colors.blue.1");
    }

    .buttons-container {
        display: block;
        height: auto;
        margin: 1rem 0 0 0;
    }

    .host-button {
        margin: 0 1rem;
    }

</style>