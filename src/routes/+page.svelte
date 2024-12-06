<script lang="ts">
    import TradingView from "../lib/components/TradingView.svelte";
    import Header from "../lib/components/Header.svelte";
    import Terminal from "../lib/components/Terminal/Terminal.svelte";

    import { onMount } from "svelte";
    import { user } from "$lib/store/user";
    import { User } from "$lib/User";

    onMount(async () => {
        $user = await User.fetchUser()
    })
</script>

<div class="main">

    <Header />
    <TradingView />

    {#if $user.id !== -1}
        <Terminal />
    {/if}
</div>

<style>
    .main {
        width: 50%;
        min-height: 1000px;
    }
</style>