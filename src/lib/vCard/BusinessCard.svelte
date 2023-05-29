<script>
  import { GlobeIcon, MailIcon, MapPinIcon, MessageSquareIcon, UserPlusIcon, PhoneIcon } from 'svelte-feather-icons';
  import Divider from '$lib/layout/Divider.svelte';
  import VCardButton from '$lib/vCard/VCard.svelte';
  import Map from '$lib/maps/Map.svelte';
  import { PUBLIC_REST_API_URL } from '$env/static/public';
  import SocialIconLink from '$lib/forms/SocialIconLink.svelte';
  import IconLink from '$lib/layout/IconLink.svelte';

  export let view = 'demo';

  export let vCardOptions;

  export let themeOptions;

  export let logo = `${PUBLIC_REST_API_URL}/uploads/themes/${themeOptions.themeId}/logo.webp`;

  let displayMode = view === 'demo' ? 'fixed-bottom-demo' : 'fixed-bottom-prod';

  let telLink;

  $: telLink = `${
    vCardOptions.contact.phone.countryCode ? `+${vCardOptions.contact.phone.countryCode}` : ''
  }${vCardOptions.contact.phone.number}${
    vCardOptions.contact.phone.extension ? `,${vCardOptions.contact.phone.extension}` : ''
  }`;

  let formattedNumber;
  $: formattedNumber = `${
    vCardOptions.contact.phone.countryCode ? `(+${vCardOptions.contact.phone.countryCode})` : ''
  } ${vCardOptions.contact.phone.number}`;

  const address = [
    vCardOptions.location.street,
    vCardOptions.location.postalCode,
    vCardOptions.location.city,
  ];

  let addressLink;
  $: addressLink = 'https://www.google.com/maps/place/' + address.join('+');
</script>

