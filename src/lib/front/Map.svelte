<script>
  import { onMount } from 'svelte';

  const createCustomMarkerIcon = () => new L.Icon({
    iconUrl: '/images/marker-icon.png',
    iconRetinaUrl: '/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  export let coordinates = {};

  onMount(async () => {
    // Dynamically import the Leaflet library
    const leaflet = await import('leaflet');

    // Create the map and set the view
    const map = leaflet.map('map')
      .setView([coordinates.latitude, coordinates.longitude], 13);

    // Add the OpenStreetMap tile layer
    leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      })
      .addTo(map);

    // Create a custom marker icon
    const customMarkerIcon = createCustomMarkerIcon();

    // Add a marker
    leaflet.marker([coordinates.latitude, coordinates.longitude], { icon: customMarkerIcon })
      .addTo(map);
  });
</script>

<div id="map"></div>

<style>
    @import 'leaflet/dist/leaflet.css';

    #map {
        height: 200px;
    }
</style>
