<script>
  import { displayError, displaySuccess, displayWarning } from '../../js/toast.js';

  export let profileUrl = '';

  let isNfcWritten = false;

  const writeTag = async () => {
    if ('NDEFReader' in window) {
      const ndef = new NDEFReader();
      try {
        await ndef.write({ records: [{ recordType: 'url', data: profileUrl }] });
        displaySuccess('NFC tag written!');
        isNfcWritten = true;
      } catch (error) {
        displayError(error);
      }
    } else {
      displayWarning('Web NFC is not supported.');
    }
  };
</script>

<button class="btn btn-primary" on:click={writeTag} disabled="{isNfcWritten}">Write NFC tag</button>
