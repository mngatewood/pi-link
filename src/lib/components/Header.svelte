<script>
    import { HomeIcon, AccountIcon } from "$lib/index.js"
</script>

<div>
    <div class="header-container">
        <div class="title-container">
            <div class="title"><strong>PI Link</strong></div>
        </div>
        <div class="icons-container">
            <a class="image-container" href="/account">
                <img class="header-img" src={AccountIcon} alt="account icon" />
            </a>
            <a class="image-container" href="/">
                <img class="header-img" src={HomeIcon} alt="home icon" />
            </a>
        </div>
        <!-- <img src={ MagnifyingGlass } alt="Magnifying Glass Icon" /> -->
    </div>
</div>

<style lang="postcss">

    .header-container {
        display: flex;
        justify-content: space-between;
        border-bottom: solid theme("colors.orange.1");
    }

    .title-container {
        background-color: theme("colors.orange.1")
    }

    .title {
        font-family: 'Titillium Web', sans-serif;
        font-size: 4rem;
        font-weight: 900;
        margin: 0 1rem;
        color: theme("colors.white.1");
    }

    .icons-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 1rem;
    }

    .image-container {
        width: 2rem;
        height: 2rem;
        margin: 0 0.75rem;
    }
    
</style>