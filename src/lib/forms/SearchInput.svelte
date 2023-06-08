<script>
  import { goto } from '$app/navigation';
  import { SearchIcon } from 'svelte-feather-icons';

  export let searchInput;

  export let searchQuery;

  export let name;

  const handleKeydown = (options) => {
    const onKeyDown = event => {
      if (event.ctrlKey && event.key === 'k') {
        options.focus();
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return {
      destroy() {
        document.removeEventListener('keydown', onKeyDown);
      }
    };
  };

  const search = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('search', searchQuery);
    url.searchParams.set('page', '1');

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
    <label bind:this={searchInput}
           for="searchInput"
           use:handleKeydown={{focus: () => searchInput.focus()}}
    >
        <SearchIcon size="1x"/> {name} <span class="badge bg-secondary">CTRL K</span>
    </label>
</div>
