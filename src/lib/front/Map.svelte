<script>
	import { onMount } from 'svelte';

	onMount(async () => {
		const leaflet = await import('leaflet');

		const map = leaflet.map('map').setView([55.6761, 12.5683], 13);

		// Add the OpenStreetMap tile layer
		leaflet
			.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
			})
			.addTo(map);

		// Add a marker at the center of the map
		leaflet.marker([55.6761, 12.5683]).addTo(map);
	});
</script>

<div id="map" />

<style lang="scss">
	@import 'node_modules/leaflet/dist/leaflet.css';
	/* Set the height of the map container */
	#map {
		height: 200px;
	}
</style>
