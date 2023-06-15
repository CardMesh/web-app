<script>
  export let tag = 'h1';
  export let size;
  export let border = false;
  export let noTop = false;
  export let id;
</script>
<div class={`d-flex mb-3 ${border ? 'pb-2 border-bottom' : ''} ${noTop ? '' : 'pt-3'}`} id={id}>
    {#if tag === 'h1'}
        <h1 class={size}>
            <slot/>
        </h1>
    {:else if tag === 'h2'}
        <h2 class={size}>
            <slot/>
        </h2>
    {:else if tag === 'h3'}
        <h3 class={size}>
            <slot/>
        </h3>
    {:else}
        <h4 class={size}>
            <slot/>
        </h4>
    {/if}
</div>
