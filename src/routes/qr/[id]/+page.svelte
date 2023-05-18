<script>
  export let data;
  const vCardOptions = data.vCards.data;

  export let options = {
    ...vCardOptions
  };
</script>

<svelte:head>
    <title>{`${options.firstName} ${options.lastName} - Personal Profile`}</title>
    <meta
            content="`Discover ${options.firstName} ${options.lastName}'s personal business card, including contact information, social media profiles, and a brief bio. Connect with ${options.firstName} and learn more about their background.`"
            name="description"
    />
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
