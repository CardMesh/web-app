<script>
	import { displaySuccess } from '../../js/toast.js';
	import { enhance } from '$app/forms';

	let fileinput;
	let selectedFile;

	export let logo;

	const onFileSelected = (e) => {
		selectedFile = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(selectedFile);
		reader.onload = (e) => {
			logo = e.target.result;
		};
	};

	const save = () => {
		return async ({ update, result }) => {
			await update({ reset: false });

			if (result.type === 'success') {
				displaySuccess('Successfully saved!');
			}
		};
	};
</script>

<form action="?/uploadLogo" method="POST" use:enhance={save}>
	<div class="mb-3">
		<input
			accept=".jpg, .jpeg, .png"
			bind:this={fileinput}
			class="form-control"
			id="formFile"
			name="file"
			on:change={(e) => onFileSelected(e)}
			type="file"
		/>
	</div>

	<input hidden name="height" value="50" />
	<input hidden name="name" value="logo" />

	<div class="d-grid gap-2 mb-5 pt-3">
		<button class="btn btn-primary btn-lg" type="submit">Upload image</button>
	</div>
</form>
