<script>
  import { EyeIcon, EyeOffIcon } from 'svelte-feather-icons';

  export let value;
  export let name;
  export let displayName;

  export let required = false;

  let isPasswordVisible = false;

  const togglePasswordVisibility = () => {
    isPasswordVisible = !isPasswordVisible;
  };
</script>

<div class="input-group mb-3">
    <div class="form-floating">
        <input
                class="form-control"
                id="{name}Input"
                minlength="8"
                name="{name}"
                placeholder=""
                required="{required}"
                type={isPasswordVisible ? 'text' : 'password'}
                value={value}
        />
        <label for="{name}Input">{displayName}</label>
    </div>
    <button class="btn btn-outline-secondary" on:click|preventDefault={togglePasswordVisibility} tabindex="-1" type="button">
    <span class="d-flex align-items-center">
      {#if isPasswordVisible}
        <EyeOffIcon size="1.2x"/>
      {:else}
        <EyeIcon size="1.2x"/>
      {/if}
    </span>
    </button>
</div>
