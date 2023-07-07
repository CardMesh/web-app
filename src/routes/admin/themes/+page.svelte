<script>
  import AdminMain from '$lib/layout/AdminMain.svelte';
  import { AlertTriangleIcon, Edit2Icon, MoreVerticalIcon, PlusIcon, TrashIcon } from 'svelte-feather-icons';
  import { displaySuccess, displayWarning } from '../../../js/toast.js';
  import { enhance } from '$app/forms';
  import SearchInput from '$lib/forms/SearchInput.svelte';
  import Heading from '$lib/layout/Heading.svelte';
  import Pagination from '$lib/pagination/Pagination.svelte';
  import TextInput from '$lib/forms/TextInput.svelte';
  import Cookies from 'js-cookie';

  export let data;

  const themeId = JSON.parse(Cookies.get('user') || '{}').data?.themeId;

  let isLoading = false;

  const deleteTheme = () => {
    isLoading = true;
    return async ({
      update,
      result
    }) => {
      await update({ reset: false });

      if (result.data.success) {
        displaySuccess('Successfully deleted!');
      } else {
        if (result.data.errors) {
          displayWarning(result.data.errors.join('\n'));
        }
      }

      isLoading = false;
    };
  };

  const createTheme = () => {
    isLoading = true;
    return async ({
      update,
      result
    }) => {
      await update({ reset: false });

      if (result.data.success) {
        displaySuccess('Theme created!');
      } else {
        displayWarning('Something went wrong. Please try again.');
      }

      isLoading = false;
    };
  };

  let text;

  let pagination;

  $: {
    let {
      page,
      totalPages,
      limit,
      nextPage,
      prevPage
    } = data.themes.pagination;

    pagination = {
      page,
      totalPages,
      limit,
      nextPage,
      prevPage
    };
  }

  let searchQuery = '';

  let searchInput;
</script>

<svelte:head>
    <title>Themes</title>
    <meta content="Themes"/> <!-- TODO use lib for meta data -->
</svelte:head>

<AdminMain>
    <Heading border="true" size="h2" tag="h1">Themes</Heading>

    <SearchInput bind:searchQuery={searchQuery} name="Search" {searchInput}></SearchInput>

    <div
            aria-hidden="true"
            aria-labelledby="createThemeModalLabel"
            class="modal fade"
            id="createThemeModal"
            tabindex="-1"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="createThemeModalLabel">Create theme
                    </h4>
                    <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
                </div>
                <div class="modal-body">
                    <form action="?/createTheme" method="POST" use:enhance={createTheme}>
                        <TextInput displayName="Name" name="name"></TextInput>

                        <div class="modal-footer">
                            <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Close</button>
                            <button class="btn btn-primary" data-bs-dismiss="modal" type="submit"
                            >Create theme
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="table-responsive">
        <table class="table">
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th class="text-end" scope="col">Actions</th>
            </tr>
            </thead>
            <tbody class="table-group-divider">
            {#each data.themes.data as theme}
                <tr>
                    <td class="align-middle text-nowrap">{theme.name}</td>
                    <td class="d-flex justify-content-end">
                        <a
                                class="btn btn-action rounded-circle d-flex align-items-center justify-content-center"
                                role="button"
                                href="/admin/themes/{theme.themeId}"
                        >
                            <div class="d-flex text-info">
                                <Edit2Icon size="2x"/>
                            </div>
                        </a>

                        <div class="btn-group">
                            <button type="button" class="btn btn-action rounded-circle" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                <span class="d-flex align-items-center justify-content-center text-secondary">
                                    <MoreVerticalIcon size="2x"/>
                                </span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li>
                                    <button
                                            data-bs-toggle="modal"
                                            data-bs-target="#{theme.themeId}Modal" class="dropdown-item" type="button">
                                        <TrashIcon size="1x" class="me-2"/>
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div
                                class="modal fade"
                                id="{theme.themeId}Modal"
                                tabindex="-1"
                                aria-labelledby="{theme.themeId}ModalLabel"
                                aria-hidden="true"
                        >
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="{theme.themeId}ModalLabel">
                                            Delete {theme.name}</h1>
                                        <button
                                                type="button"
                                                class="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        Are you sure, that you want to delete <strong>{theme.name}</strong>
                                        <div class="alert alert-warning mt-3" role="alert">
                                            <AlertTriangleIcon class="me-3"/>
                                            This action cannot be undone.
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                            No
                                        </button>

                                        <form action="?/delete" method="POST" use:enhance={deleteTheme}>
                                            <input type="text" value={theme.themeId} name="themeId" hidden/>
                                            <button class="btn btn-primary" type="submit" data-bs-dismiss="modal">
                                                Yes, I am sure!
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>

    <Pagination {pagination} {searchQuery}/>

    <button
            class="btn btn-action rounded-circle d-flex align-items-center justify-content-center px-4 float-button z-0"
            data-bs-content="btn"
            data-bs-placement="top"
            data-bs-target="#createThemeModal"
            data-bs-toggle="modal"
    >
        <span class="d-flex text-light bg-primary bubble">
            <PlusIcon size="2x"/>
        </span>
    </button>
</AdminMain>

<style>
    .float-button {
        position: fixed;
        bottom: 30px;
        right: 30px;
    }

    @media (max-width: 642px) {
        .float-button {
            bottom: 97px;
        }
    }

    .bubble {
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        padding: 20px;
    }

    :global(.btn-action) {
        width: 50px !important;
        max-width: 100% !important;
        max-height: 100% !important;
        height: 50px !important;
        text-align: center;
        padding: 0;
        font-size: 10px;
    }

    :global(.btn-action:hover) {
        color: white;
        background-color: grey;
    }

    .dropdown-menu {
        position: fixed !important;
    }
</style>
