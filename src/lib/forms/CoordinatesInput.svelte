<script>
  import { displayError, displaySuccess, displayWarning } from '../../js/toast.js';

  export let vCard;

  const updateCoordinates = async () => {
    const address = [
      vCard.location.street,
      vCard.location.postalCode,
      vCard.location.city,
      vCard.location.country
    ];

    let formattedAddress = address
      .join(' ')
      .replace(/[^\p{L}\p{N}\s]/gu, '')
      .replace(/\s/g, '+')
      .toLowerCase(); // TODO reuse

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
    vCard.location.coordinates.latitude = coordinates[0].lat;
    vCard.location.coordinates.longitude = coordinates[0].lon;
  };
</script>

<div class="input-group mb-3">
    <div class="form-floating">
        <input
                bind:value={vCard.location.coordinates.latitude}
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
                bind:value={vCard.location.coordinates.longitude}
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