<script>
  import AdminMain from '$lib/layout/AdminMain.svelte';
  import { displaySuccess } from '../../../js/toast.js';
  import { enhance } from '$app/forms';
  import DisplayPreview from '$lib/vCard/DisplayPreview.svelte';
  import Switch from '$lib/forms/Switch.svelte';
  import ColorInput from '$lib/forms/ColorInput.svelte';
  import UploadFile from '$lib/forms/UploadFile.svelte';
  import TextInput from '$lib/forms/TextInput.svelte';
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

      if (result.type === 'success') {
        displaySuccess('Successfully saved!');
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
                        bind:value={theme.fontColor}
                        id="fontInput"
                        label="Font color"
                        name="fontColor"
                />
                <ColorInput
                        bind:value={theme.backgroundColor}
                        id="backgroundColorInput"
                        label="Background color"
                        name="backgroundColor"
                />
                <ColorInput
                        bind:value={theme.secondaryFontColor}
                        id="secondaryFontInput"
                        label="Secondary font color"
                        name="secondaryFontColor"
                />
                <ColorInput
                        bind:value={theme.socialIconFontColor}
                        id="socialIconFontColorInput"
                        label="Social icon font color"
                        name="socialIconFontColor"
                />
                <ColorInput
                        bind:value={theme.socialIconBackgroundColor}
                        id="socialIconBackgroundColorInput"
                        label="Social icon background color"
                        name="socialIconBackgroundColor"
                />
                <ColorInput
                        bind:value={theme.btnFontColor}
                        id="btnFontColorInput"
                        label="Button font color"
                        name="btnFontColor"
                />
                <ColorInput
                        bind:value={theme.btnBackgroundColor}
                        id="btnBackgroundColorInput"
                        label="Button background color"
                        name="btnBackgroundColor"
                />
                <Heading size="h4" tag="h4">Contact information</Heading>
                <Switch
                        bind:checked={theme.displayPhone}
                        id="displayPhone"
                        label="Display phone"
                        name="displayPhone"
                />
                <Switch
                        bind:checked={theme.displaySms}
                        id="displaySms"
                        label="Display sms"
                        name="displaySms"
                />
                <Switch
                        bind:checked={theme.displayEmail}
                        id="displayEmail"
                        label="Display email"
                        name="displayEmail"
                />
                <Switch
                        bind:checked={theme.displayWeb}
                        id="displayWeb"
                        label="Display web"
                        name="displayWeb"
                />
                <Switch
                        bind:checked={theme.displayAddress}
                        id="displayAddress"
                        label="Display address"
                        name="displayAddress"
                />
                <Heading size="h4" tag="h4">Map</Heading>
                <Switch
                        bind:checked={theme.displayMap}
                        id="displayMap"
                        label="Display map"
                        name="displayMap"
                />
                <Heading size="h4" tag="h4">Contact button</Heading>
                <Switch
                        bind:checked={theme.displayContactBtn}
                        id="displayContactBtn"
                        label="Display contact button"
                        name="displayContactBtn"
                />
                <TextInput bind:value="{theme.buttonText}" displayName="Button text" name="buttonText"/>
                <Heading size="h4" tag="h4">Logo</Heading>
                <RangeInput bind:value="{theme.logoHeight}" displayName="Size" max="50" min="10"
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
