<script>
    import { VisibleIcon, NotVisibleIcon } from "$lib/index.js"
    export let form;
    
    let showPassword = false;
    let showConfirm = false;
    let password = '';
    let confirm = '';
    let email = '';

    $:{if(email && form?.error) email.focus()}
    $:passMatchError = (password?.length && confirm?.length) && password == confirm ? false : true;
    $:passLengthError = (password?.length >= 8 && confirm?.length >=8) ? false : true;
    $:showPassError = (passMatchError || passLengthError) && password?.length && confirm?.length;

    const clearMessages = (name) => {
        if(!form) return
        if(name === 'password') showPassError = false;
        if(name === 'email') {
            form.error = false;
            form.message = '';
        }
    }
</script>

<div class="container register-container">
    <div>
        <h1>Register</h1>
    </div>

    <div class="w-full">
        <form  method="post" action="?/register" class="mb-8">
            <div class="form-item">
                <label for="firstname">First Name<sup><small>*</small></sup></label>
                <br>
                <input value={form?.firstname?? ''} id="firstname" data-testid="register-firstname" type="text" name="firstname" required />
            </div>
        
            <div class="form-item">
                <label for="lastname">Last Name<sup><small>*</small></sup></label>
                <br>
                <input value={form?.lastname?? ''} id="lastname" data-testid="register-lastname" type="text" name="lastname" required />
            </div>
        
            <div class="form-item">
                <label for="email">Email Address<sup><small>*</small></sup></label>
                <br>
                <input bind:this={email} on:keydown={clearMessages("email")} class:fieldError={form?.error} value={form?.email?? ''} id="email" data-testid="register-email"type="email" name="email" required />
            </div>
        
            <div class="form-item">
                <label for="password">Password<sup><small>*</small></sup> <em>(Minimum 8 characters)</em></label>
                <div class="visibility-container">
                    {#if !showPassword}
                        <input bind:value={password} on:keydown={clearMessages("password")} class:fieldError={form?.weakPassword || passMatchError || passLengthError} type='password' id="password" data-testid="register-password" name="password" required />
                        <button class="btn-visibility" type="button" on:click={() => showPassword = true} tabindex="-1">
                            <img class="mag-glass" src={ VisibleIcon } alt="Magnifying Glass Icon" />
                        </button>
                    {:else}
                        <input bind:value={password} on:keydown={clearMessages("password")} class:fieldError={form?.weakPassword || passMatchError || passLengthError} type='text' id="password" data-testid="register-confirm-pw" name="password" required />
                        <button class="btn-visibility" type="button" on:click={() => showPassword = false} tabindex="-1">
                            <img class="mag-glass" src={ NotVisibleIcon } alt="Strikethrough Magnifying Glass Icon" />
                        </button>
                    {/if}
                </div>  
            </div>
        
            <div class="form-item">
                <label for="passwordConfirm">Confirm Password<sup><small>*</small></sup></label>
                <div class="visibility-container">
                    {#if !showConfirm}
                        <input bind:value={confirm} on:keydown={clearMessages("password")} class:fieldError={form?.weakPassword || passMatchError || passLengthError} type='password' id="passwordConfirm" name="passwordConfirm" required />
                        <button class="btn-visibility" type="button" tabindex="-1" on:click={() => showConfirm = true}>
                            <img class="mag-glass" src={ VisibleIcon } alt="Magnifying Glass Icon" />
                        </button>
                    {:else}
                        <input bind:value={confirm} on:keydown={clearMessages("password")} class:fieldError={form?.weakPassword || passMatchError || passLengthError} type='text'  id="passwordConfirm" name="passwordConfirm" required />
                        <button class="btn-visibility" type="button" tabindex="-1" on:click={() => showConfirm = false}>
                            <img class="mag-glass" src={ NotVisibleIcon } alt="Strikethrough Magnifying Glass Icon" />
                        </button>
                    {/if}
                </div>
            </div>
        
            <div class="form-item error-div">
                {#if showPassError}
                    {#if passMatchError}
                        <div><small>Passwords do not match!</small></div>
                    {:else if passLengthError}
                        <div><small>Password must be at least 8 characters!</small></div>
                    {/if}
                {/if}
            
                {#if form?.error}
                    <small>{form?.message}</small>
                {/if}
                
            </div>
        
            <div class="form-item">
                <div class="flex justify-between w-full">
                    <a class="href-button button-cancel inline-button" href="/">Cancel</a>
                    <button disabled={passMatchError || passLengthError} type="submit" class="button-submit inline-button" id="submit-registration">Sign Up</button>
                </div>
            </div>
        
        </form>
    </div>
</div>

<style lang="postcss">

    .error-div {
        height: 1rem;
    }

</style>