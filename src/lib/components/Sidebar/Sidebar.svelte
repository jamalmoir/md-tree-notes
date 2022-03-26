<script lang="ts">
	import SideNode from '$lib/components/Sidebar/SideNode.svelte'
    import Switch from '$lib/components/Switch.svelte'

    export let nodes
    export let width = 250
    export let editMode
</script>

<div name="sidebar" class="flex flex-col justify-between bg-neutral-dark text-white p-sm h-full" style="width: {width}px">
    <!-- Node tree -->
    <div>
        {#each $nodes as node}
            <SideNode node={node}></SideNode>
        {/each}
    </div>
    <span class="flex flex-row justify-between items-center">Edit Mode: <Switch bind:checked={editMode}></Switch></span>
</div>