<script>
  export let checked = false;
  export let id = '';
  export let name = '';
  export let label = '';

  const handleChange = () => {
    checked = !checked;
  };
</script>

<div class="form-check form-switch form-switch-lg mb-3">
    <input
            checked="{checked}"
            class="form-check-input me-2"
            id="{id}"
            name="{name}"
            on:change={handleChange}
            role="switch"
            type="checkbox"
    />
    <label class="form-check-label align-middle" for="{id}">{label}</label>
</div>

<style>
    .form-check-input {
        clear: left;
        margin-top: 0;
    }

    .form-switch.form-switch-lg .form-check-input {
        height: 2rem;
        width: calc(3rem + 0.75rem);
        border-radius: 4rem;
    }
</style>
