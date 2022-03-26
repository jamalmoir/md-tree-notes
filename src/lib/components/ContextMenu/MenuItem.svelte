<script>
	import { getContext } from 'svelte';
	import { key } from '$lib/menu';
	import { createEventDispatcher } from 'svelte';
	
	export let isDisabled = false;
	export let text = '';
	
	const dispatch = createEventDispatcher();	
	const { dispatchClick } = getContext(key);
	
	function handleClick() {
		if (isDisabled) return;
		
		dispatch('click');
		dispatchClick();
	}
</script>

<div 
    class="flex items-center text-text p-xs cursor-default font-sm gap-sm hover:bg-primary"
    class:disabled={isDisabled}
    class:text-white={isDisabled}
    class:bg-neutral-light={isDisabled}
    on:click={handleClick}
>
	{#if text}
		{text}
	{:else}
		<slot />
	{/if}
</div>
