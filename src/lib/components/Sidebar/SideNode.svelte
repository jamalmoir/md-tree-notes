<script lang="ts">
    import type { Node } from '$lib/types'
    import NodeMenu from '../ContextMenu/NodeMenu.svelte';

    export let node: Node;
    export let depth: number = 0;

    let showChildren = false
</script>

<div class="flex flex-row" style="margin-left: {1 * depth}rem">
    <NodeMenu />
    <div>
        <div name="side-node" class="flex flex-row">
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
            {node.name}
        </div>
        {#if showChildren}
            {#each node.children as child}
                <svelte:self node={child} depth={depth + 1} />
            {/each}
        {/if}
    </div>
</div>