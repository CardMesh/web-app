<script>
  import { page } from '$app/stores';
  import Heading from '$lib/layout/Heading.svelte';
  import SvelteSeo from 'svelte-seo';
</script>

<SvelteSeo
        description="{$page.error.message}"
        title="{$page.error.message}"
/>

<main class="vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="container d-flex flex-column align-items-center justify-content-center">
        <Heading size="h1" tag="h1">{$page.error.message}</Heading>
    </div>
</main>
