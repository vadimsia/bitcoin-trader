<script lang="ts">
    import Fa from 'svelte-fa'
    import { faClose } from '@fortawesome/free-solid-svg-icons'

    import {current_price} from "$lib/store/price"
    import { onMount } from 'svelte';

    export let order_modal = 0


    let amount = 100
    let leverage = 25

    let enable_tpsl = false
    let take_profit = $current_price
    let stop_loss = $current_price
    let entry_price = $current_price

    $: totalAmount = () => {
        return (amount * leverage).toFixed(2)
    }

    $: longLiquidation = () => {
        let liq_perc = 100 / leverage / 100
        return (entry_price - (entry_price * liq_perc)).toFixed(2)
    }

    $: shortLiquidation = () => {
        let liq_perc = 100 / leverage / 100
        return (entry_price + (entry_price * liq_perc)).toFixed(2)
    }

    $: calcLongTPSL = (tpsl: number) => {
        return ((tpsl - entry_price) / entry_price * amount * leverage).toFixed(2)
    }

    $: calcShortTPSL = (tpsl: number) => {
        return (-(tpsl - entry_price) / entry_price * amount * leverage).toFixed(2)
    }

    function setCurrentPrice() {
        take_profit = $current_price
        stop_loss = $current_price
        entry_price = $current_price
    }

    onMount(() => {
        setTimeout(setCurrentPrice, 3000)
    })
</script>

{#if order_modal === 1}
    <span class="splitter mt-5 mb-5"></span>
    <div class="form flex flex-col w-[90%]">
        <div class="header flex justify-between text-md font-bold">
            <span>
                Open Long position
            </span>
            <a href="#" on:click={() => order_modal = 0}><Fa icon={faClose}/></a>
        </div>
        <div class="current-price">
            Current price: {$current_price}
        </div>
        <div class="entry-price">
            Entry price: <input type="number" bind:value={entry_price} />$
            <button class="underline" on:click={() => entry_price = parseFloat($current_price.toFixed(2))}>set current</button>
        </div>
        <div class="leverege">
            Leverage: <input type="range" min="1" max="50" bind:value={leverage}> {leverage}x
        </div>
        <div class="amount">
            Amount: <input type="text" bind:value={amount}> $ x {leverage} = {totalAmount()}$
        </div>
        <div class="liquidation">
            Liquidation: <span style="color: orange;">{longLiquidation()}$</span>
        </div>
        <div class="enable-tpsl">
            Enable take-profit/stop-loss: <input type="checkbox" bind:checked={enable_tpsl} />
        </div>
        {#if enable_tpsl}
            <div class="take-profit">
                Take-Profit: <input type="number" min={$current_price} bind:value={take_profit}> $ = <span style="color: green;">{calcLongTPSL(take_profit)}$</span>
            </div>
            <div class="stop-loss">
                Stop-Loss: <input type="number" max={$current_price} bind:value={stop_loss}> $ = <span style="color: red;">{calcLongTPSL(stop_loss)}$</span>
            </div>
        {/if}
        <button class="underline">Open position</button>
    </div>
{:else if order_modal === -1}
    <span class="splitter mt-5 mb-5"></span>
    <div class="form flex flex-col w-[90%]">
        <div class="header flex justify-between text-md font-bold">
            <span>
                Open Short position
            </span>
            <a href="#" on:click={() => order_modal = 0}><Fa icon={faClose}/></a>
        </div>
        <div class="current-price">
            Current price: {$current_price}
        </div>
        <div class="entry-price">
            Entry price: <input type="number" bind:value={entry_price} />$
            <button class="underline" on:click={() => entry_price = parseFloat($current_price.toFixed(2))}>set current</button>
        </div>
        <div class="leverege">
            Leverage: <input type="range" min="1" max="50" bind:value={leverage}> {leverage}x
        </div>
        <div class="amount">
            Amount: <input type="text" bind:value={amount}> $ x {leverage} = {totalAmount()}$
        </div>
        <div class="liquidation">
            Liquidation: <span style="color: orange;">{shortLiquidation()}$</span>
        </div>
        <div class="enable-tpsl">
            Enable take-profit/stop-loss: <input type="checkbox" bind:checked={enable_tpsl} />
        </div>
        {#if enable_tpsl}
            <div class="take-profit">
                Take-Profit: <input type="number" max={$current_price} bind:value={take_profit}> $ = <span style="color: green;">{calcShortTPSL(take_profit)}$</span>
            </div>
            <div class="stop-loss">
                Stop-Loss: <input type="number" min={$current_price} bind:value={stop_loss}> $ = <span style="color: red;">{calcShortTPSL(stop_loss)}$</span>
            </div>
        {/if}
        <button class="underline">Open position</button>
    </div>
{/if}

<style scoped>
    input {
        border: 1px solid rgb(234, 234, 234);
    }

    .form div {
       padding: 5px; 
    }

    .form input {
        width: 120px;
    }
</style>