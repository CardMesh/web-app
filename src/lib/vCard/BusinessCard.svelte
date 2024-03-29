<script>
  import {
    FileIcon,
    GlobeIcon,
    MailIcon,
    MapPinIcon,
    MessageSquareIcon,
    PhoneIcon,
    UserPlusIcon
  } from 'svelte-feather-icons';
  import Divider from '$lib/layout/Divider.svelte';
  import VCardButton from '$lib/vCard/VCard.svelte';
  import Map from '$lib/maps/Map.svelte';
  import SocialIconLink from '$lib/forms/SocialIconLink.svelte';
  import IconLink from '$lib/layout/IconLink.svelte';

  import { onMount } from 'svelte';

  let addContactText = '';

  onMount(async () => {
    const translations = await import('../../js/translations.js');
    addContactText = translations.translations[translations.browserLanguage];
  });

  export let view = 'preview';

  export let vCard;

  export let theme;

  export let logoPreview;

  export let avatarPreview;

  let displayMode = view === 'preview' ? 'fixed-bottom-preview' : 'fixed-bottom-prod';

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
  $: addressLink = `https://www.google.com/maps/place/${formattedAddress}`;

  let latitude;
  $: latitude = vCard.location.coordinates.latitude;

  let longitude;
  $: longitude = vCard.location.coordinates.longitude;

  const generateFullName = (first, middle, last) => `${first ? first + ' ' : ''}${middle ? middle + ' ' : ''}${last}`;

  $: fullName = generateFullName(vCard.person.firstName, vCard.person.middleName, vCard.person.lastName);
</script>

