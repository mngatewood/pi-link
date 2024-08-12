<script>
    import { VisibleIcon, NotVisibleIcon } from "$lib";
    export let data;

    let game = data.game;
    let player = data.user;
    let showRole = false;
    
    const informantId = game.playerRoles ? Object.keys(game.playerRoles).find(key => game.playerRoles[key] == "Informant") : "";
    const informantObject = informantId ? game.expand.players.find((player) => player.id == informantId) : null;
    
    let isInformant, playerRole, informantName;
    $: isInformant = game.playerRoles ? game.playerRoles[data.user.id] == "Informant" : false;
    $: playerRole = game.playerRoles ? game.playerRoles[player.id] : "";
    $: informantName = informantObject ? informantObject.firstname + " " + informantObject.lastname.charAt() + "." : "";
    
    data.user.isInformant = isInformant;
    data.game.informantName = informantName;
    data.user.playerRole = playerRole;

    let clue = "";
    let showClueContainer = false;
    let hideClue = true;

    $: showClueContainer = ["submit evidence", "defend evidence", "vote on conspirator"].includes(data.game.stage);

    $: if (playerRole == "Conspirator") {
        clue = "**********"
    } else {
        clue = data.game.clue
    }

    const numberToWord = {
        1: "One",
        2: "Two",
        3: "Three",
        4: "Four",
        5: "Five",
        6: "Six",
        7: "Seven",
        8: "Eight",
        9: "Nine",
        10: "Ten",
    }
    let round = numberToWord[data.game.round];
</script>

<div class="round-container">
    <h1>Round {round}</h1>
    <h4 class="uppercase">{data.game.stage}</h4>
</div>
{#if data.game.stage != "view results" && data.game.stage != "round end"}
    <div class="round-header-container">
        <div class="round-header-card">
            {#if isInformant}
                <div class="round-header-role" id="if-is-informant"><strong>Role:</strong> {playerRole}</div>
            {:else if showRole}
                <div class="round-header-role" id="if-show-role"><strong>Role:</strong> {playerRole}</div>
                <button class="btn-visibility" type="button" on:click={() => showRole = false}>
                    <img class="mag-glass" src={ NotVisibleIcon } alt="Strikethrough Magnifying Glass Icon" />
                </button>
            {:else}
                <div class="round-header-role" id="else"><strong>Role:</strong> **********</div>
                <button class="btn-visibility" type="button" on:click={() => showRole = true}>
                    <img class="mag-glass" src={ VisibleIcon } alt="Magnifying Glass Icon" />
                </button>
            {/if}
        </div>
    </div>
    {#if !isInformant}
        <div class="round-header-container">
            <div class="round-header-card">
                <div class="round-header-role"><strong>Informant:</strong> {informantName}</div>
            </div>
        </div>
    {/if}
    {#if showClueContainer}
        <div class="round-header-card">
            {#if playerRole == "Conspirator"}
                <div class="clue"><strong>Clue:</strong> {clue}</div>
            {:else if !hideClue}
                <div class="clue"><strong>Clue:</strong> {clue}</div>
                <button class="btn-visibility" type="button" on:click={() => hideClue = true}>
                    <img class="mag-glass" src={ NotVisibleIcon } alt="Magnifying Glass Icon" />
                </button>
            {:else}
                <div class="clue"><strong>Clue:</strong> **********</div>
                <button class="btn-visibility" type="button" on:click={() => hideClue = false}>
                    <img class="mag-glass" src={ VisibleIcon } alt="Magnifying Glass Icon" />
                </button>
            {/if}
        </div>
    {/if}
{/if}

<style lang="postcss">

    .btn-visibility {
        background-color: theme("colors.white.1");
    }

</style>
