<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let map;
	let marker;
	let leaflet;
	let customMarkerIcon;

	const createCustomMarkerIcon = () =>
		new L.Icon({
			iconUrl: '/images/marker-icon.png',
			iconRetinaUrl: '/images/marker-icon-2x.png',
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34]
		});

	export let latitude;
	export let longitude;

	onMount(async () => {
		// Dynamically import the Leaflet library
		leaflet = await import('leaflet');

		// Create the map and set the view
		map = leaflet.map('map').setView([latitude, longitude], 11);

		// Add the OpenStreetMap tile layer
		leaflet
			.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
			})
			.addTo(map);

		// Create a custom marker icon
		customMarkerIcon = createCustomMarkerIcon();

		// Add a marker
		marker = leaflet.marker([latitude, longitude], { icon: customMarkerIcon }).addTo(map);
	});

	$: {
		if (map && marker && leaflet) {
			map.setView([latitude, longitude], 11);
			marker.setLatLng([latitude, longitude]);
		}
	}
</script>

<div id="map" />

<style>
	@import 'leaflet/dist/leaflet.css';

	#map {
		height: 200px;
	}
</style>
