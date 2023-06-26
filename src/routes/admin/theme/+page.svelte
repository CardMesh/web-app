<script>
  import AdminMain from '$lib/layout/AdminMain.svelte';
  import { displaySuccess, displayWarning } from '../../../js/toast.js';
  import { enhance } from '$app/forms';
  import DisplayPreview from '$lib/vCard/DisplayPreview.svelte';
  import Switch from '$lib/forms/Switch.svelte';
  import ColorInput from '$lib/forms/ColorInput.svelte';
  import UploadFile from '$lib/forms/UploadFile.svelte';
  import RangeInput from '$lib/forms/RangeInput.svelte';
  import Heading from '$lib/layout/Heading.svelte';
  import Button from '$lib/forms/Button.svelte';

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
        displayWarning('Something went wrong. Please try again.')
      }

      isLoading = false;
    };
  };

  let vCard = data.vCards.data;

  export let theme = data.theme.data;

  let logo;
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
                <Heading size="h4" tag="h4">Contact information</Heading>
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
                <RangeInput bind:value="{theme.logo.height}" displayName="Size" max="50" min="10"
                            name="logoHeight"/>
                <Button {isLoading}>Save</Button>
            </form>
            <Heading border="true" size="h2" tag="h2">Images</Heading>
            <Heading size="h4" tag="h4">Upload logo</Heading>
            <UploadFile bind:logo imageHeight="50" imageName="logo"/>
        </div>
    </div>
    <DisplayPreview {logo} {theme} {vCard}/>
</AdminMain>
