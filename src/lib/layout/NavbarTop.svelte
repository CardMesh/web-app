<script>
  import Logo from '$lib/logo/Logo.svelte';
  import ThemeToggle from '$lib/theme/ThemeToggle.svelte';
</script>

<div class="sticky-top bg-body border-bottom">
    <div class="d-flex align-items-center" style="height: 4.5rem;">
        <a class="d-flex align-items-center me-auto text-decoration-none px-3" href="/admin">
            <Logo logo="false" size="40"></Logo>
        </a>
        <span class="nav nav-pills px-4">
            <ThemeToggle/>
        </span>
    </div>
</div>
