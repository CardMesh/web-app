<!-- <meta name="format-detection" content="telephone=no"> -->

<script>
	import BusinessCard from '$lib/front/BusinessCard.svelte';
	import ProductionView from '$lib/front/ProductionView.svelte';

	export let data;
	const vCardOptions = data.vCards.data;

	export let options = {
		...vCardOptions
	};
</script>

<ProductionView>
	<BusinessCard {options} view="prod" />
</ProductionView>
