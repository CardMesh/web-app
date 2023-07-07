<script>
  export let ariaLabel = '';

  export let href;

  export let backgroundColor;

  export let fontColor;

  export let target = '_self';
</script>

<a
        aria-label="{ariaLabel}"
        class="btn me-2 d-flex my-auto rounded-circle p-2 border-0"
        href="{href.includes('://') ? href : `https://${href}`}"
        role="button"
        style="background-color: {backgroundColor}; color: {fontColor}"
        target="{target}"
>
    <slot/>
</a>