<div style="background-color: {theme.color.background}">
    <div class="container">
        <div class="d-flex"></div>

        {#if theme.display.logo}
            {#if theme?.logo?.format?.webp || logoPreview}
                <div class="d-flex justify-content-{theme.align.logo}">
                    <img
                            alt={vCard.professional.company}
                            class="position-relative mt-2"
                            height="{theme?.logo?.size?.height ?? 20}"
                            width="{theme?.logo?.size?.width}"
                            src="{logoPreview ? logoPreview : `data:image/webp;base64,${theme.logo.format.webp}`}"
                            style="max-height: {theme?.logo?.size?.height ?? 20}px"
                    />
                </div>
            {/if}
        {/if}

        <Divider/>

        {#if vCard?.avatar?.format?.webp || avatarPreview}
            <div class="d-flex justify-content-{theme.align.avatar} mb-2">
                <div class="d-flex justify-content-center align-items-center">
                    <img
                            alt="{fullName}"
                            class="rounded-circle object-fit-cover"
                            height="130"
                            width="130"
                            src="{avatarPreview ? avatarPreview : `data:image/webp;base64,${vCard.avatar.format.webp}`}"
                    />
                </div>
            </div>
        {/if}

        <div class="d-flex justify-content-{theme.align.heading}">
            <h1 class="h3 pt-1"
                style="color: {theme.color.font.primary}">{fullName}</h1>
        </div>
        <div class="text-{theme.align.bio}" style="color: {theme.color.font.secondary}">
            <small><em>{vCard.person.pronouns}</em></small>
            <p><em>{vCard.professional.role}</em></p>
            <p>{@html vCard.professional.bio.replace(/(\r\n|\r|\n)/g, '<br>')}</p>
        </div>

        <ul class="social-icons d-flex justify-content-{theme.align.socialIcons}">
            <li>
                <SocialIconLink backgroundColor="{theme.color.socialIcons.background}"
                                fontColor="{theme.color.socialIcons.font}" link={vCard.socialMedia.twitter}
                                network="twitter"/>
            </li>
            <li>
                <SocialIconLink backgroundColor="{theme.color.socialIcons.background}"
                                fontColor="{theme.color.socialIcons.font}" link={vCard.socialMedia.linkedin}
                                network="linkedin"/>
            </li>
            <li>
                <SocialIconLink backgroundColor="{theme.color.socialIcons.background}"
                                fontColor="{theme.color.socialIcons.font}" link={vCard.socialMedia.facebook}
                                network="facebook"/>
            </li>
            <li>
                <SocialIconLink backgroundColor="{theme.color.socialIcons.background}"
                                fontColor="{theme.color.socialIcons.font}"
                                link={vCard.socialMedia.instagram}
                                network="instagram"/>
            </li>
            <li>
                <SocialIconLink backgroundColor="{theme.color.socialIcons.background}"
                                fontColor="{theme.color.socialIcons.font}"
                                link={vCard.socialMedia.pinterest}
                                network="pinterest"/>
            </li>
            <li>
                <SocialIconLink backgroundColor="{theme.color.socialIcons.background}"
                                fontColor="{theme.color.socialIcons.font}" link={vCard.socialMedia.github}
                                network="github"/>
            </li>
        </ul>


        <Divider/>

        <ul class="list-unstyled m-0" style="color: {theme.color.font.secondary}">
            {#if vCard.contact.phone.number.length !== 0}
                {#if theme.display.phone || theme.display.sms}
                    <li class="d-flex align-middle pb-3">
                        {#if theme.display.phone}
                            <IconLink
                                    href="tel:{telLink}"
                                    ariaLabel="Call {vCard.contact.phone.number}"
                                    backgroundColor="{theme.color.contactIcons.background}"
                                    fontColor="{theme.color.contactIcons.font}"
                            >
                                <PhoneIcon size="1.2x"/>
                            </IconLink>
                        {/if}

                        {#if theme.display.sms}
                            <IconLink
                                    href="sms:+{vCard.contact.phone.countryCode}{vCard.contact.phone.number}"
                                    ariaLabel="Send SMS to {vCard.contact.phone.number}"
                                    backgroundColor="{theme.color.contactIcons.background}"
                                    fontColor="{theme.color.contactIcons.font}"
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

            {#if theme.display.email && vCard.contact.email.length !== 0}
                <li class="d-flex align-middle pb-3">
                    <IconLink
                            href="mailto:{vCard.contact.email}"
                            ariaLabel="Email {vCard.contact.email}"
                            backgroundColor="{theme.color.contactIcons.background}"
                            fontColor="{theme.color.contactIcons.font}"
                    >
                        <MailIcon size="1.2x"/>
                    </IconLink>

                    <div class="d-flex flex-column my-auto">
                        <a href="mailto:{vCard.contact.email}">{vCard.contact.email}</a>
                    </div>
                </li>
            {/if}

            {#if theme.display.web && vCard.contact.web.length !== 0}
                <li class="d-flex align-middle pb-3">
                    <IconLink
                            href="{vCard.contact.web.includes('://') ? vCard.contact.web : `https://${vCard.contact.web}`}"
                            ariaLabel="Visit {vCard.contact.web}"
                            backgroundColor="{theme.color.contactIcons.background}"
                            fontColor="{theme.color.contactIcons.font}"
                            target="_blank"
                    >
                        <GlobeIcon size="1.2x"/>
                    </IconLink>

                    <div class="d-flex flex-column my-auto">
                        <a href="{vCard.contact.web.includes('://') ? vCard.contact.web : `https://${vCard.contact.web}`}"
                           target="_blank">{vCard.contact.web}</a>
                    </div>
                </li>
            {/if}

            {#if vCard.contact.file.name && vCard.contact.file.url}
                <li class="d-flex align-middle pb-3">
                    <IconLink
                            href="{vCard.contact.file.url}"
                            ariaLabel="{vCard.contact.file.name}"
                            backgroundColor="{theme.color.contactIcons.background}"
                            fontColor="{theme.color.contactIcons.font}"
                            target="_blank"
                    >
                        <FileIcon size="1.2x"/>
                    </IconLink>

                    <div class="d-flex flex-column my-auto">
                        <a href="{vCard.contact.file.url.includes('://') ? vCard.contact.file.url : `https://${vCard.contact.file.url}`}"
                           target="_blank">{vCard.contact.file.name}</a>
                    </div>
                </li>
            {/if}

            {#if theme.display.address}
                {#if vCard.location.street.length !== 0 || vCard.location.postalCode.length !== 0 || vCard.location.city.length !== 0 || vCard.location.state.length !== 0}
                    <li class="d-flex align-middle pb-3">
                        <IconLink
                                href="{addressLink}"
                                ariaLabel="View location on Google Maps"
                                backgroundColor="{theme.color.contactIcons.background}"
                                fontColor="{theme.color.contactIcons.font}"
                                target="_blank"
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
        </ul>

        {#if theme.display.map && latitude.length !== 0 && longitude.length !== 0}
            <Divider/>

            <div class="card overflow-hidden">
                <Map
                        bind:latitude={latitude}
                        bind:longitude={longitude}
                />
            </div>
        {/if}
    </div>

    <div style="padding-top: 30px"></div>

    {#if theme.display.vCardBtn}
        <div class="{displayMode} p-0" style="z-index: 1000">
            <VCardButton
                    className="btn w-100 rounded-0 py-3"
                    {vCard}
                    backgroundColor={theme.color.vCardBtn.background}
                    color={theme.color.vCardBtn.font}
            >
                <UserPlusIcon size="1x"/>
                {addContactText}
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

  .fixed-bottom-preview {
    position: sticky;
    bottom: -1px;
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
      right: -1px;
      bottom: 0;
      left: 0;
      z-index: 1030;
    }
  }

  .text-secondary {
    color: grey !important;
  }

  ul.social-icons {
    list-style: none;
    display: flex;
  }

  ul.social-icons li {
    margin-right: 1px;
  }

  ul.social-icons li:last-child {
    margin-right: 0;
  }

  ul {
    padding-left: 0;
  }
</style>
