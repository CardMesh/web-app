<script>
  import { MoonIcon, SunIcon } from 'svelte-feather-icons';
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';

  let isDark;

  onMount(() => {
    let cookieValue = Cookies.get('user');
    let cookieObject = JSON.parse(cookieValue ?? '{}');
    isDark = cookieObject.data.theme === 'dark';
  });

  const toggleTheme = () => {
    isDark = !isDark;
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);

    let cookieObject = JSON.parse(Cookies.get('user') ?? '{}');
    cookieObject.data.theme = theme;
    Cookies.set('user', JSON.stringify(cookieObject));
  };
</script>

<div class="sticky-top bg-body border-bottom">
    <div class="d-flex align-items-center" style="height: 4.5rem;">
        <a class="d-flex align-items-center me-auto text-decoration-none px-4" href="/admin">
            <span class="fs-5">meishi</span>
        </a>

        <ul class="nav nav-pills px-4">
            <button class="btn btn-action rounded-circle d-flex align-items-center justify-content-center"
                    on:click={toggleTheme}>
                {#if isDark}
                    <div class="text-warning">
                        <SunIcon size="2x"/>
                    </div>
                {:else}
                    <div class="text-dark">
                        <MoonIcon size="2x"/>
                    </div>
                {/if}
            </button>
        </ul>
    </div>
</div>

<style>
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
