<script>
  import { displayError, displaySuccess, displayWarning } from '../../js/toast.js';

  export let street;

  export let postalCode;

  export let city;

  export let country;

  export let latitude;

  export let longitude;

  const updateCoordinates = async () => {
    const address = [
      street,
      postalCode,
      city,
      country
    ];

    const formattedAddress = address
      .join(' ')
      .replace(/[^\p{L}\p{N}\s]/gu, '')
      .replace(/\s/g, '+')
      .toLowerCase();

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${formattedAddress}`
    );

    if (!response.ok) {
      displayError('Failed to connect.');
      return;
    }

    const coordinates = await response.json();

    if (coordinates.length === 0) {
      displayWarning('No coordinates found.');
      return;
    }

    displaySuccess('Coordinates updated');
    latitude = coordinates[0].lat;
    longitude = coordinates[0].lon;
  };
</script>

<div class="input-group mb-3">
    <div class="form-floating">
        <input
                bind:value={latitude}
                class="form-control"
                id="latitudeInput"
                name="latitude"
                placeholder=""
                type="text"
        />
        <label for="latitudeInput">Latitude</label>
    </div>

    <div class="form-floating">
        <input
                bind:value={longitude}
                class="form-control"
                id="longitudeInput"
                name="longitude"
                placeholder=""
                type="text"
        />
        <label for="longitudeInput">Longitude</label>
    </div>

    <button class="btn btn-primary" on:click|preventDefault={updateCoordinates} type="button">Update</button>
</div>