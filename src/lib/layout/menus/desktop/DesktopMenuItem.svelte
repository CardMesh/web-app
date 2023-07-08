<script>
  import { page } from '$app/stores';

  export let href;

  export let name;

  export let click;

  const resetPopoverState = () => {
    try {
      const popoverDiv = document.querySelectorAll('div.bs-popover-auto');

      // Remove the div manually
      popoverDiv.forEach((element) => {
        element.remove();
      });

      const popoverElements = document.querySelectorAll('[data-bs-toggle="popover"]');

      popoverElements.forEach((element) => {
        // Dispose of the existing popover instance
        if ('_bootstrap' in element) {
          element._bootstrap.dispose();
        }

        // Create a new popover instance and store the new instance in the '_bootstrap' property
        element._bootstrap = new bootstrap.Popover(element);
      });
    } catch (err) {
      // nothing
    }
  };

</script>
<!-- TODO move aria current out of component -->
{#if href}
    <a
            aria-current={$page.url.pathname === href ? 'page' : undefined}
            class="mt-2 my-2 btn btn-nav d-flex align-items-center justify-content-center mx-auto"
            data-bs-content="{name}"
            data-bs-placement="right"
            data-bs-toggle="popover"
            data-bs-trigger="hover"
            href="{href}"
            on:click={resetPopoverState()}
            role="button"
    >
        <slot/>
    </a>
{:else}
    <button
            class="mt-2 my-2 btn btn-nav d-flex align-items-center justify-content-center mx-auto"
            data-bs-content="{name}"
            data-bs-placement="right"
            data-bs-toggle="popover"
            data-bs-trigger="hover"
            on:click={resetPopoverState()}
            on:click={click}
    >
        <slot/>
    </button>
{/if}

<style>
    .btn-nav {
        width: 50px !important;
        max-width: 100% !important;
        max-height: 100% !important;
        height: 50px !important;
        text-align: center;
        padding: 0;
        font-size: 12px;
    }

    .btn-nav:hover,
    a[aria-current='page'] {
        color: white;
        background-color: grey;
    }
</style>