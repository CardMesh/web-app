<script>
	import { displaySuccess } from '../../js/toast.js';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { enhance } from '$app/forms';

	export let data;

	let email = data.email;
	let token = data.token;
	let password;

	const save = () => {
		return async ({ update, result }) => {
			await update({ reset: false });

			if (result.type === 'success') {
				displaySuccess('Successfully saved!');
			}
		};
	};
</script>

<div class="d-flex align-items-center justify-content-center vh-100">
	<div class="container" style="max-width: 600px" tabindex="-1">
		<div>
			<div class="rounded-2 shadow">
				<div class="p-5 pb-4 border-bottom-0">
					<h1 class="fw-bold mb-0 fs-2">Set your new password</h1>
				</div>

				<div class="p-5 pt-0">
					<form action="?/save" method="POST" use:enhance={save}>
						<div class="form-floating mb-3">
							<input
								bind:value={email}
								class="form-control rounded-3"
								disabled
								id="floatingInput"
								placeholder=""
								type="email"
							/>
							<label for="floatingInput">Email address</label>
						</div>
						<div class="form-floating mb-3">
							<input
								bind:value={password}
								class="form-control rounded-3"
								id="floatingPassword"
								name="password"
								placeholder=""
								type="password"
							/>
							<label for="floatingPassword">New password</label>
						</div>
						<input hidden name="token" type="text" value={token} />
						<input hidden name="email" type="text" value={email} />
						<button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">
							Reset password
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

<SvelteToast />
