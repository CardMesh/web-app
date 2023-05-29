<script>
  import BusinessCard from '$lib/vCard/BusinessCard.svelte';
  import ProductionView from '$lib/vCard/views/ProductionView.svelte';

  export let data;
  const vCardOptions = data.vCardOptions.data;

  export let themeOptions = data.theme.data;

  export let logo;
</script>

<ProductionView>
    <BusinessCard {logo} {themeOptions} {vCardOptions} view="prod"/>
</ProductionView>

<svelte:head>
    <title>{`${vCardOptions.name.firstName} ${vCardOptions.name.lastName} - Personal Profile`}</title>
    <meta
            content="`Discover ${vCardOptions.name.firstName} ${vCardOptions.name
			.lastName}'s personal business card, including contact information, social media profiles, and a brief bio. Connect with ${vCardOptions
			.name.firstName} and learn more about their background.`"
            name="description"
    />
</svelte:head>

<style>
    :global(body) {
        background: linear-gradient(253deg, #9da89a, #f8f8f8);
        background-size: 300% 300%;
        -webkit-animation: Background 25s ease infinite;
        -moz-animation: Background 25s ease infinite;
        animation: Background 25s ease infinite;
    }

    @-webkit-keyframes Background {
        0% {
            background-position: 0 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0 50%;
        }
    }

    @-moz-keyframes Background {
        0% {
            background-position: 0 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0 50%;
        }
    }

    @keyframes Background {
        0% {
            background-position: 0 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0 50%;
        }
    }
</style>
