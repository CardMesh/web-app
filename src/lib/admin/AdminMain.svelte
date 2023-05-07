<script>
  import { onMount } from 'svelte';
  import Sidebar from '$lib/admin/Sidebar.svelte';
  import NavbarTop from '$lib/admin/NavbarTop.svelte';
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import MobileMenu from '$lib/admin/MobileMenu.svelte';

  let screenWidth = false;
  let isMounted = false;

  onMount(() => {
    const handleResize = () => {
      screenWidth = window.innerWidth;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    isMounted = true;
  });
</script>

{#if isMounted}
    <div class="d-flex flex-nowrap mobile">
        {#if screenWidth > 642}
            <Sidebar/>
        {:else}
            <MobileMenu/>
        {/if}

        <div class="custom-container">
            <NavbarTop/>
            <main>
                <div class="px-3">
                    <slot/>
                </div>
            </main>
        </div>
    </div>
   <SvelteToast/>
{/if}

<style>
    .custom-container {
        width: 100%;
    }

    @media (max-width: 642px) {
        .mobile {
            padding-bottom: 70px;
        }
    }
</style>
