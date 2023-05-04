<script>
	import Sidebar from '$lib/admin/Sidebar.svelte';
	import NavbarTop from '$lib/admin/NavbarTop.svelte';
</script>

<main class="d-flex flex-nowrap">
	<Sidebar />

	<div class="custom-container">
		<NavbarTop />

		<div class="px-5">
			<slot />
		</div>
	</div>
</main>

<style>
	.custom-container {
		width: 100%;
	}
</style>
