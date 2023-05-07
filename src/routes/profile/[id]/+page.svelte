<!-- <meta name="format-detection" content="telephone=no"> -->

<script>
  import BusinessCard from '$lib/front/BusinessCard.svelte';
  import ProductionView from '$lib/front/ProductionView.svelte';

  export let data;
  const vCardOptions = data.vCards.data;

  export let options = {
    ...vCardOptions
  };
</script>

<ProductionView>
    <BusinessCard {options} view="prod"/>
</ProductionView>

<svelte:head>
    <title>{`${options.firstName} ${options.lastName} - Personal Profile`}</title>
    <meta content="`Discover ${options.firstName} ${options.lastName}'s personal business card, including contact information, social media profiles, and a brief bio. Connect with ${options.firstName} and learn more about their background.`"
          name="description">
</svelte:head>
