<script>

    import game from '../../store/game.js';

    const submitLogin = () => {
        


    }

    const cancelLogin = () => {
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

<div class="container login-container">
    <div>
        <h1>Login</h1>
    </div>
    <div class="w-full">
        <form id="login-form">
            <label for="email">Email Address:</label>
            <br>
            <input type="text" id="email" required>

            <label for="password">Password:</label>
            <br>
            <input type="password" id="password" required>
        </form>
    </div>
    <div class="flex justify-between w-full">
        <button on:click={cancelLogin} id="cancel-login">Cancel</button>
        <button on:click={submitLogin} id="submit-login">Submit</button>
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

    button#submit-login {
        background-color: theme("colors.blue.800");
        color: theme("colors.gray.50");
    }

    button#cancel-login {
        background-color: theme("colors.gray.50");
        color: theme("colors.red.600");
        border: 2px solid theme("colors.red.600");
    }

    .login-container {
        justify-content: space-evenly;
    }

</style>