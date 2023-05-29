<script>
  export let timeZone;

  let timezones = Intl.supportedValuesOf('timeZone');

  let currentTimezone =
    timeZone ? timeZone : Intl.DateTimeFormat()
      .resolvedOptions().timeZone;
</script>

<div class="form-floating mb-3">
    <select class="form-select" id="floatingSelect" name="timeZone">
        {#each timezones as timezone}
            <option value={timezone} selected={timezone === currentTimezone}>{timezone}</option>
        {/each}
    </select>
    <label for="floatingSelect">Time zone</label>
</div>
