<script lang="ts">
    import Fa from 'svelte-fa'
    import { faBitcoinSign } from '@fortawesome/free-solid-svg-icons'
</script>

<div class="header flex row justify-between items-center w-full p-5">
    <h1 class="text-3xl font-bold flex"><div style="color: orange"><Fa icon={faBitcoinSign} /></div>itcoinTrader Trainer</h1>
    <span>
        <a class="sign-in" href="#">Sign in with Google</a>
    </span>
</div>

<style>
    .sign-in:hover {
        color: rgb(64, 157, 224);
        transition: .3s;
    }
</style>