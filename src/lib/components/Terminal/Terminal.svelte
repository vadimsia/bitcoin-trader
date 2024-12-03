<script lang="ts">
    import OrderBook from "./OrderBook.svelte";
    import PositionModal from "./PositionModal.svelte";

    let order_modal = 0


</script>

<div class="terminal flex flex-col items-center">
    <div class="flex justify-center w-full">
        <button class="big-btn green mr-3" on:click={() => order_modal = 1}>Long</button>
        <button class="big-btn red ml-3" on:click={() => order_modal = -1}>Short</button>
    </div>

    <PositionModal bind:order_modal={order_modal} />

    <span class="splitter mt-5 mb-5"></span>

    <OrderBook />
</div>

<style>
    .terminal {
        border: 1px solid rgb(234, 234, 234);
        padding: 10px;
    }

    .big-btn {
        width: 40%;
        height: 50px;

        font-size: 28px;
    }

    .green {
        color: white;
        background: #1F4529;
        background: linear-gradient(180deg, #1F4529 0%, #16311d 100%);
    }

    .red {
        color: white;
        background: #740938;
        background: linear-gradient(180deg, #740938 0%, rgb(140, 18, 50) 100%);
    }

</style>