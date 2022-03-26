<script lang='ts'>
	import Menu from '$lib/components/ContextMenu/ContextMenu.svelte';
	import MenuItem from '$lib/components/ContextMenu/MenuItem.svelte';
	import { dataHandler } from '$lib/data';
	import type { Node } from '$lib/types'
	
	let pos = { x: 0, y: 0 }
	let showMenu = false
	let targetName = null
	let targetArg = null

	const availableMenus = ['side-node', 'sidebar']

	async function onRightClick(e) {
		let args = e.target.getAttribute('name').split(' ')
		targetName = args[0]
		targetArg = args[1]

		if (showMenu) {
			showMenu = false;
			await new Promise(res => setTimeout(res, 100));
		}
		
		if (availableMenus.includes(targetName)) {
			pos = { x: e.clientX, y: e.clientY };
			showMenu = true;
		}
	}
	
	function closeMenu() {
		showMenu = false;
	}

	function createNode(e: CustomEvent, parent?: Node) {
		const name = prompt('Enter new node name')

		if (name !== null) {
			dataHandler.execute('createNode', name, parent)
		}
	}
</script>

{#if showMenu}
	<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
		{#if targetName === 'side-node'}
			<MenuItem
				on:click={createNode}
				text="Create node" />
			<MenuItem
				on:click={(e) => createNode(e, targetArg)}
				text="Create sub-node" />
		{:else if targetName === 'sidebar'}
			<MenuItem
				on:click={createNode}
				text="Create node" />
		{:else}
			<MenuItem isDisabled text="No options!"></MenuItem>
		{/if}
	</Menu>
{/if}

<svelte:body on:contextmenu|preventDefault={onRightClick} />