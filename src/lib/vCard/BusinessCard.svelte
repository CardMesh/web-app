<script>
  import { GlobeIcon, MailIcon, MapPinIcon, MessageSquareIcon, PhoneIcon, UserPlusIcon } from 'svelte-feather-icons';
  import Divider from '$lib/layout/Divider.svelte';
  import VCardButton from '$lib/vCard/VCard.svelte';
  import Map from '$lib/maps/Map.svelte';
  import { PUBLIC_REST_API_URL } from '$env/static/public';
  import SocialIconLink from '$lib/forms/SocialIconLink.svelte';
  import IconLink from '$lib/layout/IconLink.svelte';

  export let view = 'demo';

  export let vCard;

  export let theme; // WIP

  export let logo = `${PUBLIC_REST_API_URL}/uploads/themes/${theme.themeId}/logo.webp`;

  export let avatar = `${PUBLIC_REST_API_URL}/uploads/users/${vCard.uuid}/avatar.webp`;

  let displayMode = view === 'demo' ? 'fixed-bottom-demo' : 'fixed-bottom-prod';

  let telLink;

  $: telLink = `${
    vCard.contact.phone.countryCode ? `+${vCard.contact.phone.countryCode}` : ''
  }${vCard.contact.phone.number}${
    vCard.contact.phone.extension ? `,${vCard.contact.phone.extension}` : ''
  }`;

  let formattedNumber;
  $: formattedNumber = `${
    vCard.contact.phone.countryCode ? `(+${vCard.contact.phone.countryCode})` : ''
  } ${vCard.contact.phone.number}`;

  const address = [
    vCard.location.street,
    vCard.location.postalCode,
    vCard.location.city,
    vCard.location.country
  ];

  const formattedAddress = address
    .join(' ')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s/g, '+');

  let addressLink;
  $: addressLink = 'https://www.google.com/maps/place/' + formattedAddress;
</script>

