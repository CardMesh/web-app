<script>
  import SvelteSeo from 'svelte-seo';

  export let data;
</script>

<SvelteSeo
        description="QR-code"
        title="QR-code"
/>

<div class="qr-container">
    {@html data.qrCode}
</div>

<style>
    .qr-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #fff;
    }
</style>
