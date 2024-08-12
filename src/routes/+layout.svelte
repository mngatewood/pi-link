<script>
    import "../app.css";
    import Header from '$lib/components/Header.svelte';
    // import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
    <style>
        body{
            margin:0;
            overscroll-behavior-y: none;
        }
    </style>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Caveat&family=Lilita+One&family=Open+Sans:ital,wght@0,500;1,500&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&family=PT+Sans+Caption:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="flex flex-col h-screen">
    <header class="sticky top-0">
        <Header />
    </header>

    <main class="flex-grow overflow-scroll mb-auto px-4 pt-8 pb-10">
        <slot />
    </main>

    <!-- <footer class="sticky bottom-0 bg-orange-1">
        <Footer />
    </footer> -->
</div>

<style lang="postcss">
    
    :global(html) {
        background-color: #f3f4fb;
        color: theme("colors.blue.1")
    }

    :global(h1) {
        font-family: "PT Sans Caption", sans-serif;
        font-size: 2rem;
        font-weight: 700;
        text-align: center;
    }

    :global(h2) {
        font-family: "Caveat", cursive;
        font-size: 4rem;
        font-weight: 500;
        text-align: center;
    }

    :global(h3) {
        font-family: "PT Sans Caption", sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        text-align: center;
        color: theme("colors.brown.1")
    }

    :global(h4) {
        font-family: "Open Sans", sans-serif;
        font-size: 1rem;
        font-weight: 500;
        text-align: center;
    }

    :global(h5) {
        font-family: "PT Sans Caption", sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        text-align: center;
    }

    :global(form) {
        width: 100%;
    }

    :global(input) {
        display: block;
        width: 100%;
        height: 3rem;
        margin-bottom: 1rem;
        text-align: center;
        font-family: "Caveat", cursive;
        font-size: 2rem;
        color: theme("colors.blue.1");
        background-color: theme("colors.yellow.1");
    }

    :global(button) {
        width: 100%;
        max-height: 25%;
        min-height: 4rem;
        border-radius: 10px;
        font-size: 1.5rem;
        font-weight: 500;
        background-color: theme("colors.green.1");
        color: theme("colors.gray.50");
        box-shadow: 2px 2px 5px 0 theme(colors.blue.800);
    }

    :global(.href-button) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-height: 25%;
        min-height: 4rem;
        border-radius: 10px;
        font-size: 1.5rem;
        font-weight: 500;
        background-color: theme("colors.brown.1");
        color: theme("colors.gray.50");
        box-shadow: 2px 2px 5px 0 theme(colors.brown.1);
    }

    :global(.href-inline) {
        text-decoration: underline;
        color: theme("colors.blue.1");
    }

    :global(.button-submit) {
        background-color: theme("colors.brown.1");
        color: theme("colors.gray.50");
        padding: 0.75rem;
    }

    :global(.button-submit:disabled) {
        background-color: theme("colors.gray.400");
        color: theme("colors.gray.50");
        box-shadow: 2px 2px 5px 0 theme(colors.gray.800);
    }

    :global(.button-cancel) {
        background-color: theme("colors.gray.50");
        color: theme("colors.orange.1");
        border: 2px solid theme("colors.orange.1");
    }

    :global(.inline-button) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 1rem 1rem 0 1rem;
    }

    :global(.btn-visibility) {
        min-height: unset;
        width: 3rem;
        height: 3rem;
        margin: 0;
        margin: 0;
        border: none;
        box-shadow: unset;
        background-color: theme("colors.yellow.1");
        border-radius: 0;
    }

    :global(.btn-visibility > img) {
        padding: 6px;
    }

    :global(.visibility-container) {
        display: flex;
        flex-direction: row;
    }

    :global(.container) {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 0;
    }

    :global(.buttons-container > .href-button) {
        width: auto;
        margin: 4rem 1rem;
    }

    :global(.round-header-container) {
        margin: 1rem 0;
    }

    :global(.round-header-card) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin: 0.25rem 0;
        padding: 0.5rem;
        font-size: xx-large;
        background-color: theme('colors.white.1');
        border: 2px solid theme('colors.brown.1');
        border-radius: 0.5rem;
        box-shadow: 2px 2px 5px theme('colors.brown.1');
    }

    :global(.player-card) {
        margin: 0.75rem 0;
        background-color: theme("colors.yellow.1");
        border: 2px solid theme('colors.blue.1');
        box-shadow: 2px 2px 5px theme('colors.blue.1');
    }

    :global(.round-header-role, .clue) {
        margin-left: 1rem;
        color: theme('colors.green.1');
    }

    :global(.round-container) {
        margin: 0 0 1rem 0;
    }

    :global(.stage-container) {
        margin-top: 3rem;
    }

    :global(.notepad) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-grow: 1;
        width: 100%;
        margin: 2rem 0;
        color: theme("colors.blue.800");
        background-color: theme("colors.yellow.1");
    }
    
    :global(.notepad > *) {
        font-size: 4rem !important;
    }

    :global(.alert) {
        height: 1rem;
        color: theme("colors.red.600")
    }

</style>
