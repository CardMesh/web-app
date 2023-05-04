<script>
	import VCF from 'vcf';

	export let options;
	export let c;

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
		console.log(options.title);
		// Set the properties of the Vcard
		vcard.set('version', '4.0');
		vcard.set('fn', `${options.firstName} ${options.lastName}`);
		vcard.set('org', `${options.company}`);
		vcard.set('title', `${options.title}`);
		vcard.set('email', `${options.email}`, { type: 'work' });
		vcard.set('tel', `${options.phone}`, { type: 'work', voice: true });
		vcard.set('tel', `${options.mobile}`, { type: 'cell', voice: true });
		vcard.set(
			'adr',
			`${options.street};${options.city};${options.state};${options.postalCode};${options.country}`,
			{
				type: 'work',
				postal: true,
				parcel: true
			}
		); // TODO I think it is bugged.. also add personal address
		vcard.set('url', `${options.web}`);
		vcard.set('tz', `${options.timeZone}`); // TZ:America/New_York
		//  vcard.set("source", `${options.source}`); // SOURCE:http://johndoe.com/vcard.vcf
		vcard.set('rev', getCurrentTime());
		//  vcard.set("photo", `${options.photo}`); // PHOTO;MEDIATYPE=image/jpeg:http://example.com/photo.jpg
		//  vcard.set("logo", `${options.logo}`) // LOGO;MEDIATYPE=image/png:http://example.com/logo.png
		//  vcard.set("lang", `${options.language}`) // e.g. fr-CA
		//  vcard.set("geo", `${options.geo}`);
		vcard.set('gender', `${options.gender}`); // TODO: e.g. "F"
		vcard.set('bday', `${options.birthday}`); // TODO
		vcard.set('note', `${options.bio}`);

		// Generate the Vcard string
		return vcard.toString();
	};

	const downloadVcard = () => {
		// Generate the Vcard string
		const vcardData = generateVcard();

		// Create a new <a> element with the Vcard data as a Blob
		const element = document.createElement('a');
		element.href = URL.createObjectURL(new Blob([vcardData], { type: 'text/vcard' }));
		element.download = `${options.firstName}${options.lastName}.vcf`;

		// Trigger a click event on the element to initiate the download
		element.click();
	};
</script>

<button class={c} on:click={downloadVcard}>
	<slot />
</button>
