<script>
  import AdminMain from '$lib/layout/AdminMain.svelte';
  import {
    AlertTriangleIcon,
    CreditCardIcon,
    Edit2Icon,
    EyeIcon,
    MoreVerticalIcon,
    SendIcon,
    TrashIcon,
    UserIcon,
    UserPlusIcon,
  } from 'svelte-feather-icons';
  import { displaySuccess, displayWarning } from '../../../js/toast.js';
  import { enhance } from '$app/forms';
  import Nfc from '$lib/nfc/Nfc.svelte';
  import { PUBLIC_BASE_URL } from '$env/static/public';
  import SearchInput from '$lib/forms/SearchInput.svelte';
  import Heading from '$lib/layout/Heading.svelte';
  import Pagination from '$lib/pagination/Pagination.svelte';
  import TextInput from '$lib/forms/TextInput.svelte';
  import EmailInput from '$lib/forms/EmailInput.svelte';
  import Cookies from 'js-cookie';

  export let data;

  const userId = JSON.parse(Cookies.get('userId') || '{}').data?.userId;

  let isLoading = false;

  const send = () => {
    isLoading = true;
    return async ({
      update,
      result
    }) => {
      await update({ reset: false });

      if (result.data.success) {
        displaySuccess('User successfully created!');
      } else {
        displayWarning('Something went wrong. Please try again.');
      }

      isLoading = false;
    };
  };

  const updateUser = () => {
    isLoading = true;
    return async ({
      update,
      result
    }) => {
      await update({ reset: false });

      if (result.data.success) {
        displaySuccess('Successfully updated!');
      } else {
        displayWarning('Something went wrong. Please try again.');
      }

      isLoading = false;
    };
  };

  const deleteUser = () => {
    isLoading = true;
    return async ({
      update,
      result
    }) => {
      await update({ reset: false });

      if (result.data.success) {
        displaySuccess('Successfully deleted!');
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
      prevPage,
    } = data.users.pagination;

    pagination = {
      page,
      totalPages,
      limit,
      nextPage,
      prevPage,
    };
  }

  let searchQuery = '';

  let searchInput;
</script>

<svelte:head>
    <title>Users</title>
    <meta content="Users"/>
</svelte:head>

<AdminMain>
    <Heading border="true" size="h2" tag="h1">Users</Heading>

    <SearchInput bind:searchQuery={searchQuery} name="Search" {searchInput}></SearchInput>

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
                    <h4 class="modal-title" id="createUserModalLabel">Create user</h4>
                    <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
                </div>
                <div class="modal-body">
                    <form action="?/create" method="POST" use:enhance={send}>
                        <TextInput displayName="Name" name="name"></TextInput>
                        <EmailInput displayName="Email" name="email"></EmailInput>

                        <div class="form-floating mb-3"> <!-- todo: move to component? -->
                            <select aria-label="Select theme" class="form-select" id="floatingSelectTheme"
                                    name="themeId">
                                {#each data.themes.data as theme}
                                    <option value="{theme.themeId}">{theme.name}</option>
                                {/each}
                            </select>
                            <label for="floatingSelectTheme">Theme</label>
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
                                        checked
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
                                        class="form-check-input"
                                        id="roleEditorRadio"
                                        name="role"
                                        type="radio"
                                        value="editor"
                                />
                                <label class="form-check-label" for="roleEditorRadio">Editor</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input
                                        class="form-check-input"
                                        id="roleAdminRadio"
                                        name="role"
                                        on:click={() => displayWarning('Warning: You have opted for the Admin role.')}
                                        type="radio"
                                        value="admin"
                                />
                                <label class="form-check-label" for="roleAdminRadio">Admin</label>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Close</button>
                            <button class="btn btn-primary" data-bs-dismiss="modal" type="submit"
                            >Create user
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
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th class="text-end" scope="col">Actions</th>
            </tr>
            </thead>
            <tbody class="table-group-divider">
            {#each data.users.data as user}
                <tr>
                    <td class="align-middle text-nowrap">{user.name}</td>
                    <td class="align-middle text-nowrap">{user.email}</td>
                    <td class="align-middle text-nowrap">{user.role}</td>
                    <td class="d-flex justify-content-end">
                        <a
                                class="btn btn-action rounded-circle d-flex align-items-center justify-content-center"
                                role="button"
                                href="/p/{user.userId}/t/{user.themeId}"
                                target="_blank"
                        >
                            <div class="d-flex text-info">
                                <EyeIcon size="2x"/>
                            </div>
                        </a>

                        <Nfc
                                className="btn btn-action rounded-circle d-flex align-items-center justify-content-center"
                                profileUrl="{`${PUBLIC_BASE_URL}/p/${user.userId}/t/${user.themeId}?source=nfc`}"
                        >
                            <div class="d-flex text-success">
                                <CreditCardIcon size="2x"/>
                            </div>
                        </Nfc>

                        <div class="btn-group">
                            <button type="button" class="btn btn-action rounded-circle" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                <span class="d-flex align-items-center justify-content-center text-secondary">
                                    <MoreVerticalIcon size="2x"/>
                                </span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li>
                                    <a role="button" href="/admin/vcard?userId={user.userId}&themeId={user.themeId}"
                                       class="dropdown-item"
                                       type="button">
                                        <Edit2Icon size="1x" class="me-2"/>
                                        Edit vCard
                                    </a>
                                </li>
                                <li>
                                    <button
                                            data-bs-toggle="modal"
                                            data-bs-target="#{user.userId}EditProfileModal" class="dropdown-item"
                                            type="button">
                                        <UserIcon size="1x" class="me-2"/>
                                        Edit profile
                                    </button>
                                </li>
                                <li>
                                    <form action="?/send" method="POST" use:enhance={send}>
                                        <input type="text" value={user.userId} name="userId" hidden/>
                                        <button class="dropdown-item" type="submit">
                                            <SendIcon size="1x" class="me-2"/>
                                            Reset password
                                        </button>
                                    </form>
                                </li>
                                {#if userId !== user.userId}
                                    <li>
                                        <button
                                                data-bs-toggle="modal"
                                                data-bs-target="#{user.userId}EditVCardModal" class="dropdown-item"
                                                type="button">
                                            <TrashIcon size="1x" class="me-2"/>
                                            Delete
                                        </button>
                                    </li>
                                {/if}
                            </ul>
                        </div>

                        <div
                                class="modal fade"
                                id="{user.userId}EditVCardModal"
                                tabindex="-1"
                                aria-labelledby="{user.userId}EditVCardModalLabel"
                                aria-hidden="true"
                        >
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="{user.userId}EditVCardModalLabel">
                                            Delete {user.name}</h1>
                                        <button
                                                type="button"
                                                class="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        Are you sure, that you want to delete <strong>{user.name}</strong>
                                        <div class="alert alert-warning mt-3" role="alert">
                                            <AlertTriangleIcon class="me-3"/>
                                            This action cannot be undone.
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                            No
                                        </button>

                                        <form action="?/delete" method="POST" use:enhance={deleteUser}>
                                            <input type="text" value={user.userId} name="userId" hidden/>
                                            <button class="btn btn-primary" type="submit" data-bs-dismiss="modal">
                                                Yes, I am sure!
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                                class="modal fade"
                                id="{user.userId}EditProfileModal"
                                tabindex="-1"
                                aria-labelledby="{user.userId}EditProfileModalLabel"
                                aria-hidden="true"
                        >
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title" id="EditProfileModalLabel">
                                            Edit user
                                        </h4>
                                        <button aria-label="Close" class="btn-close" data-bs-dismiss="modal"
                                                type="button"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form action="?/updateUser" method="POST" use:enhance={updateUser}>
                                            <input type="text" name="userId" value="{user.userId}" hidden>
                                            <TextInput displayName="Name" name="name" value="{user.name}"></TextInput>
                                            <EmailInput displayName="Email" name="email"
                                                        value="{user.email}"></EmailInput>

                                            <div class="form-floating mb-3"> <!-- todo: move to component? -->
                                                <select aria-label="Select theme" class="form-select"
                                                        id="floatingEditTheme"
                                                        name="themeId">
                                                    {#each data.themes.data as theme}
                                                        <option value="{theme.themeId}"
                                                                selected={theme.themeId === user.themeId}>{theme.name}</option>
                                                    {/each}
                                                </select>
                                                <label for="floatingEditTheme">Theme</label>
                                            </div>

                                            <div class="mb-3">
                                                <div class="form-check form-check-inline">
                                                    <input
                                                            class="form-check-input"
                                                            id="{user.userId}editRoleUserRadio"
                                                            name="role"
                                                            type="radio"
                                                            value="user"
                                                            checked={user.role === 'user'}
                                                    />
                                                    <label class="form-check-label"
                                                           for="{user.userId}editRoleUserRadio">User</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input
                                                            class="form-check-input"
                                                            id="{user.userId}editRoleEditorRadio"
                                                            name="role"
                                                            type="radio"
                                                            value="editor"
                                                            checked={user.role === 'editor'}
                                                    />
                                                    <label class="form-check-label"
                                                           for="{user.userId}editRoleEditorRadio">Editor</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input
                                                            class="form-check-input"
                                                            id="{user.userId}editRoleAdminRadio"
                                                            name="role"
                                                            type="radio"
                                                            value="admin"
                                                            checked={user.role === 'admin'}
                                                            on:click={() => displayWarning('Warning: You have opted for the Admin role.')}
                                                    />
                                                    <label class="form-check-label"
                                                           for="{user.userId}editRoleAdminRadio">Admin</label>
                                                </div>
                                            </div>

                                            <div class="modal-footer">
                                                <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">
                                                    Close
                                                </button>
                                                <button class="btn btn-primary" data-bs-dismiss="modal" type="submit"
                                                >Update user
                                                </button>
                                            </div>
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
            data-bs-target="#createUserModal"
            data-bs-toggle="modal"
    >
        <span class="d-flex text-light bg-primary bubble">
            <UserPlusIcon size="2x"/>
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
