<script>
	import { displayError, displaySuccess, displayWarning } from '../../js/toast.js';
	import { isDisabled } from '../../js/nfcStore.js';

	export let profileUrl = '';

	let isLoading = false;

	const writeTag = async () => {
		if ('NDEFReader' in window) {
			isLoading = true;
			$isDisabled = true;
			const ndef = new NDEFReader();
			try {
				await ndef.write({ records: [{ recordType: 'url', data: profileUrl }] });
				displaySuccess('NFC tag written!');
				$isDisabled = true;
				isLoading = false;
			} catch (error) {
				displayError('Please try again.');
				$isDisabled = false;
				isLoading = false;
			}
		} else {
			displayWarning('Web NFC is not supported.');
			$isDisabled = true;
		}
	};
</script>

<button class="btn btn-primary" on:click={writeTag} disabled={$isDisabled}>
	{#if isLoading}
		Ready to write <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
	{:else}
		Write NFC tag
	{/if}
</button>
