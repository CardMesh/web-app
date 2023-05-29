<script>
    export let ariaLabel = '';

    export let href;

    export let backgroundColor;

    export let fontColor;
</script>

<a
        aria-label="{ariaLabel}"
        class="btn me-2 d-flex my-auto rounded-circle p-2 border-0"
        href="{href}"
        role="button"
        style="background-color: {backgroundColor}; color: {fontColor}"
>
    <slot/>
</a>