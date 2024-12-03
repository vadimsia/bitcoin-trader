<script lang="ts">
    import Fa from 'svelte-fa'
    import { faArrowUpWideShort, faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons'
</script>

<div class="terminal flex col">
    <h3 style="text-3xl font-bold underline">Balance: 100$</h3>
    <div class="flex row items-center">
        <button class="green"><Fa icon={faArrowUpWideShort} />Buy</button>
        <button class="red"><Fa icon={faArrowDownShortWide} />Sell</button>
    </div>
</div>

<style>
    .terminal {
        border: 1px solid rgb(234, 234, 234);
        padding: 10px;
    }

    button {
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