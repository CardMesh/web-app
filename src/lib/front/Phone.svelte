<script>
	import { allCountries } from 'country-telephone-data';

	const sortedCountries = [...allCountries]
		.filter(
			(country, index, self) => index === self.findIndex((c) => c.dialCode === country.dialCode)
		)
		.sort((a, b) => a.dialCode - b.dialCode);

	export let countryCode = '';
	export let number = '';
	export let extension = '';
</script>

<div class="input-group mb-3">
	<div class="form-floating narrow">
		<select bind:value={countryCode} class="form-select" id="countryCodeSelect" name="countryCode">
			{#each sortedCountries as country}
				<option value={country.dialCode}>+{country.dialCode}</option>
			{/each}
		</select>
		<label for="countryCodeSelect">Country</label>
	</div>

	<div class="form-floating">
		<input
			bind:value={number}
			class="form-control"
			id="numberInput"
			name="number"
			placeholder="Enter phone number"
			type="tel"
		/>
		<label for="numberInput">Number</label>
	</div>

	<div class="form-floating narrow">
		<input
			bind:value={extension}
			class="form-control"
			id="phoneExtInput"
			name="extension"
			placeholder="Enter extension (if any)"
			type="tel"
		/>
		<label for="phoneExtInput">Extension</label>
	</div>
</div>

<style>
	.narrow {
		max-width: 25%;
	}
</style>
