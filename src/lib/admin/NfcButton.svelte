<script>
  import { displayError, displaySuccess, displayWarning } from '../../js/toast.js';

  export let profileUrl = '';

  let isLoading = false;
  let isNfcWritten = false;

  const writeTag = async () => {
    if ('NDEFReader' in window) {
      isLoading = true;
      const ndef = new NDEFReader();
      try {
        await ndef.write({ records: [{ recordType: 'url', data: profileUrl }] });
        displaySuccess('NFC tag written!');
        isNfcWritten = true;
        isLoading = false;
      } catch (error) {
        displayError(error);
        isNfcWritten = false;
        isLoading = false;
      }
    } else {
      displayWarning('Web NFC is not supported.');
      isNfcWritten = false;
    }
  };
</script>

<button class="btn btn-primary" on:click={writeTag} disabled="{isNfcWritten}">
    {#if isLoading}
        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/>
    {:else}
        Write NFC tag
    {/if}
</button>