<div style="background-color: {theme.backgroundColor}">
    <div class="container">
        <img
                alt={vCard.professional.company}
                class="position-relative mt-2"
                src={logo}
                style="max-height: {theme.logoHeight}px"
        />

        <Divider/>

        <div class="d-flex justify-content-center align-items-center">
            <img
                    alt="{vCard.name.firstName} {vCard.name.lastName}"
                    class="rounded-circle"
                    height="130"
                    src="{avatar}"
                    width="130"
            />
        </div>

        <div class="text-center" style="color: {theme.secondaryFontColor}">
            <h1>{vCard.name.firstName} {vCard.name.lastName}</h1>
            <small><em>{vCard.personal.pronouns}</em></small>
            <p>{vCard.professional.role} {vCard.professional.bio}</p>
        </div>

        <SocialIconLink link={vCard.socialMedia.twitter} network="twitter"/>
        <SocialIconLink link={vCard.socialMedia.linkedin} network="linkedin"/>
        <SocialIconLink link={vCard.socialMedia.facebook} network="facebook"/>
        <SocialIconLink link={vCard.socialMedia.instagram} network="instagram"/>
        <SocialIconLink link={vCard.socialMedia.pinterest} network="pinterest"/>
        <SocialIconLink link={vCard.socialMedia.github} network="github"/>

        <Divider/>

        <ul class="list-unstyled m-0" style="color: {theme.fontColor}">
            {#if vCard.contact.phone.number.length !== 0}
                {#if theme.displayPhone || theme.displaySms}
                    <li class="d-flex align-middle pb-3">
                        {#if theme.displayPhone}
                            <IconLink
                                    href="tel:{telLink}"
                                    ariaLabel="Call {vCard.contact.phone.number}"
                                    backgroundColor="{theme.socialIconBackgroundColor}"
                                    fontColor="{theme.socialIconFontColor}"
                            >
                                <PhoneIcon size="1.2x"/>
                            </IconLink>
                        {/if}

                        {#if theme.displaySms}
                            <IconLink
                                    href="sms:+{vCard.contact.phone.countryCode}{vCard.contact.phone.number}"
                                    ariaLabel="Send SMS to {vCard.contact.phone.number}"
                                    backgroundColor="{theme.socialIconBackgroundColor}"
                                    fontColor="{theme.socialIconFontColor}"
                            >
                                <MessageSquareIcon size="1.2x"/>
                            </IconLink>
                        {/if}

                        <div class="d-flex flex-column my-auto">
                            <a href="tel:{telLink}">{formattedNumber}</a>
                        </div>
                    </li>
                {/if}
            {/if}

            {#if theme.displayEmail && vCard.contact.email.length !== 0}
                <li class="d-flex align-middle pb-3">
                    <IconLink
                            href="mailto:{vCard.contact.email}"
                            ariaLabel="Email {vCard.contact.email}"
                            backgroundColor="{theme.socialIconBackgroundColor}"
                            fontColor="{theme.socialIconFontColor}"
                    >
                        <MailIcon size="1.2x"/>
                    </IconLink>

                    <div class="d-flex flex-column my-auto">
                        <a href="mailto:{vCard.contact.email}">{vCard.contact.email}</a>
                    </div>
                </li>
            {/if}

            {#if theme.displayWeb && vCard.contact.web.length !== 0}
                <li class="d-flex align-middle pb-3">
                    <IconLink
                            href="{vCard.contact.web}"
                            ariaLabel="Visit {vCard.contact.web}"
                            backgroundColor="{theme.socialIconBackgroundColor}"
                            fontColor="{theme.socialIconFontColor}"
                    >
                        <GlobeIcon size="1.2x"/>
                    </IconLink>

                    <div class="d-flex flex-column my-auto">
                        <a href={vCard.contact.web} target="_blank">{vCard.contact.web}</a>
                    </div>
                </li>
            {/if}

            {#if theme.displayAddress}
                {#if vCard.location.street.length !== 0 || vCard.location.postalCode.length !== 0 || vCard.location.city.length !== 0 || vCard.location.state.length !== 0}
                    <li class="d-flex align-middle pb-3">
                        <IconLink
                                href="{addressLink}"
                                ariaLabel="View location on Google Maps"
                                backgroundColor="{theme.socialIconBackgroundColor}"
                                fontColor="{theme.socialIconFontColor}"
                        >
                            <MapPinIcon size="1.2x"/>
                        </IconLink>

                        <a href="{addressLink}" target="_blank">
                            <div class="d-flex flex-column my-auto">
                                {vCard.location.street}{vCard.location.storey
                              ? ', ' + vCard.location.storey
                              : ''}
                                <span>{vCard.location.postalCode} {vCard.location.city}{vCard.location.state ? `, ${vCard.location.state}` : ''}</span>
                                <span>{vCard.location.country}</span>
                            </div>
                        </a>
                    </li>
                {/if}
            {/if}

            <Divider/>

            {#if theme.displayMap && vCard.location.coordinates.latitude.length !== 0 && vCard.location.coordinates.longitude.length !== 0}
                <div class="card overflow-hidden">
                    <Map
                            latitude={vCard.location.coordinates.latitude}
                            longitude={vCard.location.coordinates.longitude}
                    />
                </div>
            {/if}
        </ul>
    </div>

    <div style="padding-top: 30px"></div>

    {#if theme.displayContactBtn}
        <div class="{displayMode} p-0" style="z-index: 1000">
            <VCardButton
                    className="btn w-100 rounded-0 py-3"
                    {vCard}
                    backgroundColor={theme.btnBackgroundColor}
                    color={theme.btnFontColor}
            >
                <UserPlusIcon size="1x"/>
                {theme.buttonText}
            </VCardButton>
        </div>
    {/if}
</div>

<style lang="scss">
  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  .fixed-bottom-demo {
    position: sticky;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 500px) {
    .fixed-bottom-prod {
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1030;
    }
  }

  .text-secondary {
    color: grey !important;
  }
</style>
