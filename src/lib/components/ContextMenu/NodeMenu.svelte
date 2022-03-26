<script>
	import Menu from '$lib/components/ContextMenu/ContextMenu.svelte';
	import MenuItem from '$lib/components/ContextMenu/MenuItem.svelte';
	import MenuDivider from '$lib/components/ContextMenu/MenuDivider.svelte';
	
	let pos = { x: 0, y: 0 }
	let showMenu = false
	let targetName = null

	const availableMenus = ['side-node']

	async function onRightClick(e) {
		targetName = e.target.getAttribute('name')

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
</script>

{#if showMenu}
	<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
		{#if targetName === 'side-node'}
		<MenuItem 
			on:click={console.log} 
			text="Create node" />
		<MenuItem 
			on:click={console.log} 
			text="Create sub-node" />
		{:else}
			<MenuItem isDisabled text="No options!"></MenuItem>
		{/if}
	</Menu>
{/if}

<svelte:body on:contextmenu|preventDefault={onRightClick} />