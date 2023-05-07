<script>
	import Map from '$lib/front/Map.svelte';
	import { UserPlusIcon } from 'svelte-feather-icons';
	import Divider from '$lib/front/Divider.svelte';
	import VCardButton from '$lib/front/VCard.svelte';

	export let data;
</script>

<svelte:head>
	<title>About</title>
	<meta content="About this app" name="description" /> <!-- TODO -->
</svelte:head>

<div class="container rounded-3 bg-light overflow-hidden">
	<img
		alt="My Logo"
		class="position-relative"
		src="https://kea.dk/images/resources/logo-small.png"
		style="top: 15px; left: 15px; max-width: 60px; max-height: 60px;"
	/>

	<Divider />

	<div class="row">
		<div class="col">
			<div class="card h-100 overflow-hidden">
				<Map />
			</div>
		</div>
	</div>

	<Divider />

	<div class="row fixed-bottom-custom p-0">
		<VCardButton c="btn btn-primary w-100 rounded-0 py-2">
			<UserPlusIcon size="1x" />
			Add to contacts
		</VCardButton>
	</div>
</div>

<style lang="scss">
	$container-max-width: 500px;

	.container {
		max-width: $container-max-width;

		// Add margin to the top if the container width is less than 500px
		@media (min-width: $container-max-width) {
			margin-top: 50px;
		}
	}

	@media (max-width: $container-max-width) {
		.fixed-bottom-custom {
			position: fixed;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 1030;
		}
	}
</style>
