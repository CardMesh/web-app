<script>
	import VCF from 'vcf';

	export let vCardOptions;
	export let c;

	export let backgroundColor;

	export let color;

	const getCurrentTime = () => {
		const now = new Date();
		const year = now.getUTCFullYear();
		const month = (now.getUTCMonth() + 1).toString().padStart(2, '0');
		const day = now.getUTCDate().toString().padStart(2, '0');
		const hours = now.getUTCHours().toString().padStart(2, '0');
		const minutes = now.getUTCMinutes().toString().padStart(2, '0');
		const seconds = now.getUTCSeconds().toString().padStart(2, '0');
		return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
	};

	const generateVcard = () => {
		// Create a new Vcard object
		const vcard = new VCF();

		// Set the properties of the Vcard
		vcard.set('version', '4.0');
		vcard.set('fn', `${vCardOptions.firstName} ${vCardOptions.lastName}`);
		vcard.set('org', `${vCardOptions.company}`);
		vcard.set('title', `${vCardOptions.title}`);
		vcard.set('email', `${vCardOptions.email}`, { type: 'work' });
		vcard.set('tel', `${vCardOptions.phone}`, {
			type: 'work',
			voice: true
		});
		vcard.set('tel', `${vCardOptions.mobile}`, {
			type: 'cell',
			voice: true
		});
		vcard.set(
			'adr',
			`${vCardOptions.street};${vCardOptions.city};${vCardOptions.state};${vCardOptions.postalCode};${vCardOptions.country}`,
			{
				type: 'work',
				postal: true,
				parcel: true
			}
		); // TODO I think it is bugged.. also add personal address
		vcard.set('url', `${vCardOptions.web}`);
		vcard.set('tz', `${vCardOptions.timeZone}`); // TZ:America/New_York
		//  vcard.set("source", `${options.source}`); // SOURCE:http://johndoe.com/vcard.vcf
		vcard.set('rev', getCurrentTime());
		//  vcard.set("photo", `${options.photo}`); // PHOTO;MEDIATYPE=image/jpeg:http://example.com/photo.jpg
		//  vcard.set("logo", `${options.logo}`) // LOGO;MEDIATYPE=image/png:http://example.com/logo.png
		//  vcard.set("lang", `${options.language}`) // e.g. fr-CA
		//  vcard.set("geo", `${options.geo}`);
		vcard.set('gender', `${vCardOptions.gender}`); // TODO: e.g. "F"
		vcard.set('bday', `${vCardOptions.birthday}`); // TODO
		vcard.set('note', `${vCardOptions.bio}`);

		// Generate the Vcard string
		return vcard.toString();
	};
</script>

<a
	class={c}
	style="background-color: {backgroundColor}; color: {color}"
	download="{vCardOptions.firstName}{vCardOptions.lastName}.vcf"
	href={`data:text/vcard;charset=utf-8,${encodeURIComponent(generateVcard())}`}
>
	<slot />
</a>
