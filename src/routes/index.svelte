<script lang="ts">
	import ContentEditor from '$lib/components/ContentEditor.svelte'
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte'
	import { nodes, selectedNode } from '$lib/stores';
	import NodeMenu from '$lib/components/ContextMenu/NodeMenu.svelte';

    let editMode = true

    let sidebarWidth = 250
    let resizingSidebar = false

    function handleMoveStart(e: MouseEvent) {
        resizingSidebar = true
    }

    function handleMoveEnd(e: MouseEvent) {
        resizingSidebar = false
    }

    function handleMove(e: MouseEvent) {
        if (resizingSidebar) {
            sidebarWidth = e.pageX
        }
    }
</script>

<svelte:body on:mousemove={handleMove} on:mouseup={handleMoveEnd}></svelte:body>

<div class="w-full h-screen">
    <NodeMenu />
	<header></header>

	<div class="flex flex-row w-full h-full">
		<Sidebar {nodes} bind:editMode width={sidebarWidth} />
		<div
            class="bg-neutral-dark h-full w-1 cursor-col-resize"
            on:mousedown={handleMoveStart}
        ></div>
		<div class="w-full h-full">
			<!-- Editor -->
			<ContentEditor bind:editMode bind:node={$selectedNode} />
		</div>
	</div>

	<footer></footer>
</div>
