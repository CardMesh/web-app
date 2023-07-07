<script>
  export let id;
  export let label;
  export let name;
  export let value;

  const positions = ['start', 'center', 'end'];
</script>

<div class="form-floating mb-3">
    <select aria-label="Select alignment" bind:value={value} class="form-select" id={id} name={name}>
        {#each positions as position}
            <option value={position}>{position}</option>
        {/each}
    </select>
    <label for={id}>{label}</label>
</div>
