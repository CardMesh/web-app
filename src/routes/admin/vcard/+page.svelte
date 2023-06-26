<script>
  import AdminMain from '$lib/layout/AdminMain.svelte';
  import { enhance } from '$app/forms';
  import { displaySuccess, displayWarning } from '../../../js/toast.js';
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
  import UploadFile from '$lib/forms/UploadFile.svelte';

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

  export let vCard = data.vCard.data;

  export let theme = data.theme.data;

  let isLoading = false;
  const save = () => {
    isLoading = true;
    return async ({
      update,
      result
    }) => {
      await update({ reset: false });

      if (result.data.success) {
        displaySuccess('Successfully saved!');
      } else {
        displayWarning('Something went wrong. Please try again.')
      }

      isLoading = false;
    };
  };

  let avatar;
</script>

<AdminMain>
    <Heading border="true" size="h2" tag="h1">Edit vCard</Heading>
    <div class="row">
        <div class="col-lg-8">
            <form action="?/save{uuid ? `&uuid=${uuid}` : ''}" method="POST" use:enhance={save}>
                <TextInput bind:value={vCard.person.firstName} displayName="First Name"
                           name="firstName"></TextInput>
                <TextInput bind:value={vCard.person.middleName} displayName="Middle Name"
                           name="middleName"></TextInput>
                <TextInput bind:value={vCard.person.lastName} displayName="Last Name" name="lastName"></TextInput>
                <TextInput bind:value={vCard.professional.role} displayName="Role" name="role"></TextInput>
                <TextInput bind:value={vCard.professional.title} displayName="Title" name="title"></TextInput>
                <TextInput bind:value={vCard.person.suffix} displayName="Suffix" name="suffix"></TextInput>
                <TextInput bind:value={vCard.personal.pronouns} displayName="Pronouns"
                           name="pronouns"></TextInput>
                <TextInput bind:value={vCard.professional.company} displayName="Company"
                           name="company"></TextInput>
                <TextareaInput bind:value={vCard.professional.bio} displayName="Bio" name="bio"/>
                <PhoneInput
                        bind:countryCode={vCard.contact.phone.countryCode}
                        bind:extension={vCard.contact.phone.extension}
                        bind:number={vCard.contact.phone.number}
                />
                <EmailInput bind:value={vCard.contact.email} displayName="Email" name="email"></EmailInput>
                <TextInput bind:value={vCard.location.street} displayName="Street" name="street"></TextInput>
                <TextInput bind:value="{vCard.location.storey}" displayName="Storey" name="storey"/>
                <TextInput bind:value="{vCard.location.postalCode}" displayName="Postal Code" name="postalCode"/>
                <TextInput bind:value="{vCard.location.city}" displayName="City" name="city"/>
                <TextInput bind:value="{vCard.location.state}" displayName="State" name="state"/>
                <TextInput bind:value="{vCard.location.country}" displayName="Country" name="country"/>
                <TimeZoneSelect timeZone="{vCard.location.timeZone}"/>
                <CoordinatesInput bind:city="{vCard.location.city}"
                                  bind:country="{vCard.location.country}"
                                  bind:latitude="{vCard.location.coordinates.latitude}"
                                  bind:longitude="{vCard.location.coordinates.longitude}"
                                  bind:postalCode="{vCard.location.postalCode}"
                                  bind:street="{vCard.location.street}"/>
                <TextInput bind:value="{vCard.contact.web}" displayName="Web" name="web"></TextInput>
                <DateInput bind:value="{vCard.personal.birthday}" displayName="Birthday" name="birthday"/>
                <SocialIconTextInput
                        bind:value={vCard.socialMedia.twitter}
                        id="twitterInput"
                        label="Twitter link"
                        name="twitter"
                        network="twitter"
                />
                <SocialIconTextInput
                        bind:value={vCard.socialMedia.facebook}
                        id="facebookInput"
                        label="Facebook link"
                        name="facebook"
                        network="facebook"
                />
                <SocialIconTextInput
                        bind:value={vCard.socialMedia.linkedin}
                        id="linkedinInput"
                        label="LinkedIn link"
                        name="linkedin"
                        network="linkedin"
                />
                <SocialIconTextInput
                        bind:value={vCard.socialMedia.instagram}
                        id="instagramInput"
                        label="Instagram link"
                        name="instagram"
                        network="instagram"
                />
                <SocialIconTextInput
                        bind:value={vCard.socialMedia.pinterest}
                        id="pinterestInput"
                        label="Pinterest link"
                        name="pinterest"
                        network="pinterest"
                />
                <SocialIconTextInput
                        bind:value={vCard.socialMedia.github}
                        id="githubInput"
                        label="Github link"
                        name="github"
                        network="github"
                />
                <Button {isLoading}>Save</Button>
            </form>

            <Heading border="true" size="h2" tag="h2">Images</Heading>
            <Heading size="h4" tag="h4">Upload avatar</Heading>
            <UploadFile bind:logo="{avatar}" imageHeight="130" imageName="avatar"/> <!-- rename logo- -->
        </div>

        <DisplayPreview {avatar} {theme} {vCard}/>
    </div>
</AdminMain>

<svelte:head>
    <title>Edit vCard</title>
    <meta content="Edit vCard"/>
</svelte:head>
