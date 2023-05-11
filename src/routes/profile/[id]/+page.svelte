<!-- <meta name="format-detection" content="telephone=no"> -->

<script>
	import BusinessCard from '$lib/front/BusinessCard.svelte';
	import ProductionView from '$lib/front/ProductionView.svelte';

	export let data;
	const vCardOptions = data.vCardOptions.data;

	export let themeOptions = data.theme.data[0]; // TODO remove?
</script>

<ProductionView>
	<BusinessCard {vCardOptions} {themeOptions} view="prod" />
</ProductionView>

<svelte:head>
	<title>{`${vCardOptions.firstName} ${vCardOptions.lastName} - Personal Profile`}</title>
	<meta
		content="`Discover ${vCardOptions.firstName} ${vCardOptions.lastName}'s personal business card, including contact information, social media profiles, and a brief bio. Connect with ${vCardOptions.firstName} and learn more about their background.`"
		name="description"
	/>
</svelte:head>
