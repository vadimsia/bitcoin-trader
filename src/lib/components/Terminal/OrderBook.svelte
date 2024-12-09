<script lang="ts">
    import { getCookieByName } from "$lib";
    import {EOrderType, EOrderState} from "$lib/Order"
    import type {IOrder} from "$lib/Order"

    import {current_price} from "$lib/store/price"
    import { onMount } from "svelte";
    
    let orders: IOrder[] = []

    async function loadOrderBook() {
        let response = await fetch('/api/terminal/orders')
        if (response.status !== 200)
            return

        orders = await response.json()
    }

    $: longLiquidation = (order: IOrder) => {
        let liq_perc = 100 / order.leverage / 100
        return (order.entry_price - (order.entry_price * liq_perc)).toFixed(2)
    }

    $: shortLiquidation = (order: IOrder) => {
        let liq_perc = 100 / order.leverage / 100
        return (order.entry_price + (order.entry_price * liq_perc)).toFixed(2)
    }

    $: calcLongPnL = (order: IOrder) => {
        let change_percent = ($current_price - order.entry_price) / order.entry_price
        return (order.amount * order.leverage * change_percent).toFixed(2)
    }

    $: calcShortPnL = (order: IOrder) => {
        let change_percent = -($current_price - order.entry_price) / order.entry_price
        return (order.amount * order.leverage * change_percent).toFixed(2)
    }

    $: calcLongTPSL = (order: IOrder, tpsl: number) => {
        return ((tpsl - order.entry_price) / order.entry_price * order.amount * order.leverage).toFixed(2)
    }

    $: calcShortTPSL = (order: IOrder, tpsl: number) => {
        return (-(tpsl - order.entry_price) / order.entry_price * order.amount * order.leverage).toFixed(2)
    }

    async function cancelPosition(order: IOrder) {
        let response = await fetch('/api/terminal/cancel_position', {
            body: JSON.stringify({id: order.id}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookieByName('csrftoken')
            },
            method: 'POST'
        })

        if (response.status === 200)
            loadOrderBook()
    }

    async function closePosition(order: IOrder) {
        let response = await fetch('/api/terminal/close_position', {
            body: JSON.stringify({id: order.id}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookieByName('csrftoken')
            },
            method: 'POST'
        })

        if (response.status === 200)
            await loadOrderBook()
    }

    onMount(async () => {
        await loadOrderBook()
        setInterval(async () => {
            await loadOrderBook()
        }, 15_000)
    })
</script>

{#if orders.length === 0}
    Empty
{:else}
    <table class="w-full">
        <thead>
            <tr>
                <th>Id</th>
                <th>Type</th>
                <th>State</th>
                <th>Amount</th>
                <th>PnL</th>
                <th>Entry</th>
                <th>Liquid.</th>
                <th>TP/SL</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody class="body">
            {#each orders as order }
                <tr>
                    <td><i>#{order.id}</i></td>        
                    <td>
                        {#if order.order_type === EOrderType.LONG}
                            <b style="color: green;">Long</b>
                        {:else}
                            <b style="color: red;">Short</b>
                        {/if}
                    </td>
                    <td>
                        {EOrderState[order.state]}
                    </td>
                    <td>
                        {order.amount * order.leverage}$ <br>
                        Base: {order.amount}$ x {order.leverage}
                    </td>
                    <td>
                        {#if order.state === EOrderState.OPEN || order.state === EOrderState.CLOSED || order.state === EOrderState.TO_BE_CLOSED}
                            {#if order.order_type === EOrderType.LONG}
                                <span style="color: orange">{calcLongPnL(order)}$</span>
                            {:else if order.order_type === EOrderType.SHORT}
                                <span style="color: orange">{calcShortPnL(order)}$</span>
                            {/if}
                        {/if}
                    </td>
                    <td>
                        {order.entry_price}$
                    </td>
                    <td>
                        <span style="color: red">
                            {#if order.order_type === EOrderType.LONG}
                                {longLiquidation(order)}$
                            {:else if order.order_type === EOrderType.SHORT}
                                {shortLiquidation(order)}$
                            {/if}
                        </span>
                    </td>
                    <td>
                        {order.take_profit}/{order.stop_loss}<br>
                        {#if order.order_type === EOrderType.LONG && order.take_profit != 0}
                            <span style="color: green">{calcLongTPSL(order, order.take_profit)}$</span>
                            /
                            <span style="color: red;">{calcLongTPSL(order, order.stop_loss)}$</span>
                        {:else if order.order_type === EOrderType.SHORT && order.stop_loss != 0}
                            <span style="color: green">{calcShortTPSL(order, order.take_profit)}$</span>
                            /
                            <span style="color: red;">{calcShortTPSL(order, order.stop_loss)}$</span>
                        {/if}
                        
                    </td>
                    <td>
                        {#if order.state === EOrderState.WAITING}
                            <button on:click={() => cancelPosition(order)}><u>Cancel</u></button>
                        {:else if order.state === EOrderState.OPEN}
                            <button on:click={() => closePosition(order)}><u>Close</u></button>
                        {:else}
                            -
                        {/if}
                    </td>
                </tr>
            {/each}

        </tbody>
    </table>
{/if}

<style scoped>
    tbody td {
        text-align: center;

    }

    tbody tr {
        border: 1px solid rgb(234, 234, 234);
    }
</style>