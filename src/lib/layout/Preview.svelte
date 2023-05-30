<script>
  import MobileView from '$lib/vCard/views/MobileView.svelte';
  import BusinessCard from '$lib/vCard/BusinessCard.svelte';

  export let vCard;

  export let theme;

  export let logo;

  export let avatar;
</script>

<MobileView>
    <BusinessCard {avatar} {logo} {theme} {vCard}/>
</MobileView>
