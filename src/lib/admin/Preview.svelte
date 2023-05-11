<!-- <meta name="format-detection" content="telephone=no"> -->

<script>
	import MobileView from '$lib/front/MobileView.svelte';
	import BusinessCard from '$lib/front/BusinessCard.svelte';

	export let vCardOptions;

	export let themeOptions;

	export let logo;
</script>

<MobileView>
	<BusinessCard {vCardOptions} {themeOptions} {logo} />
</MobileView>
