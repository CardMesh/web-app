<script>
  import AdminMain from '$lib/admin/AdminMain.svelte';
  import Preview from '$lib/admin/Preview.svelte';
  import { enhance } from '$app/forms';
  import { displaySuccess } from '../../../js/toast.js';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  let uuid;
  $: if (browser) {
    uuid = getUUID();
  }

  function getUUID() {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    return searchParams.get('uuid');
  }

  export let data;
  export let options = { ...data.vCards.data };
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

  let isMounted = false;
  let screenWidth = false;

  onMount(() => {
    const handleResize = () => {
      screenWidth = window.innerWidth;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    isMounted = true;
  });
</script>

<AdminMain>
    <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
        <h1 class="h2">Edit</h1>
    </div>

    <div class="row">
        <div class="col-lg-8">
            <form action="?/save{uuid ? `&uuid=${uuid}` : ''}" method="POST" use:enhance={save}>
                <div class="form-floating mb-3">
                    <input
                            bind:value={options.firstName}
                            class="form-control"
                            id="firstNameInput"
                            name="firstName"
                            placeholder=""
                            type="text"
                    />
                    <label for="firstNameInput">First Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                            bind:value={options.lastName}
                            class="form-control"
                            id="lastNameInput"
                            name="lastName"
                            placeholder=""
                            type="text"
                    />
                    <label for="lastNameInput">Last Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                            bind:value={options.title}
                            class="form-control"
                            id="titleInput"
                            name="title"
                            placeholder=""
                            type="text"
                    />
                    <label for="titleInput">Title</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                            bind:value={options.pronouns}
                            class="form-control"
                            id="pronounsInput"
                            name="pronouns"
                            placeholder=""
                            type="text"
                    />
                    <label for="pronounsInput">Pronouns</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                            bind:value={options.company}
                            class="form-control"
                            id="companyInput"
                            name="company"
                            placeholder=""
                            type="text"
                    />
                    <label for="companyInput">Company</label>
                </div>
                <div class="form-floating mb-3">
					<textarea
                            bind:value={options.bio}
                            class="form-control"
                            id="bioTextarea"
                            name="bio"
                            placeholder=""
                            style="height: 100px"
                            type="text"
                    />
                    <label for="bioTextarea">Bio</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                            bind:value={options.phone}
                            class="form-control"
                            id="phoneInput"
                            name="phone"
                            placeholder=""
                            type="tel"
                    />
                    <label for="phoneInput">Phone</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                            bind:value={options.email}
                            class="form-control"
                            id="emailInput"
                            name="email"
                            placeholder=""
                            type="email"
                    />
                    <label for="emailInput">Email</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                            bind:value={options.web}
                            class="form-control"
                            id="webInput"
                            name="web"
                            placeholder=""
                            type="text"
                    />
                    <label for="webInput">Web</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                            bind:value={options.street}
                            class="form-control"
                            id="streetInput"
                            name="street"
                            placeholder=""
                            type="text"
                    />
                    <label for="streetInput">Street</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                            bind:value={options.state}
                            class="form-control"
                            id="stateInput"
                            name="state"
                            placeholder=""
                            type="text"
                    />
                    <label for="stateInput">State</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                            bind:value={options.postalCode}
                            class="form-control"
                            id="postalCodeInput"
                            name="postalCode"
                            placeholder=""
                            type="text"
                    />
                    <label for="postalCodeInput">Postal Code</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                            bind:value={options.city}
                            class="form-control"
                            id="cityInput"
                            name="city"
                            placeholder=""
                            type="text"
                    />
                    <label for="cityInput">City</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                            bind:value={options.country}
                            class="form-control"
                            id="countryInput"
                            name="country"
                            placeholder=""
                            type="text"
                    />
                    <label for="countryInput">Country</label>
                </div>

                <div class="d-grid gap-2 mb-5">
                    <button class="btn btn-primary btn-lg" disabled={isLoading} type="submit">
                        {#if isLoading}
                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/>
                        {:else}
                            Save
                        {/if}
                    </button>
                </div>
            </form>
        </div>
        {#if isMounted}
            <div class="d-flex flex-nowrap">
                {#if screenWidth >= 992}
                    <div class="col-4 ms-auto float-preview">
                        <Preview {options}/>
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</AdminMain>

<style>
    .float-preview {
        position: fixed;
        right: 0;
        bottom: 50%;
        transform: translateY(50%);
        z-index: 1030;
    }
</style>
