<script>
  import AdminMain from '$lib/admin/AdminMain.svelte';
  import { enhance } from '$app/forms';
  import { displaySuccess } from '../../../js/toast.js';
  import { browser } from '$app/environment';
  import DisplayPreview from '$lib/preview/DisplayPreview.svelte';
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
  export let vCardOptions = { ...data.vCards.data };

  export let themeOptions = data.theme.data[0];

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

  let timezones = Intl.supportedValuesOf('timeZone');
  let currentTimezone = data.vCards.data.timeZone || Intl.DateTimeFormat()
    .resolvedOptions().timeZone;

  onMount(() => {
    data.vCards.data.language = data.vCards.data.language || navigator.language;
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
                            bind:value={vCardOptions.firstName}
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
                            bind:value={vCardOptions.middleName}
                            class="form-control"
                            id="middleNameInput"
                            name="middleName"
                            placeholder=""
                            type="text"
                    />
                    <label for="middleNameInput">Middle name</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                            bind:value={vCardOptions.lastName}
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
                            bind:value={vCardOptions.role}
                            class="form-control"
                            id="roleInput"
                            name="role"
                            placeholder=""
                            type="text"
                    />
                    <label for="roleInput">Role</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                            bind:value={vCardOptions.title}
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
                            bind:value={vCardOptions.suffix}
                            class="form-control"
                            id="suffixInput"
                            name="suffix"
                            placeholder=""
                            type="text"
                    />
                    <label for="titleInput">Suffix</label>
                </div>

                <div class="form-floating mb-3">
                    <input
                            bind:value={vCardOptions.pronouns}
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
                            bind:value={vCardOptions.company}
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
                            bind:value={vCardOptions.bio}
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
                            bind:value={vCardOptions.phone}
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
                            bind:value={vCardOptions.email}
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
                            bind:value={vCardOptions.web}
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
                            bind:value={vCardOptions.language}
                            class="form-control"
                            id="languageInput"
                            name="language"
                            placeholder=""
                            type="text"
                    />
                    <label for="webInput">Language</label>
                </div>

                <div class="form-floating mb-3">
                    <input
                            bind:value={vCardOptions.street}
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
                            bind:value={vCardOptions.state}
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
                            bind:value={vCardOptions.postalCode}
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
                            bind:value={vCardOptions.city}
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
                            bind:value={vCardOptions.country}
                            class="form-control"
                            id="countryInput"
                            name="country"
                            placeholder=""
                            type="text"
                    />
                    <label for="countryInput">Country</label>
                </div>

                <div class="form-floating mb-3">
                    <select class="form-select" id="floatingSelect" name="timeZone">
                        {#each timezones as timezone}
                            <option value={timezone} selected={timezone === currentTimezone}>{timezone}</option>
                        {/each}
                    </select>
                    <label for="floatingSelect">Time zone</label>
                </div>

                <div class="form-floating mb-3">
                    <input
                            bind:value={vCardOptions.latitude}
                            class="form-control"
                            id="latitudeInput"
                            name="latitude"
                            placeholder=""
                            type="text"
                    />
                    <label for="latitudeInput">Latitude</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                            bind:value={vCardOptions.longitude}
                            class="form-control"
                            id="longitudeInput"
                            name="longitude"
                            placeholder=""
                            type="text"
                    />
                    <label for="longitudeInput">Longitude</label>
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
        <DisplayPreview {themeOptions} {vCardOptions}/>
    </div>
</AdminMain>

<svelte:head>
    <title>Edit</title>
    <meta content="Edit"/>
</svelte:head>
