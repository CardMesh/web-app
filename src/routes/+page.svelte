<script>
  import { onMount } from 'svelte';
  import { PUBLIC_BASE_URL } from '$env/static/public';
  import QRCode from 'qrcode-svg';

  const uuid = '950a5f56-79a6-4a2e-bbca-01ab4f2703a9';
  let profileUrl = `${PUBLIC_BASE_URL}/profile/${uuid}`;

  let svgString = '';
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
</script>

<div>Hello, this is the upcoming frontpage</div>
