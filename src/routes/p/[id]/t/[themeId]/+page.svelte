<script>
  import BusinessCard from '$lib/vCard/BusinessCard.svelte';
  import ProductionView from '$lib/vCard/views/ProductionView.svelte';
  import SvelteSeo from 'svelte-seo';

  export let data;

  const vCard = data.vCard.data;

  const theme = data.theme.data;

  const title = `${vCard.person.firstName} ${vCard.person.lastName}`;
  const description = `${vCard.person.firstName} ${vCard.person.lastName}\'s personal business card.`;
</script>

<SvelteSeo
        description="{description}"
        openGraph={{
    title: title,
    description: description,
    image: vCard?.avatar?.format.webp || '',
    type: "website",
    images: [
      {
        url: vCard?.avatar?.format.webp || '',
        width: vCard?.avatar?.size?.width || '',
        height: vCard?.avatar?.size?.height || '',
        alt: `${vCard?.person?.firstName || ''} ${vCard?.person?.lastName || ''}`,
      },
    ],
    site_name: `${vCard?.person?.firstName || ''} ${vCard?.person?.lastName || ''}`,
  }}
        title="{title}"
/>

<ProductionView>
    <BusinessCard {theme} {vCard} view="prod"/>
</ProductionView>

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
