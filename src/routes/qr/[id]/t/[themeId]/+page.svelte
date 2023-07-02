<script>
  export let data;
</script>

<svelte:head>
    <title>QR-code</title>
    <meta content="QR-code" name="description"/>
</svelte:head>

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
