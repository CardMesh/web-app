<script>
  import AdminMain from '$lib/layout/AdminMain.svelte';
  import { enhance } from '$app/forms';
  import { displaySuccess } from '../../../js/toast.js';
  import { browser } from '$app/environment';
  import DisplayPreview from '$lib/vCard/DisplayPreview.svelte';
  import SocialIconTextInput from '$lib/forms/SocialIconTextInput.svelte';
  import PhoneInput from '$lib/forms/PhoneInput.svelte';
  import CoordinatesInput from '$lib/forms/CoordinatesInput.svelte';
  import TextInput from '$lib/forms/TextInput.svelte';
  import TimeZoneSelect from '$lib/forms/TimeZoneSelect.svelte';
  import DateInput from '$lib/forms/DateInput.svelte';
  import EmailInput from '$lib/forms/EmailInput.svelte';
  import TextareaInput from '$lib/forms/TextareaInput.svelte';
  import Heading from '$lib/layout/Heading.svelte';
  import Button from '$lib/forms/Button.svelte';

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
</script>

<AdminMain>
    <Heading size="h2" tag="h1">Edit</Heading>
    <div class="row">
        <div class="col-lg-8">
            <form action="?/save{uuid ? `&uuid=${uuid}` : ''}" method="POST" use:enhance={save}>
                <TextInput bind:value={vCardOptions.name.firstName} displayName="First Name"
                           name="firstName"></TextInput>
                <TextInput bind:value={vCardOptions.name.middleName} displayName="Middle Name"
                           name="middleName"></TextInput>
                <TextInput bind:value={vCardOptions.name.lastName} displayName="Last Name" name="lastName"></TextInput>
                <TextInput bind:value={vCardOptions.professional.role} displayName="Role" name="role"></TextInput>
                <TextInput bind:value={vCardOptions.professional.title} displayName="Title" name="title"></TextInput>
                <TextInput bind:value={vCardOptions.name.suffix} displayName="Suffix" name="suffix"></TextInput>
                <TextInput bind:value={vCardOptions.personal.pronouns} displayName="Pronouns"
                           name="pronouns"></TextInput>
                <TextInput bind:value={vCardOptions.professional.company} displayName="Company"
                           name="company"></TextInput>
                <TextareaInput bind:value={vCardOptions.professional.bio} displayName="Bio" name="bio"/>
                <PhoneInput
                        bind:countryCode={vCardOptions.contact.phone.countryCode}
                        bind:extension={vCardOptions.contact.phone.extension}
                        bind:number={vCardOptions.contact.phone.number}
                />
                <EmailInput bind:value={vCardOptions.contact.email} displayName="Email" name="email"></EmailInput>
                <TextInput bind:value={vCardOptions.location.street} displayName="Street" name="street"></TextInput>
                <TextInput bind:value="{vCardOptions.location.storey}" displayName="Storey" name="storey"/>
                <TextInput bind:value="{vCardOptions.location.postalCode}" displayName="Postal Code" name="postalCode"/>
                <TextInput bind:value="{vCardOptions.location.city}" displayName="City" name="city"/>
                <TextInput bind:value="{vCardOptions.location.state}" displayName="State" name="state"/>
                <TextInput bind:value="{vCardOptions.location.country}" displayName="Country" name="country"/>
                <TimeZoneSelect timeZone="{vCardOptions.location.timeZone}"/>
                <CoordinatesInput {vCardOptions}/>
                <TextInput bind:value="{vCardOptions.contact.web}" displayName="Web" name="web"></TextInput>
                <DateInput bind:value="{vCardOptions.personal.birthday}" displayName="Birthday" name="birthday"/>
                <SocialIconTextInput
                        bind:value={vCardOptions.socialMedia.twitter}
                        id="twitterInput"
                        label="Twitter link"
                        name="twitter"
                        network="twitter"
                />
                <SocialIconTextInput
                        bind:value={vCardOptions.socialMedia.facebook}
                        id="facebookInput"
                        label="Facebook link"
                        name="facebook"
                        network="facebook"
                />
                <SocialIconTextInput
                        bind:value={vCardOptions.socialMedia.linkedin}
                        id="linkedinInput"
                        label="LinkedIn link"
                        name="linkedin"
                        network="linkedin"
                />
                <SocialIconTextInput
                        bind:value={vCardOptions.socialMedia.instagram}
                        id="instagramInput"
                        label="Instagram link"
                        name="instagram"
                        network="instagram"
                />
                <SocialIconTextInput
                        bind:value={vCardOptions.socialMedia.pinterest}
                        id="pinterestInput"
                        label="Pinterest link"
                        name="pinterest"
                        network="pinterest"
                />
                <SocialIconTextInput
                        bind:value={vCardOptions.socialMedia.github}
                        id="githubInput"
                        label="Github link"
                        name="github"
                        network="github"
                />
                <Button {isLoading}>Save</Button>
            </form>
        </div>
        <DisplayPreview {themeOptions} {vCardOptions}/> <!-- TODO logo is missing -->
    </div>
</AdminMain>

<svelte:head>
    <title>Edit</title>
    <meta content="Edit"/>
</svelte:head>
