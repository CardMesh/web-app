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

  const getVisiblePages = () => {
    let startPage = Math.max(pagination.page - 2, 1);
    let endPage = Math.min(startPage + 4, pagination.totalPages);

    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 1);
    }

    return {
      startPage,
      endPage
    };
  };
</script>

<nav aria-label="Pagination for users" class="py-4">
    <ul class="pagination">
        <li class="page-item">
            <a
                    class="page-link {pagination.prevPage ?? 'disabled'}"
                    href={buildPaginationParams(pagination.prevPage)}>Previous</a
            >
        </li>

        {#each Array(pagination.totalPages) as _, i (i)}
            {#if i + 1 >= getVisiblePages().startPage && i + 1 <= getVisiblePages().endPage}
                <li class="page-item {pagination.page === i + 1 ? 'active' : ''}">
                    <a class="page-link" href={buildPaginationParams(i + 1)}>{i + 1}</a>
                </li>
            {/if}
        {/each}

        <li class="page-item">
            <a
                    class="page-link {pagination.nextPage ?? 'disabled'}"
                    href={buildPaginationParams(pagination.nextPage)}>Next</a
            >
        </li>
    </ul>
</nav>
