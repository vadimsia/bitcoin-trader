<script lang="ts">
    import TradingView from "../lib/components/TradingView.svelte";
    import Header from "../lib/components/Header.svelte";
    import Terminal from "../lib/components/Terminal/Terminal.svelte";
</script>

<div class="main">

    <Header />
    <TradingView />
    <Terminal />
</div>

<style>
    .main {
        width: 50%;
        min-height: 1000px;
    }
</style>