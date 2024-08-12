<script>

    import game from '../../store/game.js';

    const submitRegistration = () => {
        


    }

    const cancelRegistration = () => {
        const form = document.getElementById("registration-form");
        if (form) {
            form.reset();
        }
        game.update(g => {
            g.status = "landing";
            return g;
        });
    }

</script>

<div class="container register-container">
    <div>
        <h1>Register</h1>
    </div>
    <div class="w-full">
        <form id="registration-form">
            <label for="name">First Name:</label>
            <br>
            <input type="text" id="name">

            <label for="email">Email Address:</label>
            <br>
            <input type="text" id="email">

            <label for="password">Password:</label>
            <br>
            <input type="password" id="password">
        </form>
    </div>
    <div class="flex justify-between w-full">
        <button on:click={submitRegistration} id="submit-registration" type="submit" class="inline-button">Submit</button>
        <button on:click={cancelRegistration} id="cancel-registration" type="button" class="button-cancel inline-button">Cancel</button>
    </div>
</div>

<style lang="postcss">

    input {
        height: 3rem;
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    button {
        display: inline-block;
        margin: 1rem 1rem 0 1rem;
    }

    button#submit-registration {
        background-color: theme("colors.blue.800");
        color: theme("colors.gray.50");
    }

    button#cancel-registration {
        background-color: theme("colors.gray.50");
        color: theme("colors.red.600");
        border: 2px solid theme("colors.red.600");
    }

    .register-container {
        justify-content: space-evenly;
    }

</style>