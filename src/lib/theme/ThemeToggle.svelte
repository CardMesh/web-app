<script>
  import { MoonIcon, SunIcon } from 'svelte-feather-icons';
  import Cookies from 'js-cookie';
  import { onMount } from 'svelte';

  let isDark;

  onMount(() => {
    let cookieValue = Cookies.get('user');
    let cookieObject = JSON.parse(cookieValue ?? '{}');

    const theme = cookieObject.data?.theme;
    isDark = theme ? theme === 'dark' : true; // default is dark
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

<button
        class="btn btn-action rounded-circle d-flex align-items-center justify-content-center"
        on:click={toggleTheme}
>
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
