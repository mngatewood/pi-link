<script>
    export let data
    let code='';

    let disableSubmit = false;
    $: disableSubmit = code?.length < 4
</script>

<div class="container join-container">
    <div>
        <h1>Join a Game</h1>
        <h4>Enter the code provided by your game host below and click the Join button.</h4>
    </div>
    <form method="post" action="?/join">
        <div class="form-item">
            <label for="code">Code:</label>
            <br>
            <input type="text" id="code" bind:value={code}>
        </div>
        <div class="form-item">
            <div class="flex justify-between w-full">
                <button disabled={disableSubmit} class="inline-button" type="submit" id="submit-join">Join</button>
                <a class="href-button button-cancel inline-button" id="cancel-join" href="/play">Cancel</a>
            </div>
        </div>
    </form>
</div>

<style lang="postcss">

    form {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 100%;
    }

</style>