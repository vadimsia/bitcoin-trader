<script lang="ts">
    import {EOrderType, EOrderState} from "$lib/Order"
    import type {IOrder} from "$lib/Order"

    import {current_price} from "$lib/store/price"
    
    let orders: IOrder[] = [
        {
            id: 12312312,
            type: EOrderType.LONG,
            state: EOrderState.WAITING,
            amount: 100,
            entry_price: 200,
            leverage: 5,
            take_profit: 205,
            stop_loss: 195
        },
        {
            id: 12312312,
            type: EOrderType.SHORT,
            state: EOrderState.OPEN,
            amount: 100,
            entry_price: 200,
            leverage: 1,
            take_profit: 195,
            stop_loss: 400
        },
    ]

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
                        {#if order.type === EOrderType.LONG}
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
                        {#if order.type === EOrderType.LONG}
                            <span style="color: orange">{calcLongPnL(order)}$</span>
                        {:else if order.type === EOrderType.SHORT}
                            <span style="color: orange">{calcShortPnL(order)}$</span>
                        {/if}
                    </td>
                    <td>
                        {order.entry_price}$
                    </td>
                    <td>
                        <span style="color: red">
                            {#if order.type === EOrderType.LONG}
                                {longLiquidation(order)}$
                            {:else if order.type === EOrderType.SHORT}
                                {shortLiquidation(order)}$
                            {/if}
                        </span>
                    </td>
                    <td>
                        {order.take_profit}/{order.stop_loss}<br>
                        {#if order.type === EOrderType.LONG}
                            <span style="color: green">{calcLongTPSL(order, order.take_profit)}$</span>
                            /
                            <span style="color: red;">{calcLongTPSL(order, order.stop_loss)}$</span>
                        {:else if order.type === EOrderType.SHORT}
                            <span style="color: green">{calcShortTPSL(order, order.take_profit)}$</span>
                            /
                            <span style="color: red;">{calcShortTPSL(order, order.stop_loss)}$</span>
                        {/if}
                        
                    </td>
                    <td>
                        {#if order.state === EOrderState.WAITING}
                            <a href="#"><u>Cancel</u></a>
                        {:else if order.state === EOrderState.OPEN}
                            <a href="#"><u>Close</u></a>
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