<script>
  import Preview from '$lib/layout/Preview.svelte';
  import { onMount } from 'svelte';

  let isMounted = false;

  let screenWidth = false;

  export let vCard;

  export let theme;

  export let logo;

  onMount(() => {
    const handleResize = () => {
      screenWidth = window.innerWidth;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    isMounted = true;
  });
</script>

<div class="d-flex flex-nowrap">
    {#if screenWidth >= 992}
        <div class="col-4 ms-auto float-preview" style="z-index: 1020">
            <Preview {vCard} {theme} {logo}/>
        </div>
    {/if}
</div>

<style>
    .float-preview {
        position: fixed;
        right: 0;
        bottom: 50%;
        transform: translateY(50%);
    }
</style>
