<script>
	import AdminMain from '$lib/admin/AdminMain.svelte';
	import { displaySuccess } from '../../../js/toast.js';
	import { enhance } from '$app/forms';
	import DisplayPreview from '$lib/preview/DisplayPreview.svelte';
	import Switch from '$lib/common/Switch.svelte';
	import ColorInput from '$lib/common/ColorInput.svelte';
	import SocialIconTextInput from '$lib/common/SocialIconTextInput.svelte';
	import UploadFile from '$lib/common/UploadFile.svelte';

	export let data;

	let isLoading = false;
	const save = () => {
		isLoading = true;
		return async ({ update, result }) => {
			await update({ reset: false });

			if (result.type === 'success') {
				displaySuccess('Successfully saved!');
			}

			isLoading = false;
		};
	};

	// TODO WIP
	let vCardOptions = {
		firstName: 'John',
		lastName: 'Doe',
		title: 'Full stack web develoopoer',
		pronouns: 'hi/him',
		company: 'KEA',
		bio: 'Full-stack web developer. 💻 I love IT Security. I believe in sharing knowledge, tools and value open source software development. 🚀',
		phone: '21750080',
		email: 'mathias@reker.dk',
		web: 'http://reker.dk',
		street: 'Guldstjernevej 4, 2. th',
		state: '',
		city: 'København NV',
		postalCode: '2400',
		country: 'Denmark',
		_id: '645b3a5ab0530fac10c0ea8f'
	};

	export let themeOptions = data.theme.data[0];

	let logo;
</script>

<svelte:head>
	<title>Users</title>
	<meta content="Users" />
</svelte:head>

<AdminMain>
	<div
		class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
	>
		<h1 class="h2">Themes</h1>
	</div>

	<div class="row">
		<div class="col-8">
			<form action="?/save" method="POST" use:enhance={save}>
				<div
					class="scrollspy-example-2"
					data-bs-smooth-scroll="true"
					data-bs-spy="scroll"
					data-bs-target="#navbar-example3"
					tabindex="0"
				>
					<div id="item-1">
						<h4 class="pb-3">General</h4>
						<ColorInput
							bind:value={themeOptions.fontColor}/>
							id="fontInput"
							label="Font color"
							name="fontColor"
						/>
						<ColorInput
								bind:value={themeOptions.secondaryFontColor}
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
					</div>

					<div id="item-2">
						<h4 class="pb-3 pt-3">Social Icons</h4>
						<SocialIconTextInput
							bind:value={themeOptions.twitter}
							id="twitterInput"
							label="Twitter link"
							name="twitter"
							network="twitter"
						/>
						<SocialIconTextInput
							bind:value={themeOptions.facebook}
							id="facebookInput"
							label="Facebook link"
							name="facebook"
							network="facebook"
						/>
						<SocialIconTextInput
							bind:value={themeOptions.linkedin}
							id="linkedinInput"
							label="LinkedIn link"
							name="linkedin"
							network="linkedin"
						/>
						<SocialIconTextInput
							bind:value={themeOptions.instagram}
							id="instagramInput"
							label="Instagram link"
							name="instagram"
							network="instagram"
						/>
						<SocialIconTextInput
							bind:value={themeOptions.pinterest}
							id="pinterestInput"
							label="Pinterest link"
							name="pinterest"
							network="pinterest"
						/>
					</div>

					<div id="item-3">
						<h4 class="pb-3 pt-3">Contact information</h4>
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
					</div>

					<div id="item-4">
						<h4 class="pb-3 pt-3">Map</h4>
						<Switch
							bind:checked={themeOptions.displayMap}
							id="displayMap"
							label="Display map"
							name="displayMap"
						/>
					</div>

					<div id="item-5">
						<h4 class="pb-3 pt-3">Contact button</h4>
						<Switch
							bind:checked={themeOptions.displayContactBtn}
							id="displayContactBtn"
							label="Display contact button"
							name="displayContactBtn"
						/>
					</div>
				</div>

				<div id="item-6">
					<h4 class="pb-3 pt-3">Logo</h4>
					<label for="logoHeightRange" class="form-label">Logo size</label>
					<input type="range" class="form-range" min="10" max="50" id="logoHeightRange" name="logoHeight" bind:value={themeOptions.logoHeight}>
				</div>

				<div class="d-grid gap-2 mb-5 pt-3">
					<button class="btn btn-primary btn-lg" disabled={isLoading} type="submit">
						{#if isLoading}
							<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
						{:else}
							Save
						{/if}
					</button>
				</div>

			</form>

			<div id="item-7">
				<h4 class="pb-3 pt-3">Logo</h4>
				<UploadFile bind:logo />
			</div>
		</div>
	</div>

	<DisplayPreview {logo} {themeOptions} {vCardOptions} />
	<!-- <form ref='uploadForm'
           id='uploadForm'
           action='http://localhost:8080/api/themes/upload'
           method='post'
           encType="multipart/form-data">
         <input type="file" name="sampleFile" />
         <input type='submit' value='Upload!' />
     </form> -->
	<!--
    <div class="alert alert-primary" role="alert">A simple primary alert—check it out!</div>
    <div class="alert alert-secondary" role="alert">A simple secondary alert—check it out!</div>
    <div class="alert alert-success" role="alert">A simple success alert—check it out!</div>
    <div class="alert alert-danger" role="alert">A simple danger alert—check it out!</div>
    <div class="alert alert-warning" role="alert">A simple warning alert—check it out!</div>
    <div class="alert alert-info" role="alert">A simple info alert—check it out!</div>
    <div class="alert alert-light" role="alert">A simple light alert—check it out!</div>
    <div class="alert alert-dark" role="alert">A simple dark alert—check it out!</div>
    -->
</AdminMain>
