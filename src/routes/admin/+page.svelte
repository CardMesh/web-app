<script>
	import AdminMain from '$lib/admin/AdminMain.svelte';
	import PieChart from '$lib/admin/PieChart.svelte';
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';
	import QRCode from 'qrcode-svg';
	import NfcButton from '$lib/admin/NfcButton.svelte';
	import { PUBLIC_BASE_URL } from '$env/static/public';

	let svgString = '';
  const uuid = JSON.parse(Cookies.get('user') || '{}').data?.uuid;
  let profileUrl = `${PUBLIC_BASE_URL}/profile/${uuid}`;

  onMount(() => {
    svgString = new QRCode({
      content: `${profileUrl}?entryPoint=qr`,
      join: true,
      ecl: 'M',
      size: 256,
      margin: 4,
      color: '#212529',
      background: '#fff'
    }).svg();
  });

  const downloadSvgAsPng = (svgString, filename) => {
    const canvas = document.createElement('canvas');
    const svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svg);
    const image = new Image();
    image.onload = () => {
      const {
        width,
        height
      } = image;
      Object.assign(canvas, {
        width: 800,
        height: (800 * height) / width
      });
      canvas.getContext('2d')
        .drawImage(image, 0, 0, canvas.width, canvas.height);
      Object.assign(document.createElement('a'), {
        download: filename,
        href: canvas.toDataURL('image/png')
      })
        .click();
    };
    image.src = url;
  };
</script>

<svelte:head>
    <title>Dashboard</title>
    <meta content="Dashboard"/>
</svelte:head>

<AdminMain>
    <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
        <h1 class="h2">Dashboard</h1>
    </div>

    <div class="row">
        <div class="col-sm-6 mb-3 mb-sm-0">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Statistics</h5>
                    <PieChart/>
                </div>
            </div>
        </div>

        <div class="col-sm-6">
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">URL</h5>
                    <p class="card-text">
                        With supporting text below as a natural lead-in to additional content.
                    </p>
                    <a class="btn btn-primary" href={profileUrl} target="_blank">Open business card</a>
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">QR-code</h5>
                    <div class="mb-3">{@html svgString}</div>
                    <div class="button-container">
                        <button class="btn btn-primary mb-3" on:click={downloadSvgAsPng(svgString, 'qr.png')}>
                            Download QR code in PNG
                        </button>
                    </div>
                    <div class="button-container">
                        <a
                                class="btn btn-primary"
                                href={`${PUBLIC_BASE_URL}/qr/${uuid}`}
                                role="button"
                                target="_blank"
                        >
                            Show QR code on a new page
                        </a>
                    </div>
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">NFC</h5>
                    <p class="card-text">
                        With supporting text below as a natural lead-in to additional content.
                    </p>
                    <NfcButton profileUrl={`${profileUrl}?entryPoint=nfc`}/>
                </div>
            </div>
        </div>
    </div>
</AdminMain>
