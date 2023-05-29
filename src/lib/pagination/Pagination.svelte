<script>

  export let pagination;

  export let searchQuery;

  const buildPaginationParams = page => {
    const params = new URLSearchParams();
    if (page) {
      params.append('page', page);
    }
    if (pagination.limit) {
      params.append('limit', pagination.limit);
    }
    if (searchQuery) {
      params.append('search', searchQuery);
    }
    return `?${params.toString()}`;
  };

</script>

<nav aria-label="..." class="mt-4">
    <ul class="pagination">
        <li class="page-item">
            <a
                    class="page-link {pagination.prevPage ?? 'disabled'}"
                    href={buildPaginationParams(pagination.prevPage)}>Previous</a
            >
        </li>

        {#each Array(pagination.totalPages) as _, i (i)}
            <li class="page-item {pagination.page === i + 1 ? 'active' : ''}">
                <a class="page-link" href={buildPaginationParams(i + 1)}>{i + 1}</a>
            </li>
        {/each}

        <li class="page-item">
            <a
                    class="page-link {pagination.nextPage ?? 'disabled'}"
                    href={buildPaginationParams(pagination.nextPage)}>Next</a
            >
        </li>
    </ul>
</nav>