<script>
  import { displaySuccess, displayWarning } from '../../js/toast.js';
  import { enhance } from '$app/forms';
  import Button from '$lib/forms/Button.svelte';

  let fileInput;
  let selectedFile;

  export let logo;

  export let imageHeight;

  export let imageName;

  let isLoading = false;

  const onFileSelected = (e) => {
    selectedFile = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = (e) => {
      logo = e.target.result;
    };
  };

  const save = () => {
    isLoading = true;
    return async ({
      update,
      result
    }) => {
      await update({ reset: false });

      if (result.data.success) {
        displaySuccess('Successfully uploaded!');
      } else {
        displayWarning('Something went wrong. Please try again.');
      }

      isLoading = false;
    };
  };
</script>

<form action="?/uploadLogo" method="POST" use:enhance={save}> <!-- todo: rename to uploadImage -->
    <div class="mb-3">
        <input
                accept=".jpg, .jpeg, .png"
                bind:this={fileInput}
                class="form-control"
                name="image"
                on:change={(e) => onFileSelected(e)}
                type="file"
        />
        <small>Accepts .jpg, .jpeg, .png</small>
    </div>

    <input hidden name="imageHeight" value="{imageHeight}"/>
    <input hidden name="imageName" value="{imageName}"/>

    <Button {isLoading}>Upload image</Button>
</form>
