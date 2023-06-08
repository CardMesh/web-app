<script>
  import { onMount } from 'svelte';

  let map;
  let marker;
  let leaflet;
  let customMarkerIcon;

  const createCustomMarkerIcon = () =>
    new L.DivIcon({
      className: 'custom-marker-icon',
      html: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
      iconAnchor: [20, 44]
    });

  export let latitude;

  export let longitude;

  onMount(async () => {
    try {
      // Dynamically import the Leaflet library
      leaflet = await import('leaflet');

      // Create the map and set the view
      map = leaflet.map('map')
        .setView([latitude, longitude], 11);

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
      marker = leaflet.marker([latitude, longitude], { icon: customMarkerIcon })
        .addTo(map);
    } catch (error) {
      // Nothing
    }
  });

  $: {
    if (map && marker && leaflet && latitude && longitude) {
      map.setView([latitude, longitude], 11);
      marker.setLatLng([latitude, longitude]);
    }
  }
</script>

<div id="map"></div>

<style>
    @import 'leaflet/dist/leaflet.css';

    #map {
        height: 200px;
    }
</style>
