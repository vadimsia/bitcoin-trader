<script lang="ts">
    import Fa from 'svelte-fa'
    import { faBitcoinSign } from '@fortawesome/free-solid-svg-icons'
    import { user } from '$lib/store/user';

    async function exit() {
        await fetch('/api/user/logout')
        location.reload()
    }
</script>

<div class="header flex row justify-between items-center w-full p-5">
    <h1 class="text-3xl font-bold flex"><div style="color: orange"><Fa icon={faBitcoinSign} /></div>itcoinTrader Trainer</h1>
    <span>
        {#if $user.id === -1}
            <a class="sign-in" href="social-auth/login/google-oauth2/">Sign in with Google</a>
        {:else}
            Hello {$user.username}!
            <button on:click={exit}><u>Exit</u></button>
        {/if}
    </span>
</div>

<style>
    .sign-in:hover {
        color: rgb(64, 157, 224);
        transition: .3s;
    }
</style>