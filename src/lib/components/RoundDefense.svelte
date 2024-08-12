<script>
    import { VisibleIcon, NotVisibleIcon } from "$lib";
    import { enhance } from '$app/forms';
	import RoundHeader from "./RoundHeader.svelte";
	import FooterGuide from "./FooterGuide.svelte";
    export let data;

    const isInformant = data.game.playerRoles[data.user.id] == "Informant";
    const playerRole = data.user.playerRole;
    let clue = data.game.clue;
    let displayContinue = "block";
    let displayConfirm = "none";
</script>

<RoundHeader {data} />
<div class="stage-container">
    {#if isInformant}
        <form method="post" action="?/finishDefense" class="w-full" use:enhance>
            <div class="form-item">
                <input type="hidden" name="gameId" value={data.game.id} />
                <input type="hidden" name="isInformant" value={isInformant} />
                <button type="button" style="display:{displayContinue}" id="continue" class="href-button button-submit" on:click={() => { displayConfirm = "block", displayContinue = "none" }}>All players have defended their choice of cards.</button>
                <button type="submit" style="display:{displayConfirm}" id="confirm" class="href-button button-submit" on:click={() => { displayConfirm = "none", displayContinue = "block" }}>Proceed to the next stage.</button>
            </div>
        </form>
    {:else}
        <h3>Waiting for all players to play defend their card choice.</h3>
    {/if}
</div>
<FooterGuide {data} />

<style lang="postcss">
    
    button#confirm {
        color:white;
        background-color: theme("colors.red.500");
    }

</style>