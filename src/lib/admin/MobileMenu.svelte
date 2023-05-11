<script>
	import { EditIcon, HomeIcon, LogOutIcon, UsersIcon, SlidersIcon } from 'svelte-feather-icons';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Cookies from 'js-cookie';

	const handleLogout = () => {
		Cookies.remove('user');
		goto('/login');
	};
</script>

<div class="bg-body fixed-bottom border-top mt-5">
	<ul class="nav w-100 py-2">
		<li class="nav-item">
			<a
				aria-current={$page.url.pathname === '/admin' ? 'page' : undefined}
				class="btn btn-nav d-flex align-items-center justify-content-center mx-auto"
				data-bs-content="Home"
				href="/admin"
				role="button"
			>
				<HomeIcon class="align-middle" size="2x" />
			</a>
		</li>
		<li class="nav-item">
			<a
				aria-current={$page.url.pathname === '/admin/edit' ? 'page' : undefined}
				class="btn btn-nav d-flex align-items-center justify-content-center mx-auto"
				href="/admin/edit"
				role="button"
			>
				<EditIcon class="align-middle" size="2x" />
			</a>
		</li>

		<li class="nav-item">
			<a
				aria-current={$page.url.pathname === '/admin/users' ? 'page' : undefined}
				class="btn btn-nav d-flex align-items-center justify-content-center mx-auto"
				href="/admin/users"
				role="button"
			>
				<UsersIcon class="text-warning align-middle" size="2x" />
			</a>
		</li>

		<li class="nav-item">
			<a
				aria-current={$page.url.pathname === '/admin/theme' ? 'page' : undefined}
				class="btn btn-nav d-flex align-items-center justify-content-center mx-auto"
				href="/admin/theme"
				role="button"
			>
				<SlidersIcon class="text-warning align-middle" size="2x" />
			</a>
		</li>

		<li class="nav-item">
			<button
				class="btn btn-nav d-flex align-items-center justify-content-center mx-auto"
				on:click={handleLogout}
			>
				<LogOutIcon class="align-middle text-danger" size="2x" />
			</button>
		</li>
	</ul>
</div>

<style>
	.nav-item {
		flex: 1;
	}

	.btn-nav {
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		font-size: 12px;
	}

	a[aria-current='page'] {
		color: white;
		background-color: grey;
	}
</style>
