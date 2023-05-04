<!-- <meta name="format-detection" content="telephone=no"> -->

<script>
	import BusinessCard from '$lib/front/BusinessCard.svelte';
	import ProductionView from '$lib/front/ProductionView.svelte';

	// TODO get data from database
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
</script>

<ProductionView>
	<BusinessCard view="prod" {options} />
</ProductionView>
