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

  let vCardOptions = data.vCards.data;

  export let themeOptions = data.theme.data;

  let logo;
</script>

<svelte:head>
    <title>Users</title>
    <meta content="Users"/>
</svelte:head>

<AdminMain>
    <Heading border="true" size="h2" tag="h1">Themes</Heading>
    <div class="row">
        <div class="col-lg-8">
            <form action="?/save" method="POST" use:enhance={save}>
                <Heading size="h4" tag="h4">General</Heading>
                <ColorInput
                        bind:value={themeOptions.fontColor}
                        id="fontInput"
                        label="Font color"
                        name="fontColor"
                />
                <ColorInput
                        bind:value={themeOptions.backgroundColor}
                        id="backgroundColorInput"
                        label="Background color"
                        name="backgroundColor"
                />
                <ColorInput
                        bind:value={themeOptions.secondaryFontColor}
                        id="secondaryFontInput"
                        label="Secondary font color"
                        name="secondaryFontColor"
                />
                <ColorInput
                        bind:value={themeOptions.socialIconFontColor}
                        id="socialIconFontColorInput"
                        label="Social icon font color"
                        name="socialIconFontColor"
                />
                <ColorInput
                        bind:value={themeOptions.socialIconBackgroundColor}
                        id="socialIconBackgroundColorInput"
                        label="Social icon background color"
                        name="socialIconBackgroundColor"
                />
                <ColorInput
                        bind:value={themeOptions.btnFontColor}
                        id="btnFontColorInput"
                        label="Button font color"
                        name="btnFontColor"
                />
                <ColorInput
                        bind:value={themeOptions.btnBackgroundColor}
                        id="btnBackgroundColorInput"
                        label="Button backgrund color"
                        name="btnBackgroundColor"
                />
                <Heading size="h4" tag="h4">Contact information</Heading>
                <Switch
                        bind:checked={themeOptions.displayPhone}
                        id="displayPhone"
                        label="Display phone"
                        name="displayPhone"
                />
                <Switch
                        bind:checked={themeOptions.displaySms}
                        id="displaySms"
                        label="Display sms"
                        name="displaySms"
                />
                <Switch
                        bind:checked={themeOptions.displayEmail}
                        id="displayEmail"
                        label="Display email"
                        name="displayEmail"
                />
                <Switch
                        bind:checked={themeOptions.displayWeb}
                        id="displayWeb"
                        label="Display web"
                        name="displayWeb"
                />
                <Switch
                        bind:checked={themeOptions.displayAddress}
                        id="displayAddress"
                        label="Display address"
                        name="displayAddress"
                />
                <Heading size="h4" tag="h4">Map</Heading>
                <Switch
                        bind:checked={themeOptions.displayMap}
                        id="displayMap"
                        label="Display map"
                        name="displayMap"
                />
                <Heading size="h4" tag="h4">Contact button</Heading>
                <Switch
                        bind:checked={themeOptions.displayContactBtn}
                        id="displayContactBtn"
                        label="Display contact button"
                        name="displayContactBtn"
                />
                <TextInput bind:value="{themeOptions.buttonText}" displayName="Button text" name="buttonText"/>
                <Heading size="h4" tag="h4">Logo</Heading>
                <RangeInput bind:value="{themeOptions.logoHeight}" displayName="Size" max="50" min="10"
                            name="logoHeight"/>
                 <Button {isLoading}>Save</Button>
            </form>
            <Heading border="true" size="h2" tag="h2">Images</Heading>
              <Heading tag="h4" size="h4">Upload logo</Heading>
            <UploadFile bind:logo/>
        </div>
    </div>
    <DisplayPreview {logo} {themeOptions} {vCardOptions}/>
</AdminMain>
