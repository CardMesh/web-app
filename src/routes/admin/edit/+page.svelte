<script>
  import AdminMain from '$lib/admin/AdminMain.svelte';
  import { enhance } from '$app/forms';
  import { displayError, displaySuccess, displayWarning } from '../../../js/toast.js';
  import { browser } from '$app/environment';
  import DisplayPreview from '$lib/preview/DisplayPreview.svelte';
  import SocialIconTextInput from '$lib/common/SocialIconTextInput.svelte';
  import Phone from '$lib/front/Phone.svelte';

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
  let currentTimezone =
    data.vCards.data.timeZone || Intl.DateTimeFormat()
      .resolvedOptions().timeZone;

  const updateCoordinates = async () => {
    const address = [
      vCardOptions.location.street,
      vCardOptions.location.postalCode,
      vCardOptions.location.city,
      vCardOptions.location.country
    ];

    let formattedAddress = address
      .join(' ')
      .replace(/[^\p{L}\p{N}\s]/gu, '')
      .replace(/\s/g, '+')
      .toLowerCase();

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${formattedAddress}`
    );

    if (!response.ok) {
      displayError('Failed to connect.')
      return;
    }

    const coordinates = await response.json();

    if (coordinates.length === 0) {
      displayWarning('No coornidates found.');
      return;
    }

    displaySuccess('Coordinates updated');
    vCardOptions.location.coordinates.latitude = coordinates[0].lat;
    vCardOptions.location.coordinates.longitude = coordinates[0].lon;
  };
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
                            bind:value={vCardOptions.name.firstName}
                            class="form-control"
                            id="firstNameInput"
                            name="firstName"
                            placeholder=""
                            required
                            type="text"
                    />
                    <label for="firstNameInput">First Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                            bind:value={vCardOptions.name.middleName}
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
                            bind:value={vCardOptions.name.lastName}
                            class="form-control"
                            id="lastNameInput"
                            name="lastName"
                            placeholder=""
                            required
                            type="text"
                    />
                    <label for="lastNameInput">Last Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                            bind:value={vCardOptions.professional.role}
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
                            bind:value={vCardOptions.professional.title}
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
                            bind:value={vCardOptions.name.suffix}
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
                            bind:value={vCardOptions.personal.pronouns}
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
                            bind:value={vCardOptions.professional.company}
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
                            bind:value={vCardOptions.professional.bio}
                            class="form-control"
                            id="bioTextarea"
                            name="bio"
                            placeholder=""
                            style="height: 100px"
                            type="text"
                    />
                    <label for="bioTextarea">Bio</label>
                </div>

                <Phone
                        bind:countryCode={vCardOptions.contact.phone.countryCode}
                        bind:extension={vCardOptions.contact.phone.extension}
                        bind:number={vCardOptions.contact.phone.number}
                />

                <div class="form-floating mb-3">
                    <input
                            bind:value={vCardOptions.contact.email}
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
                            bind:value={vCardOptions.location.street}
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
                            bind:value={vCardOptions.location.storey}
                            class="form-control"
                            id="storeyInput"
                            name="storey"
                            placeholder=""
                            type="text"
                    />
                    <label for="storeyInput">Storey</label>
                </div>

                <div class="form-floating mb-3">
                    <input
                            bind:value={vCardOptions.location.state}
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
                            bind:value={vCardOptions.location.postalCode}
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
                            bind:value={vCardOptions.location.city}
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
                            bind:value={vCardOptions.location.country}
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

                <div class="input-group mb-3">
                    <div class="form-floating">
                        <input
                                bind:value={vCardOptions.location.coordinates.latitude}
                                class="form-control"
                                id="latitudeInput"
                                name="latitude"
                                placeholder=""
                                type="text"
                        />
                        <label for="latitudeInput">Latitude</label>
                    </div>

                    <div class="form-floating">
                        <input
                                bind:value={vCardOptions.location.coordinates.longitude}
                                class="form-control"
                                id="longitudeInput"
                                name="longitude"
                                placeholder=""
                                type="text"
                        />
                        <label for="longitudeInput">Longitude</label>
                    </div>

                    <button
                            class="btn btn-outline-secondary"
                            on:click|preventDefault={updateCoordinates}
                            type="button"
                    >Update
                    </button>
                </div>

                <div class="form-floating mb-3">
                    <input
                            bind:value={vCardOptions.contact.web}
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
                            bind:value={vCardOptions.personal.birthday}
                            class="form-control"
                            id="birthdayInput"
                            name="birthday"
                            placeholder=""
                            type="date"
                    />
                    <label for="birthdayInput">Birthday</label>
                </div>

                <SocialIconTextInput
                        bind:value={vCardOptions.socialMedia.twitter}
                        id="twitterInput"
                        label="Twitter link"
                        name="twitter"
                        network="twitter"
                />
                <SocialIconTextInput
                        bind:value={vCardOptions.facebook}
                        id="facebookInput"
                        label="Facebook link"
                        name="facebook"
                        network="facebook"
                />
                <SocialIconTextInput
                        bind:value={vCardOptions.linkedin}
                        id="linkedinInput"
                        label="LinkedIn link"
                        name="linkedin"
                        network="linkedin"
                />
                <SocialIconTextInput
                        bind:value={vCardOptions.instagram}
                        id="instagramInput"
                        label="Instagram link"
                        name="instagram"
                        network="instagram"
                />
                <SocialIconTextInput
                        bind:value={vCardOptions.pinterest}
                        id="pinterestInput"
                        label="Pinterest link"
                        name="pinterest"
                        network="pinterest"
                />

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
