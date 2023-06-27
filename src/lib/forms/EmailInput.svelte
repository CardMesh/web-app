<script>
  export let value;

  export let name;

  export let displayName;

  export let disabled;

  export let required = false;
</script>

<div class="form-floating mb-3">
    <input
            bind:value={value}
            class="form-control"
            disabled="{disabled}"
            id="{name}Input"
            name="{name}"
            placeholder=""
            required="{required}"
            type="email"
    />
    <label for="{name}Input">{displayName}</label>
</div>
