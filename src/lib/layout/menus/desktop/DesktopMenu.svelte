<script>
  import {
    ArrowUpCircleIcon,
    CheckCircleIcon,
    EditIcon,
    LogOutIcon,
    PieChartIcon,
    SlidersIcon,
    UsersIcon
  } from 'svelte-feather-icons';
  import { goto } from '$app/navigation';
  import Cookies from 'js-cookie';
  import { displaySuccess } from '../../../../js/toast.js';
  import Logo from '$lib/logo/Logo.svelte';
  import DesktopMenuItem from '$lib/layout/menus/desktop/DesktopMenuItem.svelte';
  import MenuDivider from '$lib/layout/menus/MenuDivider.svelte';
  import { onMount } from 'svelte';
  import semver from 'semver';

  const resetPopoverState = () => {
    const popoverDiv = document.querySelectorAll('div.bs-popover-auto');

    // Remove the div manually
    popoverDiv.forEach((element) => {
      element.remove();
    });

    const popoverElements = document.querySelectorAll('[data-bs-toggle="popover"]');

    popoverElements.forEach((element) => {
      // Dispose of the existing popover instance
      if ('_bootstrap' in element) {
        element._bootstrap.dispose();
      }

      // Create a new popover instance and store the new instance in the '_bootstrap' property
      element._bootstrap = new bootstrap.Popover(element);
    });
  };

  let currentVersion = '1.0.0';

  let hasUpgrade = false;

  onMount(async () => {
    try {
      const fetchLatestVersion = await fetch(
        `https://api.github.com/repos/CardMesh/web-app/releases/latest`
      );

      const latestVersion = await fetchLatestVersion.json();

      hasUpgrade = semver.gt(latestVersion['tag_name'], currentVersion);
    } catch (err) {
      hasUpgrade = false;
    }
  });

  const handleLogout = () => {
    resetPopoverState();
    Cookies.remove('user');
    goto('/login', { replaceState: true });
    displaySuccess('Successfully logged out');
  };
  let role = JSON.parse(Cookies.get('user')).data.role;
</script>

<div
        class="d-flex flex-column flex-shrink-0 bg-body sidebar sticky-top border-end"
        style="width: 4.5rem;"
>
    <a
            class="d-block pe-3 ps-3 link-body-emphasis text-decoration-none"
            href="/admin"
    >
        <div class="d-flex align-items-center justify-content-center mt-2">
            <Logo size="57" text="false"/>
        </div>
    </a>
    <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li class="nav-item">
            <DesktopMenuItem href="/admin" name="Dashboard">
                <PieChartIcon class="align-middle" size="2x"/>
            </DesktopMenuItem>
        </li>
        <li class="nav-item">
            <DesktopMenuItem href="/admin/vcard" name="vCard">
                <EditIcon class="align-middle" size="2x"/>
            </DesktopMenuItem>
        </li>

        {#if ['admin', 'editor'].includes(role)}
            <MenuDivider/>

            <li class="nav-item">
                <DesktopMenuItem href="/admin/theme" name="Theme">
                    <SlidersIcon class="text-warning align-middle" size="2x"/>
                </DesktopMenuItem>
            </li>
        {/if}

        {#if 'admin' === role}
            <MenuDivider/>
            <li class="nav-item">
                <DesktopMenuItem href="/admin/users" name="Users">
                    <UsersIcon class="align-middle text-warning" size="2x"/>
                </DesktopMenuItem>
            </li>
        {/if}

        <MenuDivider/>
    </ul>

    <MenuDivider/>

    <ul class="nav nav-pills nav-flush flex-column text-center pb-4">
        <li class="nav-item">
            <DesktopMenuItem click="{handleLogout}" name="Logout">
                <LogOutIcon class="align-middle text-danger" size="2x"/>
            </DesktopMenuItem>
        </li>
    </ul>

    {#if 'admin' === role}
        <ul class="nav nav-pills nav-flush flex-column text-center pb-2">
            <li class="nav-item">
                <span class="small text-muted">{currentVersion}</span>
                {#if hasUpgrade}
                    <a href="https://github.com/CardMesh/rest-api/releases/latest" target="_blank">
                        <ArrowUpCircleIcon class="align-middle text-info" size="0.8x"/>
                    </a>
                {:else}
                    <CheckCircleIcon class="align-middle text-success" size="0.8x"/>
                {/if}
            </li>
        </ul>
    {/if}
</div>

<style>
    .sidebar {
        height: 100vh;
        max-height: 100vh;
        overflow-x: auto;
        overflow-y: hidden;
    }
</style>