<div style="background-color: {themeOptions.backgroundColor}">
    <div class="container">
        <img
                alt={vCardOptions.professional.company}
                class="position-relative mt-2"
                src={logo}
                style="max-height: {themeOptions.logoHeight}px"
        />

        <Divider/>

        <div class="d-flex justify-content-center align-items-center">
            <img
                    alt="My Image"
                    class="rounded-circle"
                    height="130"
                    src="https://avatars.githubusercontent.com/u/26626066"
                    width="130"
            />
        </div>

        <div class="text-center" style="color: {themeOptions.secondaryFontColor}">
            <h1>{vCardOptions.name.firstName} {vCardOptions.name.lastName}</h1>
            <small><em>{vCardOptions.personal.pronouns}</em></small>
            <p>{vCardOptions.professional.role} {vCardOptions.professional.bio}</p>
        </div>

        <SocialIconLink link={vCardOptions.socialMedia.twitter} network="twitter"/>
        <SocialIconLink link={vCardOptions.socialMedia.linkedin} network="linkedin"/>
        <SocialIconLink link={vCardOptions.socialMedia.facebook} network="facebook"/>
        <SocialIconLink link={vCardOptions.socialMedia.instagram} network="instagram"/>
        <SocialIconLink link={vCardOptions.socialMedia.pinterest} network="pinterest"/>
        <SocialIconLink link={vCardOptions.socialMedia.github} network="github"/>

        <Divider/>

        <ul class="list-unstyled m-0" style="color: {themeOptions.fontColor}">
            {#if vCardOptions.contact.phone.number.length !== 0}
                {#if themeOptions.displayPhone || themeOptions.displaySms}
                    <li class="d-flex align-middle pb-3">
                        {#if themeOptions.displayPhone}
                            <IconLink
                                    href="tel:{telLink}"
                                    ariaLabel="Call {vCardOptions.contact.phone.number}"
                                    backgroundColor="{themeOptions.socialIconBackgroundColor}"
                                    fontColor="{themeOptions.socialIconFontColor}"
                            >
                                <PhoneIcon size="1.2x"/>
                            </IconLink>
                        {/if}

                        {#if themeOptions.displaySms}
                            <IconLink
                                    href="sms:+{vCardOptions.contact.phone.countryCode}{vCardOptions.contact.phone.number}"
                                    ariaLabel="Send SMS to {vCardOptions.contact.phone.number}"
                                    backgroundColor="{themeOptions.socialIconBackgroundColor}"
                                    fontColor="{themeOptions.socialIconFontColor}"
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

            {#if themeOptions.displayEmail && vCardOptions.contact.email.length !== 0}
                <li class="d-flex align-middle pb-3">
                    <IconLink
                            href="mailto:{vCardOptions.contact.email}"
                            ariaLabel="Email {vCardOptions.contact.email}"
                            backgroundColor="{themeOptions.socialIconBackgroundColor}"
                            fontColor="{themeOptions.socialIconFontColor}"
                    >
                        <MailIcon size="1.2x"/>
                    </IconLink>

                    <div class="d-flex flex-column my-auto">
                        <a href="mailto:{vCardOptions.contact.email}">{vCardOptions.contact.email}</a>
                    </div>
                </li>
            {/if}

            {#if themeOptions.displayWeb && vCardOptions.contact.web.length !== 0}
                <li class="d-flex align-middle pb-3">
                    <IconLink
                            href="{vCardOptions.contact.web}"
                            ariaLabel="Visit {vCardOptions.contact.web}"
                            backgroundColor="{themeOptions.socialIconBackgroundColor}"
                            fontColor="{themeOptions.socialIconFontColor}"
                    >
                        <GlobeIcon size="1.2x"/>
                    </IconLink>

                    <div class="d-flex flex-column my-auto">
                        <a href={vCardOptions.contact.web} target="_blank">{vCardOptions.contact.web}</a>
                    </div>
                </li>
            {/if}

            {#if themeOptions.displayAddress}
                {#if vCardOptions.location.street.length !== 0 || vCardOptions.location.postalCode.length !== 0 || vCardOptions.location.city.length !== 0 || vCardOptions.location.state.length !== 0}
                    <li class="d-flex align-middle pb-3">
                        <IconLink
                                href="{addressLink}"
                                ariaLabel="View location on Google Maps"
                                backgroundColor="{themeOptions.socialIconBackgroundColor}"
                                fontColor="{themeOptions.socialIconFontColor}"
                        >
                            <MapPinIcon size="1.2x"/>
                        </IconLink>

                        <a href="{addressLink}" target="_blank">
                            <div class="d-flex flex-column my-auto">
                                {vCardOptions.location.street}{vCardOptions.location.storey
                              ? ', ' + vCardOptions.location.storey
                              : ''}
                                <span>{vCardOptions.location.postalCode} {vCardOptions.location.city}{vCardOptions.location.state ? `, ${vCardOptions.location.state}` : ''}</span>
                                <span>{vCardOptions.location.country}</span>
                            </div>
                        </a>
                    </li>
                {/if}
            {/if}

            <Divider/>

            {#if themeOptions.displayMap && vCardOptions.location.coordinates.latitude.length !== 0 && vCardOptions.location.coordinates.longitude.length !== 0}
                <div class="card overflow-hidden">
                    <Map
                            latitude={vCardOptions.location.coordinates.latitude}
                            longitude={vCardOptions.location.coordinates.longitude}
                    />
                </div>
            {/if}
        </ul>
    </div>

    <div style="padding-top: 30px"></div>

    {#if themeOptions.displayContactBtn}
        <div class="{displayMode} p-0" style="z-index: 1000">
            <VCardButton
                    className="btn w-100 rounded-0 py-3"
                    {vCardOptions}
                    backgroundColor={themeOptions.btnBackgroundColor}
                    color={themeOptions.btnFontColor}
            >
                <UserPlusIcon size="1x"/>
                {themeOptions.buttonText}
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
