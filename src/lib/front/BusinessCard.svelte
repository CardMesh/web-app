<script>
	import {
		GlobeIcon,
		MailIcon,
		MapPinIcon,
		MessageSquareIcon,
		PhoneIcon,
		UserPlusIcon
	} from 'svelte-feather-icons';
	import Divider from '$lib/front/Divider.svelte';
	import SocialIcons from '@rodneylab/svelte-social-icons';
	import VCardButton from '$lib/front/VCard.svelte';

	export let view = 'demo';

	export let options;

	let displayMode = view === 'demo' ? 'fixed-bottom-demo' : 'fixed-bottom-prod';
</script>

<div class="bg-secondary">
	<div class="container bg-custom">
		<img
			alt={options.company}
			class="position-relative mt-2"
			src="https://fakeimg.pl/60x30/"
			style="max-width: 60px; max-height: 60px;"

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

		<div class="text-center">
			<h1>{options.firstName} {options.lastName}</h1>
			<small><em>{options.pronouns}</em></small>
			<p>{options.bio}</p>
		</div>

		<SocialIcons alt="" height="22" network="twitter" width="22" />
		<SocialIcons alt="" height="22" network="linkedin" width="22" />
		<SocialIcons alt="" height="22" network="facebook" width="22" />
		<SocialIcons alt="" height="22" network="instagram" width="22" />
		<SocialIcons alt="" height="22" network="pinterest" width="22" />
		<SocialIcons alt="" height="22" network="github" width="22" />

		<Divider />

		<ul class="list-unstyled m-0">
			<li class="d-flex align-middle pb-3">
				<a
					class="btn me-2 d-flex my-auto rounded-circle bg-info p-2 border-0"
					href="tel:{options.phone}"
					role="button"
					aria-label="Call {options.phone}"
				>
					<PhoneIcon size="1.2x" />
				</a>

				<a
					class="btn me-2 d-flex my-auto rounded-circle bg-info p-2 border-0"
					href="sms:{options.phone}"
					role="button"
					aria-label="Send SMS to {options.phone}"
				>
					<MessageSquareIcon size="1.2x" />
				</a>

				<div class="d-flex flex-column my-auto">
					<span>{options.phone}</span>
					<span class="small text-secondary">mobile</span>
				</div>
			</li>

			<li class="d-flex align-middle pb-3">
				<a
					class="btn me-2 d-flex my-auto rounded-circle bg-info p-2 border-0"
					href="mailto:{options.email}"
					role="button"
					aria-label="Email {options.email}"
				>
					<MailIcon size="1.2x" />
				</a>

				<div class="d-flex flex-column my-auto">
					<span>{options.email}</span>
				</div>
			</li>

			<li class="d-flex align-middle pb-3">
				<a
					class="btn me-2 d-flex my-auto rounded-circle bg-info p-2 border-0"
					href={options.web}
					role="button"
					target="_blank"
					aria-label="Visit {options.web}"
				>
					<GlobeIcon size="1.2x" />
				</a>

				<div class="d-flex flex-column my-auto">
					<span>{options.web}</span>
				</div>
			</li>

			<li class="d-flex align-middle pb-3">
				<a
					class="btn me-2 d-flex my-auto rounded-circle bg-info p-2 border-0"
					href="https://www.google.com/maps/place/Guldstjernevej+4+2400+K%C3%B8benhavn"
					role="button"
					target="_blank"
					aria-label="View location on Google Maps"
				>
					<MapPinIcon size="1.2x" />
				</a>

				<div class="d-flex flex-column my-auto">
					<span>{options.street}</span>
					<span>{options.city}</span>
					<span>{options.state}</span>
					<span>{options.postalCode}, {options.country}</span>
				</div>
			</li>
		</ul>
	</div>

	<div class="{displayMode} mt-3 p-0" style="z-index: 999999">
		<VCardButton c="btn btn-primary w-100 rounded-0 py-2" {options}>
			<UserPlusIcon size="1x" />
			Add to contacts
		</VCardButton>
	</div>
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

	// override boostrap custom css... make this configurable from BO
	p, span, h1, h2, h3, em {
		color: white;
	}

	.bg-custom {
		background-color: #212529;
	}

	.text-secondary {
		color: grey !important;
	}
</style>
