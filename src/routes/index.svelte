<script lang="ts">
    import NoteTaker from "$lib/components/NoteTaker.svelte";
    import { dataHandler } from "./dataHandler";
</script>

<NoteTaker dataHandler={dataHandler}></NoteTaker>