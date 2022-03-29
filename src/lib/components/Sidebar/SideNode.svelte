<script lang="ts">
    import { selectedNode } from '$lib/stores';

    import type { Node } from '$lib/types'

    export let node: Node;
    export let depth: number = 0;

    let showChildren = false

    function selectNode() {
        selectedNode.update(oldNode => node)
    }
</script>

<div class="flex flex-row w-full" style="margin-left: {1 * depth}rem">
    <div class="w-full">
        <div class="flex flex-row w-full">
            {#if node.children.length}
                <div class="flex items-center mr-1 text-xs text-secondary-text" on:click={() => showChildren=!showChildren}>
                    {#if showChildren}
                        ᐯ
                    {:else}
                        ᐳ
                    {/if}
                </div>
            {:else}
                <div class="mr-1 text-neutral-dark text-xs">ᐳ</div>
            {/if}
            <div name={"side-node " + node.id}
                 class="w-full"
                 class:text-secondary-text={$selectedNode.id !== node.id}
                 class:text-white={$selectedNode.id === node.id}
                 class:border-background={$selectedNode.id === node.id}
                 class:border-r-4={$selectedNode.id === node.id}
                 on:click={selectNode}>
                {node.name}
            </div>
        </div>
        {#if showChildren}
            {#each node.children as child}
                <svelte:self node={child} depth={depth + 1} />
            {/each}
        {/if}
    </div>
</div>