<script>
  import AdminMain from '$lib/layout/AdminMain.svelte';
  import { displaySuccess, displayWarning } from '../../../../js/toast.js';
  import { enhance } from '$app/forms';
  import DisplayPreview from '$lib/vCard/DisplayPreview.svelte';
  import Switch from '$lib/forms/Switch.svelte';
  import ColorInput from '$lib/forms/ColorInput.svelte';
  import UploadFile from '$lib/forms/UploadFile.svelte';
  import RangeInput from '$lib/forms/RangeInput.svelte';
  import Heading from '$lib/layout/Heading.svelte';
  import Button from '$lib/forms/Button.svelte';
  import AlignSelect from '$lib/forms/AlignSelect.svelte';

  export let data;

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
        displayWarning('Something went wrong. Please try again.');
      }

      isLoading = false;
    };
  };

  const vCard = data.vCards.data;

  export let theme = data.theme.data;

  let logoPreview;
</script>

<svelte:head>
    <title>Edit theme</title>
    <meta content="Edit theme"/>
</svelte:head>

<AdminMain>
    <Heading border="true" size="h2" tag="h1">Edit theme</Heading>
    <div class="row">
        <div class="col-lg-8">
            <form action="?/save" method="POST" use:enhance={save}>
                <Heading size="h4" tag="h4">Colors</Heading>
                <ColorInput
                        bind:value={theme.color.font.primary}
                        id="fontInput"
                        label="Font color"
                        name="fontColor"
                />
                <ColorInput
                        bind:value={theme.color.background}
                        id="backgroundColorInput"
                        label="Background color"
                        name="backgroundColor"
                />
                <ColorInput
                        bind:value={theme.color.font.secondary}
                        id="secondaryFontInput"
                        label="Secondary font color"
                        name="secondaryFontColor"
                />
                <ColorInput
                        bind:value={theme.color.socialIcons.font}
                        id="socialIconFontColorInput"
                        label="Social icon font color"
                        name="socialIconFontColor"
                />
                <ColorInput
                        bind:value={theme.color.socialIcons.background}
                        id="socialIconBackgroundColorInput"
                        label="Social icon background color"
                        name="socialIconBackgroundColor"
                />
                <ColorInput
                        bind:value={theme.color.contactIcons.font}
                        id="contactIconFontColorInput"
                        label="Contact icon font color"
                        name="contactIconFontColor"
                />
                <ColorInput
                        bind:value={theme.color.contactIcons.background}
                        id="contactIconBackgroundColorInput"
                        label="Contact icon background color"
                        name="contactIconBackgroundColor"
                />
                <ColorInput
                        bind:value={theme.color.vCardBtn.font}
                        id="btnFontColorInput"
                        label="Button font color"
                        name="btnFontColor"
                />
                <ColorInput
                        bind:value={theme.color.vCardBtn.background}
                        id="btnBackgroundColorInput"
                        label="Button background color"
                        name="btnBackgroundColor"
                />
                <Heading size="h4" tag="h4">Align content</Heading>
                <AlignSelect
                        bind:value={theme.align.logo}
                        id="floatingSelectAlignLogo"
                        label="Align logo"
                        name="alignLogo"
                />
                <AlignSelect
                        bind:value={theme.align.avatar}
                        id="floatingSelectAlignAvatar"
                        label="Align avatar"
                        name="alignAvatar"
                />
                <AlignSelect
                        bind:value={theme.align.heading}
                        id="floatingSelectAlignHeading"
                        label="Align heading"
                        name="alignHeading"
                />
                <AlignSelect
                        bind:value={theme.align.bio}
                        id="floatingSelectAlignBio"
                        label="Align bio"
                        name="alignBio"
                />
                <AlignSelect
                        bind:value={theme.align.socialIcons}
                        id="floatingSelectAlignSocialIcons"
                        label="Align social icons"
                        name="alignSocialIcons"
                />
                <Heading size="h4" tag="h4">Contact information</Heading>
                <Switch
                        bind:checked={theme.display.logo}
                        id="displayLogo"
                        label="Display logo"
                        name="displayLogo"
                />
                <Switch
                        bind:checked={theme.display.phone}
                        id="displayPhone"
                        label="Display phone"
                        name="displayPhone"
                />
                <Switch
                        bind:checked={theme.display.sms}
                        id="displaySms"
                        label="Display sms"
                        name="displaySms"
                />
                <Switch
                        bind:checked={theme.display.email}
                        id="displayEmail"
                        label="Display email"
                        name="displayEmail"
                />
                <Switch
                        bind:checked={theme.display.web}
                        id="displayWeb"
                        label="Display web"
                        name="displayWeb"
                />
                <Switch
                        bind:checked={theme.display.address}
                        id="displayAddress"
                        label="Display address"
                        name="displayAddress"
                />
                <Heading size="h4" tag="h4">Map</Heading>
                <Switch
                        bind:checked={theme.display.map}
                        id="displayMap"
                        label="Display map"
                        name="displayMap"
                />
                <Heading size="h4" tag="h4">Contact button</Heading>
                <Switch
                        bind:checked={theme.display.vCardBtn}
                        id="displayContactBtn"
                        label="Display contact button"
                        name="displayContactBtn"
                />
                <Heading size="h4" tag="h4">Logo</Heading>
                <RangeInput bind:value="{theme.logo.size.height}" displayName="Size" max="80" min="20"
                            name="logoHeight"/>
                <Button {isLoading}>Save</Button>
            </form>
            <Heading border="true" size="h2" tag="h2">Images</Heading>
            <Heading size="h4" tag="h4">Upload logo</Heading>
            <UploadFile bind:file={logoPreview} imageHeight="80" imageName="logo"/>
        </div>
    </div>
    <DisplayPreview {logoPreview} {theme} {vCard}/>
</AdminMain>
