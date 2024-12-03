<script lang="ts">
    import {EOrderType, EOrderState} from "$lib/Order"
    import type {IOrder} from "$lib/Order"
    
    let orders: IOrder[] = [
        {
            id: 12312312,
            type: EOrderType.LONG,
            state: EOrderState.WAITING,
            amount: 100,
            entry_price: 200,
            leverege: 5,
            take_profit: 205,
            stop_loss: 0
        },
        {
            id: 12312312,
            type: EOrderType.SHORT,
            state: EOrderState.WAITING,
            amount: 100,
            entry_price: 200,
            leverege: 5,
            take_profit: 205,
            stop_loss: 0
        },
    ]
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
                        {order.state}
                    </td>
                    <td>
                        {order.amount * order.leverege}$ <br>
                        Base: {order.amount}$ x {order.leverege}
                    </td>
                    <td>
                        
                    </td>
                    <td>
                        {order.entry_price}$
                    </td>
                    <td>
                        {order.take_profit}/{order.stop_loss}
                    </td>
                    <td>
                        <a href="#"><u>Cancel</u></a>
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