<script>
	import { EditIcon, HomeIcon, LogOutIcon, UsersIcon } from 'svelte-feather-icons';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Cookies from 'js-cookie';
	import { displaySuccess } from '../../js/toast.js';

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
			element._bootstrap = new bootstrap.Popover(element) ;
		});
	};

	const handleLogout = () => {
		resetPopoverState();
		Cookies.remove('user');
		goto('/login');
		displaySuccess('Successfully logged out')
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
			<svg xmlns="http://www.w3.org/2000/svg" class="logo-svg" height="40" viewBox="0 0 177.99 200" xml:space="preserve"><path d="M167.078 129.863V68.606c6.193-1.064 10.912-6.448 10.912-12.946 0-7.263-5.887-13.15-13.15-13.15s-13.15 5.888-13.15 13.15c0 3.644 1.484 6.94 3.877 9.322l-16.705 28.616-41.206-70.662c2.688-2.408 4.389-5.894 4.389-9.786C102.045 5.888 96.156 0 88.894 0c-7.263 0-13.151 5.888-13.151 13.15 0 3.696 1.53 7.03 3.984 9.419L38.309 93.598l-16.42-28.129c2.701-2.408 4.413-5.905 4.413-9.809 0-7.263-5.888-13.15-13.15-13.15S0 48.397 0 55.66c0 6.208 4.307 11.398 10.092 12.778v61.593C4.308 131.412 0 136.604 0 142.811c0 7.262 5.888 13.15 13.15 13.15 3.755 0 7.133-1.582 9.529-4.104l53.499 30.949a13.107 13.107 0 0 0-.64 4.043c0 7.262 5.888 13.15 13.15 13.15 7.264 0 13.151-5.889 13.151-13.15 0-1.451-.244-2.84-.676-4.143l53.865-31.162c2.408 2.703 5.904 4.416 9.811 4.416 7.264 0 13.15-5.889 13.15-13.15.001-6.497-4.718-11.88-10.911-12.947zm-6.289-61.695c.059.019.115.042.174.059v62.017c-.207.063-.404.143-.605.217l-17.955-30.793 18.386-31.5zm-75.811-42.46c1.237.385 2.552.593 3.917.593 1.17 0 2.299-.168 3.379-.455l43.047 73.82L91.867 174.1c-1.02-.252-2.081-.4-3.178-.4-1.162 0-2.285.164-3.359.449L41.851 99.666l43.127-73.958zm-50.209 73.96-17.818 30.555a11.52 11.52 0 0 0-.742-.191V68.438c.096-.022.191-.048.287-.073l18.273 31.303zm-9.019 46.898a13.107 13.107 0 0 0-3.52-13.256l16.081-27.576 41.63 71.314c-.195.176-.394.346-.579.533L25.75 146.566zm72.189 30.94c-.203-.203-.422-.391-.639-.58l41.559-71.191 16.387 28.104a13.091 13.091 0 0 0-3.557 8.973c0 1.156.164 2.273.443 3.344l-54.193 31.35z"/></svg>
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

	.logo-svg path {
		animation: color-float 20s infinite;
	}

	@keyframes color-float {
		0% {
			fill: #6bb187;
		}
		50% {
			fill: #0091d5;
		}
		100% {
			fill: #6bb187;
		}
	}
</style>
