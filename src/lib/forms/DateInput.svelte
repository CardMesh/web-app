<script>
  export let value;

  export let name;

  export let displayName;
</script>

<div class="form-floating mb-3">
    <input
            bind:value={value}
            class="form-control"
            id="{name}Input"
            name="{name}"
            placeholder=""
            type="date"
    />
    <label for="{name}Input">{displayName}</label>
</div>
