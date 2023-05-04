<!-- <meta name="format-detection" content="telephone=no"> -->

<script>
	import MobileView from '$lib/front/MobileView.svelte';
	import BusinessCard from '$lib/front/BusinessCard.svelte';

	export let options;
</script>

<MobileView>
	<BusinessCard {options} />
</MobileView>
