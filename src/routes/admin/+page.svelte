<script>
  import AdminMain from '$lib/layout/AdminMain.svelte';
  import PieChart from '$lib/charts/PieChart.svelte';
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';
  import QRCode from 'qrcode-svg';
  import { PUBLIC_BASE_URL } from '$env/static/public';
  import StackedBarLineChart from '$lib/charts/StackedBarLineChart.svelte';
  import { ActivityIcon, GridIcon, SmartphoneIcon } from 'svelte-feather-icons';
  import Heading from '$lib/layout/Heading.svelte';

  let svgString = '';
  const uuid = JSON.parse(Cookies.get('user') || '{}').data?.uuid;
  let profileUrl = `${PUBLIC_BASE_URL}/p/${uuid}`;

  export let data;

  onMount(() => {
    svgString = new QRCode({
      content: `${profileUrl}?source=qr`,
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
    <title>Personal Dashboard</title>
    <meta content="Personal Dashboard"/>
</svelte:head>

<AdminMain>
    <Heading size="h2" tag="h1">Personal Dashboard</Heading>

    <div class="row mb-4">
        <div class="col-sm-4 mb-3 mb-sm-0">
            <div class="card">
                <div class="card-body d-flex flex-column align-items-center justify-content-center text-center">
                  <span class="fs-3 mb-3">
                    <SmartphoneIcon size="2x"/>
                    Business Card
                  </span>
                    <a class="btn btn-primary" href={profileUrl} target="_blank">Open business card</a>
                </div>
            </div>
        </div>

        <div class="col-sm-4 mb-3 mb-sm-0">
            <div class="card">
                <div class="card-body d-flex flex-column align-items-center justify-content-center text-center">
      <span class="fs-3 mb-3">
        <GridIcon size="2x"/>
        QR
      </span>

                    <div class="d-flex justify-content-between">
                        <button class="btn btn-primary me-3" on:click={downloadSvgAsPng(svgString, 'qr.png')}>
                            Download QR-code
                        </button>

                        <a class="btn btn-primary" href={`${PUBLIC_BASE_URL}/qr/${uuid}`} role="button" target="_blank">
                            Show QR-code
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-4 mb-3 mb-sm-0">
            <div class="card">
                <div class="card-body d-flex flex-column align-items-center justify-content-center text-center">
                  <span class="fs-3 mb-3">
                    <ActivityIcon size="2x"/>
                    Total clicks
                  </span>
                    <h2 class="display-6">{data.clicks.data.totalClicks}</h2>
                </div>
            </div>
        </div>
    </div>

    <div class="row mb-3">
        <div class="col-sm-4 mb-3 mb-sm-0">
            <div class="card">
                <div class="card-body">
                    <Heading noTop="true" size="h4" tag="h2">Total clicks by type</Heading>
                    <PieChart totalClicksByType="{data.clicks.data.totalClicksByType}"/>
                </div>
            </div>
        </div>

        <div class="col-sm-8 mb-3 mb-sm-0">
            <div class="card">
                <div class="card-body">
                    <Heading noTop="true" size="h4" tag="h2">Last 7 days of activity</Heading>
                    <StackedBarLineChart clickCountsByDate="{data.clicks.data.clickCountsByDate}"/>
                </div>
            </div>
        </div>
    </div>
</AdminMain>

<style>
    .card {
        min-height: 170px;
    }
</style>
