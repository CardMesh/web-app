<script>
  import { goto } from '$app/navigation';

  export let searchInput;

  export let searchQuery;

  export let name;

  const search = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('search', searchQuery);

    goto(url.toString(), { keepFocus: true });
  };
</script>

<div class="form-floating mb-3">
    <input
            bind:this={searchInput}
            bind:value={searchQuery}
            class="form-control"
            id="searchInput"
            on:input={search}
            placeholder=""
            type="text"
    />
    <label for="searchInput">{name}</label>
</div>
