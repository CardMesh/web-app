<script>
	import {
		GlobeIcon,
		MailIcon,
		MapPinIcon,
		MessageSquareIcon,
		PhoneIcon,
		UserPlusIcon
	} from 'svelte-feather-icons';
	import Divider from '$lib/common/Divider.svelte';
	import VCardButton from '$lib/front/VCard.svelte';
	import Map from '$lib/front/Map.svelte';
	import { PUBLIC_REST_API_URL } from '$env/static/public';
	import SocialIconLink from '$lib/common/SocialIconLink.svelte';

	export let view = 'demo';

	export let vCardOptions;

	export let themeOptions;

	export let logo = `${PUBLIC_REST_API_URL}/uploads/logo.webp`;

	let mapCoordinates = {
		latitude: 55.6761,
		longitude: 12.5683
	};

	let displayMode = view === 'demo' ? 'fixed-bottom-demo' : 'fixed-bottom-prod';

</script>

<div style="background-color: {themeOptions.backgroundColor}">
	<div class="container">
		<img
			alt={vCardOptions.company}
			class="position-relative mt-2"
			src={logo}
			style="max-height: {themeOptions.logoHeight}px"
		/>

		<Divider />

		<div class="d-flex justify-content-center align-items-center">
			<img
				alt="My Image"
				class="rounded-circle"
				height="130"
				src="https://fakeimg.pl/130/"
				width="130"
			/>
		</div>

		<div class="text-center" style="color: {themeOptions.fontColor}">
			<h1>{vCardOptions.firstName} {vCardOptions.lastName}</h1>
			<small><em>{vCardOptions.pronouns}</em></small>
			<p>{vCardOptions.bio}</p>
		</div>

		<SocialIconLink link={themeOptions.twitter} network="twitter" />
		<SocialIconLink link={themeOptions.linkedin} network="linkedin" />
		<SocialIconLink link={themeOptions.facebook} network="facebook" />
		<SocialIconLink link={themeOptions.instagram} network="instagram" />
		<SocialIconLink link={themeOptions.pinterest} network="pinterest" />

		<Divider />

		<ul class="list-unstyled m-0">
			{#if themeOptions.displayPhone || themeOptions.displaySms}
				<li class="d-flex align-middle pb-3">
					{#if themeOptions.displayPhone}
						<a
							aria-label="Call {vCardOptions.phone}"
							class="btn me-2 d-flex my-auto rounded-circle bg-info p-2 border-0"
							href="tel:{vCardOptions.phone}"
							role="button"
						>
							<PhoneIcon size="1.2x" />
						</a>
					{/if}

					{#if themeOptions.displaySms}
						<a
							aria-label="Send SMS to {vCardOptions.phone}"
							class="btn me-2 d-flex my-auto rounded-circle bg-info p-2 border-0"
							href="sms:{vCardOptions.phone}"
							role="button"
						>
							<MessageSquareIcon size="1.2x" />
						</a>
					{/if}

					<div class="d-flex flex-column my-auto">
						<span>{vCardOptions.phone}</span>
						<span class="small text-secondary">mobile</span>
					</div>
				</li>
			{/if}

			{#if themeOptions.displayEmail}
				<li class="d-flex align-middle pb-3">
					<a
						aria-label="Email {vCardOptions.email}"
						class="btn me-2 d-flex my-auto rounded-circle bg-info p-2 border-0"
						href="mailto:{vCardOptions.email}"
						role="button"
					>
						<MailIcon size="1.2x" />
					</a>

					<div class="d-flex flex-column my-auto">
						<span>{vCardOptions.email}</span>
					</div>
				</li>
			{/if}

			{#if themeOptions.displayWeb}
				<li class="d-flex align-middle pb-3">
					<a
						aria-label="Visit {vCardOptions.web}"
						class="btn me-2 d-flex my-auto rounded-circle bg-info p-2 border-0"
						href={vCardOptions.web}
						role="button"
						target="_blank"
					>
						<GlobeIcon size="1.2x" />
					</a>

					<div class="d-flex flex-column my-auto">
						<span>{vCardOptions.web}</span>
					</div>
				</li>
			{/if}

			{#if themeOptions.displayAddress}
				<li class="d-flex align-middle pb-3">
					<a
						aria-label="View location on Google Maps"
						class="btn me-2 d-flex my-auto rounded-circle bg-info p-2 border-0"
						href="https://www.google.com/maps/place/Guldstjernevej+4+2400+K%C3%B8benhavn"
						role="button"
						target="_blank"
					>
						<MapPinIcon size="1.2x" />
					</a>

					<div class="d-flex flex-column my-auto">
						<span>{vCardOptions.street}</span>
						<span>{vCardOptions.city}</span>
						<span>{vCardOptions.state}</span>
						<span>{vCardOptions.postalCode}, {vCardOptions.country}</span>
					</div>
				</li>
			{/if}

			<Divider />
			{#if themeOptions.displayMap}
				<div class="card h-100 overflow-hidden">
					<Map coordinates={mapCoordinates} />
				</div>
			{/if}
		</ul>
	</div>

	{#if themeOptions.displayContactBtn}
		<div class="{displayMode} mt-3 p-0" style="z-index: 999999">
			<VCardButton c="btn btn-primary w-100 rounded-0 py-2" {vCardOptions}>
				<UserPlusIcon size="1x" />
				Add to contacts
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
