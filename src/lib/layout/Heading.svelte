<script>
  export let tag = 'h1';
  export let size;

  const Component = tag;

  export let border = false;

  export let noTop = false;

  export let id;
</script>

<div class="d-flex mb-3 {border ? 'pb-2 border-bottom' : ''} {noTop ? '': 'pt-3'}" id="{id}">
    <component class="{size}" this={Component}>
        <slot/>
    </component>
</div>
