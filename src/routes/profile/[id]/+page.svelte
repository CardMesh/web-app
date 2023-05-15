<!-- <meta name="format-detection" content="telephone=no"> -->

<script>
	import BusinessCard from '$lib/front/BusinessCard.svelte';
	import ProductionView from '$lib/front/ProductionView.svelte';

	export let data;
	const vCardOptions = data.vCardOptions.data;

	export let themeOptions = data.theme.data[0]; // TODO remove?

	export let logo;
</script>

<ProductionView>
	<BusinessCard {vCardOptions} {themeOptions} {logo} view="prod" />
</ProductionView>

<svelte:head>
	<title>{`${vCardOptions.name.firstName} ${vCardOptions.name.lastName} - Personal Profile`}</title>
	<meta
		content="`Discover ${vCardOptions.name.firstName} ${vCardOptions.name
			.lastName}'s personal business card, including contact information, social media profiles, and a brief bio. Connect with ${vCardOptions
			.name.firstName} and learn more about their background.`"
		name="description"
	/>
</svelte:head>
