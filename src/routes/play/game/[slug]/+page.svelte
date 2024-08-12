<script>
    import { onMount, onDestroy } from 'svelte';
    import { goto } from '$app/navigation';
    import PocketBase from 'pocketbase';
    import Lobby from '$lib/components/Lobby.svelte';
    import Game from '$lib/components/Game.svelte';

    const pb = new PocketBase('https://backend-empty-violet-3106.fly.dev/');

    export let data;
    let game = data.game;
    let player = data.user;

    const getGame = async () => {
        const data = await pb.collection('games').getOne(game.id, {
            expand: 'players',
            fields: 'id, code, host, status, players, round, stage, playerRoles, playerOrder, clue, votes, votingCompleted, results, expand'
    });
        return data;
    }

    pb.collection('games').subscribe('*', async () => {
        game = await getGame();
    });

    onMount(async () => {
        game = await getGame();
    });

    onDestroy(() => {
        pb.collection('games').unsubscribe('*');
    });

    $: data = { game: game, user: data.user };

    $: if (game.status == "ended") {
        let host = game.host == player.id
        goto(`/play?ended=true&host=${host}`)
    }
</script>

{#if (game.status == 'not-started')}
    <Lobby {data} />
{:else if (game.status == 'in-progress')}
    <Game {data} />
{/if}

<style (lang="postcss")>

</style>