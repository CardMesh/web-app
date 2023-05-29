<script>
  export let value;

  export let name;

  export let displayName;

  export let max;

  export let min;
</script>

<div class="mb-3">
    <label class="form-label" for="{name}Range">{displayName}</label>
    <input
            bind:value={value}
            class="form-range"
            id="{name}Range"
            max="{max}"
            min="{min}"
            name="{name}"
            type="range"
    />
</div>
