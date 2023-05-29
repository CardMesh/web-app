<script>
  import MobileView from '$lib/vCard/views/MobileView.svelte';
  import BusinessCard from '$lib/vCard/BusinessCard.svelte';

  export let vCardOptions;

  export let themeOptions;

  export let logo;
</script>

<MobileView>
    <BusinessCard {logo} {themeOptions} {vCardOptions}/>
</MobileView>
