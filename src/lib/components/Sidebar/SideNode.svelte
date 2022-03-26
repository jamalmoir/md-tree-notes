<script lang="ts">
    import type { Node } from '$lib/types'

    export let node: Node;
    export let depth: number = 0;

    let showChildren = false
</script>

<div class="flex flex-row" style="margin-left: {16*depth}px">
    {#if node.children.length}
        <div class="mr-1" on:click={() => showChildren=!showChildren}>
            {#if showChildren}
                ▼
            {:else}
                ▶
            {/if}
        </div>
    {:else}
        <div class="mr-1 text-neutral-dark">▶</div>
    {/if}
    <div>
        {node.name}
        {#if showChildren}
            {#each node.children as child}
                <svelte:self node={child} depth={depth + 1} />
            {/each}
        {/if}
    </div>
</div>