<script>
	import AdminMain from '$lib/admin/AdminMain.svelte';
	import Preview from '$lib/admin/Preview.svelte';

	// get from database...
	let options = {
		firstName: 'John',
		lastName: 'Doe',
		title: 'Full-stack Web Developer',
		pronouns: 'he/him',
		company: 'KEA',
		bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod sapien vitae odio ullamcorper, non blandit neque fermentum.',
		phone: '(555) 123-4567',
		cell: '(555) 123-4567',
		email: 'johndoe@example.com',
		web: 'https://example.dk',
		street: '123 Main Street',
		state: 'Apt. 4B',
		city: 'Anytown',
		postalCode: '12345',
		country: 'USA',
		timeZone: 'Europe/Copenhagen',
		gender: 'M',
		birthday: '1992-10-09'
	};

	// when done write the whole options obj to db...
</script>

<AdminMain>
	<div
		class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
	>
		<h1 class="h2">Table</h1>
	</div>

	<div class="row">
		<div class="col-8">
			<form>
				<div class="form-floating mb-3">
					<input
						bind:value={options.firstName}
						class="form-control"
						id="firstNameInput"
						placeholder=""
						type="text"
					/>
					<label for="firstNameInput">First Name</label>
				</div>
				<div class="form-floating mb-3">
					<input
						bind:value={options.lastName}
						class="form-control"
						id="lastNameInput"
						placeholder=""
						type="text"
					/>
					<label for="lastNameInput">Last Name</label>
				</div>
				<div class="form-floating mb-3">
					<input
						bind:value={options.title}
						class="form-control"
						id="titleInput"
						placeholder=""
						type="text"
					/>
					<label for="titleInput">Title</label>
				</div>
				<div class="form-floating mb-3">
					<input
						bind:value={options.pronouns}
						class="form-control"
						id="pronounsInput"
						placeholder=""
						type="text"
					/>
					<label for="pronounsInput">Pronouns</label>
				</div>
				<div class="form-floating mb-3">
					<input
						bind:value={options.company}
						class="form-control"
						id="companyInput"
						placeholder=""
						type="text"
					/>
					<label for="companyInput">Company</label>
				</div>
				<div class="form-floating mb-3">
					<textarea
						bind:value={options.bio}
						class="form-control"
						id="bioTextarea"
						placeholder=""
						style="height: 100px"
						type="text"
					/>
					<label for="bioTextarea">Bio</label>
				</div>
				<div class="form-floating mb-3">
					<input
						bind:value={options.phone}
						class="form-control"
						id="phoneInput"
						placeholder=""
						type="tel"
					/>
					<label for="phoneInput">Phone</label>
				</div>
				<div class="form-floating mb-3">
					<input
						bind:value={options.email}
						class="form-control"
						id="emailInput"
						placeholder=""
						type="email"
					/>
					<label for="emailInput">Email</label>
				</div>
				<div class="form-floating mb-3">
					<input
						bind:value={options.web}
						class="form-control"
						id="webInput"
						placeholder=""
						type="text"
					/>
					<label for="webInput">Web</label>
				</div>
				<div class="form-floating mb-3">
					<input
						bind:value={options.street}
						class="form-control"
						id="streetInput"
						placeholder=""
						type="text"
					/>
					<label for="streetInput">Street</label>
				</div>
				<div class="form-floating mb-3">
					<input
						bind:value={options.state}
						class="form-control"
						id="stateInput"
						placeholder=""
						type="text"
					/>
					<label for="stateInput">State</label>
				</div>
				<div class="form-floating mb-3">
					<input
						bind:value={options.postalCode}
						class="form-control"
						id="postalCodeInput"
						placeholder=""
						type="text"
					/>
					<label for="postalCodeInput">Postal Code</label>
				</div>
				<div class="form-floating mb-3">
					<input
						bind:value={options.city}
						class="form-control"
						id="cityInput"
						placeholder=""
						type="text"
					/>
					<label for="cityInput">City</label>
				</div>
				<div class="form-floating mb-3">
					<input
						bind:value={options.country}
						class="form-control"
						id="countryInput"
						placeholder=""
						type="text"
					/>
					<label for="countryInput">Country</label>
				</div>

				<button class="btn btn-primary" type="submit">Save</button>
			</form>
		</div>

		<div class="col-4 ms-auto fixed-bottom-custom">
			<Preview {options} />
		</div>
	</div>
</AdminMain>

<style>
	.fixed-bottom-custom {
		position: fixed;
		right: 10px;
		bottom: 50px;
		z-index: 1030;
	}
</style>
