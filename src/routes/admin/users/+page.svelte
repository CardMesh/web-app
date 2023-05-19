<script>
  import AdminMain from '$lib/admin/AdminMain.svelte';
  import {
    AlertTriangleIcon,
    CreditCardIcon,
    Edit2Icon,
    EyeIcon,
    MoreVerticalIcon,
    SendIcon,
    TrashIcon,
    UserPlusIcon
  } from 'svelte-feather-icons';
  import { displaySuccess } from '../../../js/toast.js';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import Nfc from '$lib/front/Nfc.svelte';
  import { PUBLIC_BASE_URL } from '$env/static/public';

  export let data;

  let isLoading = false;

  const save = () => {
    isLoading = true;
    return async ({
      update,
      result
    }) => {
      await update({ reset: false });

      if (result.type === 'success') {
        displaySuccess('Successfully saved!');
      }

      isLoading = false;
    };
  };

  let text;

  let role = 'user';

  let pagination;

  $: {
    let {
      page,
      totalPages,
      limit,
      nextPage,
      prevPage
    } = data.users.pagination;
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

  const search = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('search', searchQuery);

    goto(url.toString(), { keepFocus: true });
  };

  function buildPaginationParams(page) {
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
  }
</script>

<svelte:head>
    <title>Users</title>
    <meta content="Users"/>
</svelte:head>

