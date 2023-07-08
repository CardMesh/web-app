<script>
  import AdminMain from '$lib/layout/AdminMain.svelte';
  import PieChart from '$lib/charts/PieChart.svelte';
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';
  import QRCode from 'qrcode-svg';
  import { PUBLIC_BASE_URL } from '$env/static/public';
  import StackedBarLineChart from '$lib/charts/StackedBarLineChart.svelte';
  import { ActivityIcon, DownloadIcon, ExternalLinkIcon, GridIcon, SmartphoneIcon } from 'svelte-feather-icons';
  import Heading from '$lib/layout/Heading.svelte';
  import SvelteSeo from 'svelte-seo';

  let svgString = '';
  const user = JSON.parse(Cookies.get('user') || '{}').data;
  const userId = user?.userId;
  const themeId = user?.themeId;

  let profileUrl = `${PUBLIC_BASE_URL}/p/${userId}/t/${themeId}`;

  export let data;

  const clicks = data.clicks.data;

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

<SvelteSeo
        description="Personal Dashboard"
        title="Personal Dashboard"
/>

<AdminMain>
    <Heading border="true" size="h2" tag="h1">Personal Dashboard</Heading>

    <div class="row mb-4">
        <div class="col-sm-4 mb-3 mb-sm-0">
            <div class="card">
                <div class="card-body d-flex flex-column align-items-center justify-content-center text-center">
                  <span class="fs-3 mb-3">
                    <SmartphoneIcon size="2x"/>
                    Business Card
                  </span>
                    <a class="btn btn-action rounded-circle d-flex align-items-center justify-content-center"
                       href={profileUrl}
                       target="_blank"
                    >
                        <div class="text-info">
                            <ExternalLinkIcon size="2.5x"/>
                        </div>
                    </a>
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
                        <button class="btn btn-action rounded-circle d-flex align-items-center justify-content-center"
                                on:click={downloadSvgAsPng(svgString, `${user.name}-QR.png`)}>
                            <div class="text-info">
                                <DownloadIcon size="2.5x"/>
                            </div>
                        </button>

                        <a class="btn btn-action rounded-circle d-flex align-items-center justify-content-center"
                           href={`${PUBLIC_BASE_URL}/qr/${userId}/t/${themeId}`}
                           role="button"
                           target="_blank">
                            <div class="text-info">
                                <ExternalLinkIcon size="2.5x"/>
                            </div>
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
                    <h2 class="display-6">{clicks.totalClicks}</h2>
                </div>
            </div>
        </div>
    </div>

    <div class="row mb-3">
        <div class="col-sm-4 mb-3 mb-sm-0">
            <div class="card">
                <div class="card-body">
                    <Heading noTop="true" size="h4" tag="h2">Total clicks by type</Heading>
                    <PieChart totalClicksByType="{clicks.totalClicksByType}"/>
                </div>
            </div>
        </div>

        <div class="col-sm-8 mb-3 mb-sm-0">
            <div class="card">
                <div class="card-body">
                    <Heading noTop="true" size="h4" tag="h2">Last 7 days of activity</Heading>
                    <StackedBarLineChart clickCountsByDate="{clicks.clickCountsByDate}"/>
                </div>
            </div>
        </div>
    </div>
</AdminMain>

<style>
    .card {
        min-height: 170px;
    }

    .btn-action {
        width: 50px;
        max-width: 100%;
        max-height: 100%;
        height: 50px;
        text-align: center;
        padding: 0;
        font-size: 10px;
    }

    .btn-action:hover {
        color: white;
        background-color: grey;
    }
</style>