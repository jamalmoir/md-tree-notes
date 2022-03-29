<script lang='ts'>
	import Menu from '$lib/components/ContextMenu/ContextMenu.svelte';
	import MenuItem from '$lib/components/ContextMenu/MenuItem.svelte';
	import { dataHandler } from '$lib/stores';
	
	let pos = { x: 0, y: 0 }
	let showMenu = false
	let targetName = null
	let targetArg = null

	const availableMenus = ['side-node', 'sidebar']

	async function onRightClick(e) {
		let targetNameAttr = e.target.getAttribute('name')
		
		if (!targetNameAttr) {
			return
		}

		let args = targetNameAttr.split(' ')

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

	function createNode(e: CustomEvent, parent?: string) {
		const name = prompt('Enter new node name')

		if (name !== null) {
			$dataHandler.createNode(name, parent)
		}
	}

	function updateNode(e: CustomEvent, nodeId: string) {
		const name = prompt('Enter new name for this node')

		if (name !== null) {
			$dataHandler.updateNode(nodeId, name)
		}
	}

	function deleteNode(e: CustomEvent, nodeId: string) {
		const deleteChoice = confirm('Are you sure you want to delete this node?')

		if (deleteChoice) {
			$dataHandler.deleteNode(nodeId)
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
			<MenuItem
				on:click={(e) => updateNode(e, targetArg)}
				text="Update node" />
			<MenuItem
				on:click={(e) => deleteNode(e, targetArg)}
				text="Delete node" />
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