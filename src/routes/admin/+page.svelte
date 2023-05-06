<script>
  import AdminMain from '$lib/admin/AdminMain.svelte';
  import PieChart from '$lib/admin/PieChart.svelte';
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';
  import QRCode from 'qrcode-svg';
  import { displayError, displaySuccess, displayWarning } from '../../js/toast.js';

  let svgString = '';
  const uuid = JSON.parse(Cookies.get('user') || '{}').data?.uuid;
  let profileUrl = `http://localhost/profile/${uuid}`;

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
		  const { width, height } = image;
		  Object.assign(canvas, { width: 800, height: (800 * height) / width });
		  canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
		  Object.assign(document.createElement('a'), { download: filename, href: canvas.toDataURL('image/png') }).click();
	  };
	  image.src = url;
  };

  const writeTag = async () => {
    if ('NDEFReader' in window) {
      const ndef = new NDEFReader();
      try {
        await ndef.write({ records: [{ recordType: 'url', data: `${profileUrl}?entryPoint=nfc` }] });
        displaySuccess('NDEF message written!');
      } catch (error) {
        displayError(error);
      }
    } else {
      displayWarning('Web NFC is not supported.');
    }
  };
</script>

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
                    <button class="btn btn-primary" on:click={downloadSvgAsPng(svgString, 'qr.png')}
                    >Download QR code in PNG
                    </button>
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">NFC</h5>
                    <p class="card-text">
                        With supporting text below as a natural lead-in to additional content.
                    </p>
                    <button class="btn btn-primary" on:click={writeTag}>Write NFC tag</button>
                </div>
            </div>
        </div>
    </div>
</AdminMain>
