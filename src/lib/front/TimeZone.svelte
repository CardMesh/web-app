<script>
	import moment from 'moment-timezone';

	const timezones = moment.tz.names();
	let selectedTimezone = '';

	const changeTimezone = (event) => {
		selectedTimezone = event.target.value;
		console.log(`Selected timezone: ${selectedTimezone}`);
	};
</script>

<select on:change={changeTimezone}>
	{#each timezones as timezone}
		<option value={timezone}>{timezone}</option>
	{/each}
</select>
