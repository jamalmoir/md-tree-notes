<script lang="ts">
	import ContentEditor from './ContentEditor.svelte'
    import type { Node } from '$lib/types'
	import Sidebar from './Sidebar.svelte'

	let nodes: Node[] = [
		{
			name: 'Test1',
			position: 1,
			colour: 'red',
			tags: [],
			children: [
				{
					name: 'Test Child',
					position: 1,
					colour: 'blue',
					tags: [],
					children: [
						{
							name: 'Test Child of Child',
							position: 1,
							colour: 'green',
							tags: [],
							children: [],
						}
					],
				},
				{
					name: 'Test Child2',
					position: 2,
					colour: 'blue',
					tags: [],
					children: [],
				}
			],
		},
		{
			name: 'Test2',
			position: 1,
			colour: 'red',
			tags: [],
			children: [],
		},
	]
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
	<header></header>

	<div class="flex flex-row w-full h-full">
		<Sidebar {nodes} bind:editMode width={sidebarWidth} />
		<div
            class="bg-black h-full w-1 cursor-col-resize"
            on:mousedown={handleMoveStart}
        ></div>
		<div class="w-full h-full">
			<!-- Editor -->
			<ContentEditor bind:editMode />
		</div>
	</div>

	<footer></footer>
</div>
