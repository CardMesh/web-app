<script>
  export let isLoading = false;
</script>

<button class="btn btn-primary btn-lg w-100 mb-4" disabled={isLoading} type="submit">
    {#if isLoading}
        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/>
    {:else}
        <slot/>
    {/if}
</button>