<AdminMain>
    <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
        <h1 class="h2">Users</h1>
    </div>

    <div class="form-floating mb-3">
        <input
                bind:this={searchInput}
                bind:value={searchQuery}
                class="form-control"
                id="searchInput"
                on:input={search}
                placeholder="Search..."
                type="text"
        />
        <label for="searchInput">Search</label>
    </div>

    <div
            aria-hidden="true"
            aria-labelledby="createUserModalLabel"
            class="modal fade"
            id="createUserModal"
            tabindex="-1"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="createUserModalLabel">Create user</h1>
                    <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"/>
                </div>
                <div class="modal-body">
                    <form action="?/create" method="POST" use:enhance={save}>
                        <div class="mb-3">
                            <label class="col-form-label" for="nameInput">Name:</label>
                            <input class="form-control" id="nameInput" name="name" type="text"/>
                        </div>
                        <div class="mb-3">
                            <label class="col-form-label" for="nameEmail">Email:</label>
                            <input class="form-control" id="nameEmail" name="email" type="email"/>
                        </div>

                        <div class="form-check form-switch mb-3">
                            <input
                                    checked
                                    class="form-check-input"
                                    id="sendMailSwitch"
                                    name="sendMail"
                                    role="switch"
                                    type="checkbox"
                            />
                            <label class="form-check-label" for="sendMailSwitch">Send reset password email</label>
                        </div>

                        <div class="mb-3">
                            <div class="form-check form-check-inline">
                                <input
                                        bind:group={role}
                                        class="form-check-input"
                                        id="roleUserRadio"
                                        name="role"
                                        type="radio"
                                        value="user"
                                />
                                <label class="form-check-label" for="roleUserRadio">User</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input
                                        bind:group={role}
                                        class="form-check-input"
                                        id="roleEditorRadio"
                                        name="role"
                                        type="radio"
                                        value="editorc"
                                />
                                <label class="form-check-label" for="roleEditorRadio">Editor</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input
                                        bind:group={role}
                                        class="form-check-input"
                                        id="roleAdminRadio"
                                        name="role"
                                        type="radio"
                                        value="admin"
                                />
                                <label class="form-check-label" for="roleAdminRadio">Admin</label>
                            </div>
                            {#if role === 'admin'}
                                <div class="alert alert-warning mt-3" role="alert">
                                    <AlertTriangleIcon class="me-3"/>
                                    You have opted for the Admin role.
                                </div>
                            {/if}
                        </div>

                        <div class="modal-footer">
                            <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Close</button>
                            <button class="btn btn-primary" data-bs-dismiss="modal" type="submit"
                            >Create user
                            </button
                            >
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
                <th scope="col">#</th>
                <th scope="col">Role</th>
                <th scope="col">Enabled</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th class="text-end" scope="col">Actions</th>
            </tr>
            </thead>
            <tbody class="table-group-divider">
            {#each data.users.data as user}
                <tr>
                    <th class="align-middle text-nowrap" scope="row">{user.uuid}</th>
                    <td class="align-middle text-nowrap">{user.role}</td>
                    <td class="align-middle text-nowrap">{user.enabled}</td>
                    <td class="align-middle text-nowrap">{user.name}</td>
                    <td class="align-middle text-nowrap">{user.email}</td>
                    <td class="d-flex justify-content-end">
                        <a
                                class="btn btn-action rounded-circle d-flex align-items-center justify-content-center"
                                role="button"
                                href="/profile/{user.uuid}"
                                target="_blank"
                        >
                            <div class="d-flex text-info">
                                <EyeIcon size="2x"/>
                            </div>
                        </a>

                        <Nfc
                                c="btn btn-action rounded-circle d-flex align-items-center justify-content-center"
                                profileUrl="{`${PUBLIC_BASE_URL}/profile/${user.uuid}?source=nfc`}"
                        >
                            <div class="d-flex text-success">
                                <CreditCardIcon size="2x"/>
                            </div>
                        </Nfc>

                        <div class="btn-group">
                            <button type="button" class="btn btn-action rounded-circle" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                <div class="d-flex align-items-center justify-content-center text-secondary">
                                    <MoreVerticalIcon size="2x"/>
                                </div>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a role="button" href="/admin/edit?uuid={user.uuid}" class="dropdown-item"
                                       type="button">
                                    <Edit2Icon size="1x" class="me-2"/>
                                    Edit</a>
                                </li>
                                <li>
                                    <form action="?/send" method="POST" use:enhance={save}>
                                        <input type="text" value={user.uuid} name="uuid" hidden/>
                                        <button class="dropdown-item" type="submit">
                                            <SendIcon size="1x" class="me-2"/>
                                            Send mail
                                        </button>
                                    </form>
                                </li>
                                <li>
                                    <button
                                            data-bs-toggle="modal"
                                            data-bs-target="#{user.uuid}Modal" class="dropdown-item" type="button">
                                        <TrashIcon size="1x" class="me-2"/>
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <!-- Modal -->
                        <div
                                class="modal fade"
                                id="{user.uuid}Modal"
                                tabindex="-1"
                                aria-labelledby="{user.uuid}ModalLabel"
                                aria-hidden="true"
                        >
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="{user.uuid}ModalLabel">Modal title</h1>
                                        <button
                                                type="button"
                                                class="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                        />
                                    </div>
                                    <div class="modal-body">
                                        Are you sure, that you want to delete <strong>{user.name}</strong>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                        >No
                                        </button>
                                        <button type="button" class="btn btn-primary">Yes</button>
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

    <button
            class="btn btn-action rounded-circle d-flex align-items-center justify-content-center px-4 float-button z-0"
            data-bs-content="btn"
            data-bs-placement="top"
            data-bs-target="#createUserModal"
            data-bs-toggle="modal"
    >
        <div class="d-flex text-light bg-primary bubble">
            <UserPlusIcon size="2x"/>
        </div>
    </button>

    <!--
    <div class="alert alert-primary" role="alert">A simple primary alert—check it out!</div>
    <div class="alert alert-secondary" role="alert">A simple secondary alert—check it out!</div>
    <div class="alert alert-success" role="alert">A simple success alert—check it out!</div>
    <div class="alert alert-danger" role="alert">A simple danger alert—check it out!</div>
    <div class="alert alert-warning" role="alert">A simple warning alert—check it out!</div>
    <div class="alert alert-info" role="alert">A simple info alert—check it out!</div>
    <div class="alert alert-light" role="alert">A simple light alert—check it out!</div>
    <div class="alert alert-dark" role="alert">A simple dark alert—check it out!</div>
    -->
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
