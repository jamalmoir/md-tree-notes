<script lang="ts">
	import SideNode from './SideNode.svelte'

    export let nodes
    export let width = 250
    export let editMode
import Switch from './Switch.svelte'
</script>

<div class="flex flex-col justify-between bg-neutral-dark text-white p-sm h-full" style="width: {width}px">
    <!-- Node tree -->
    <div>
        {#each nodes as node}
            <SideNode node={node}></SideNode>
        {/each}
    </div>
    <Switch bind:checked={editMode}></Switch>
</div>