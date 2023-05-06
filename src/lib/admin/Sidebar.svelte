<script>
	import { EditIcon, HomeIcon, LogOutIcon, UsersIcon } from 'svelte-feather-icons';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Cookies from 'js-cookie';

	// TODO add this method to the report.. Beskrive teknisk udfordring..
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

	const handleLogout = () => {
		resetPopoverState();
		Cookies.remove('user');
		goto('/login');
	};
</script>

<div
	class="d-flex flex-column flex-shrink-0 bg-body test sticky-top border-end"
	style="width: 4.5rem;"
>
	<a
		class="d-block p-3 link-body-emphasis text-decoration-none"
		data-bs-placement="right"
		data-bs-toggle="tooltip"
		href="/admin"
	>
		<div class="d-flex align-items-center justify-content-center">
			<img alt="" src="https://fakeimg.pl/40/" />
		</div>
	</a>
	<ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
		<li class="nav-item">
			<a
				aria-current={$page.url.pathname === '/admin' ? 'page' : undefined}
				class="mt-2 my-2 btn btn-nav d-flex align-items-center justify-content-center mx-auto"
				data-bs-content="Home"
				data-bs-placement="right"
				data-bs-toggle="popover"
				data-bs-trigger="hover"
				href="/admin"
				on:click={resetPopoverState()}
				role="button"
			>
				<HomeIcon class="align-middle" size="2x" />
			</a>
		</li>
		<li class="nav-item">
			<a
				aria-current={$page.url.pathname === '/admin/edit' ? 'page' : undefined}
				class="mt-2 my-2 btn btn-nav d-flex align-items-center justify-content-center mx-auto"
				data-bs-content="Edit"
				data-bs-placement="right"
				data-bs-toggle="popover"
				data-bs-trigger="hover"
				href="/admin/edit"
				on:click={resetPopoverState()}
				role="button"
			>
				<EditIcon class="align-middle" size="2x" />
			</a>
		</li>

		<div class="py-4">
			<div class="border-bottom border-1 mx-2" />
		</div>
		<li class="nav-item">
			<a
				aria-current={$page.url.pathname === '/admin/users' ? 'page' : undefined}
				class="mt-2 my-2 btn btn-nav d-flex align-items-center justify-content-center mx-auto"
				data-bs-content="Users"
				data-bs-placement="right"
				data-bs-toggle="popover"
				data-bs-trigger="hover"
				href="/admin/users"
				on:click={resetPopoverState()}
				role="button"
			>
				<UsersIcon class="text-warning align-middle" size="2x" />
			</a>
		</li>

		<div class="py-4">
			<div class="border-bottom border-1 mx-2" />
		</div>

		<li class="nav-item">
			<a
				aria-current={$page.url.pathname === '/admin/api' ? 'page' : undefined}
				class="mt-2 my-2 btn btn-nav d-flex align-items-center justify-content-center mx-auto"
				data-bs-content="API"
				data-bs-placement="right"
				data-bs-toggle="tooltip"
				data-bs-trigger="hover"
				href="/admin/api"
				on:click={resetPopoverState()}
				role="button"
			>
				<UsersIcon class="text-warning align-middle" size="2x" />
			</a>
		</li>

		<div class="py-4">
			<div class="border-bottom border-1 mx-2" />
		</div>
	</ul>

	<div class="py-4">
		<div class="border-bottom border-1 mx-2" />
	</div>

	<ul class="nav nav-pills nav-flush flex-column text-center pb-4">
		<li class="nav-item">
			<button
				class="mt-2 my-2 btn btn-nav d-flex align-items-center justify-content-center mx-auto"
				data-bs-content="Logout"
				data-bs-placement="right"
				data-bs-toggle="popover"
				data-bs-trigger="hover"
				on:click={handleLogout}
			>
				<LogOutIcon class="align-middle text-danger" size="2x" />
			</button>
		</li>
	</ul>

	<ul class="nav nav-pills nav-flush flex-column text-center pb-2">
		<li aria-current={$page.url.pathname === '/' ? 'page' : undefined} class="nav-item">
			<span class="small text-muted">1.0.0</span>
		</li>
	</ul>
</div>

<style>
	.bi {
		vertical-align: -0.125em;
		fill: currentColor;
	}

	.nav-scroller .nav {
		display: flex;
		flex-wrap: nowrap;
		padding-bottom: 1rem;
		margin-top: -1px;
		overflow-x: auto;
		text-align: center;
		white-space: nowrap;
		-webkit-overflow-scrolling: touch;
	}

	.btn-nav {
		width: 50px !important;
		max-width: 100% !important;
		max-height: 100% !important;
		height: 50px !important;
		text-align: center;
		padding: 0;
		font-size: 12px;
	}

	.btn-nav:hover,
	a[aria-current='page'] {
		color: white;
		background-color: grey;
	}
</style>
