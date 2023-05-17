<script>
	import AdminMain from '$lib/admin/AdminMain.svelte';
	import { Edit2Icon, EyeIcon, TrashIcon, SendIcon, UserPlusIcon } from 'svelte-feather-icons';
	import { displaySuccess } from '../../../js/toast.js';
	import Phone from '$lib/front/Phone.svelte';
	import SocialIconTextInput from '$lib/common/SocialIconTextInput.svelte';
	import { enhance } from '$app/forms';

	export let data;

	let isLoading = false;
	const save = () => {
		isLoading = true;
		return async ({ update, result }) => {
			await update({ reset: false });

			if (result.type === 'success') {
				displaySuccess('Successfully saved!');
			}

			isLoading = false;
		};
	};

	let text;
</script>

<svelte:head>
	<title>Users</title>
	<meta content="Users" />
</svelte:head>

<AdminMain>
	<div
		class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
	>
		<h1 class="h2">Users</h1>
	</div>

	<button
		type="button"
		class="btn btn-primary"
		data-bs-toggle="modal"
		data-bs-target="#createUserModal">Create new user</button
	>

	<div
		class="modal fade"
		id="createUserModal"
		tabindex="-1"
		aria-labelledby="createUserModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="createUserModalLabel">Create user</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
				</div>
				<div class="modal-body">
					<form action="?/create" method="POST" use:enhance={save}>
						<div class="mb-3">
							<label for="nameInput" class="col-form-label">Name:</label>
							<input type="text" class="form-control" id="nameInput" name="name" />
						</div>
						<div class="mb-3">
							<label for="nameEmail" class="col-form-label">Email:</label>
							<input type="email" class="form-control" id="nameEmail" name="email" />
						</div>

						<div class="form-check form-switch">
							<input
								class="form-check-input"
								type="checkbox"
								role="switch"
								id="sendMailSwitch"
								name="sendMail"
								checked
							/>
							<label class="form-check-label" for="sendMailSwitch">Send reset password email</label>
						</div>

						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create user</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<!--   <form action="?/send" method="POST" use:enhance={save}>
        <input type="text" value="{user.uuid}" name="uuid" hidden>
        <button type="submit" class="btn btn-action rounded-circle d-flex align-items-center justify-content-center" data-bs-content="btn" data-bs-placement="top">
            <div class="d-flex text-success">
                <SendIcon size="2x"/> Create new user
            </div>
        </button>
    </form>
   -->

	<div class="table-responsive">
		<table class="table">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Role</th>
					<th scope="col">Name</th>
					<th scope="col">Email</th>
					<th class="text-end" scope="col">Actions</th>
				</tr>
			</thead>
			<tbody class="table-group-divider">
				{#each data.users.data as user}
					<tr>
						<th class="align-middle" scope="row">{user.uuid}</th>
						<td class="align-middle">{user.role}</td>
						<td class="align-middle">{user.name}</td>
						<td class="align-middle">{user.email}</td>
						<td class="d-flex justify-content-end">
							<a
								class="btn btn-action rounded-circle d-flex align-items-center justify-content-center"
								data-bs-content="btn"
								data-bs-placement="top"
								role="button"
								href="/profile/{user.uuid}"
								target="_blank"
							>
								<div class="d-flex text-info">
									<EyeIcon size="2x" />
								</div>
							</a>

							<a
								class="btn btn-action rounded-circle d-flex align-items-center justify-content-center"
								data-bs-content="btn"
								data-bs-placement="top"
								role="button"
								href="/admin/edit?uuid={user.uuid}"
							>
								<div class="d-flex text-warning">
									<Edit2Icon size="2x" />
								</div>
							</a>

							<form action="?/send" method="POST" use:enhance={save}>
								<input type="text" value={user.uuid} name="uuid" hidden />
								<button
									type="submit"
									class="btn btn-action rounded-circle d-flex align-items-center justify-content-center"
									data-bs-content="btn"
									data-bs-placement="top"
								>
									<div class="d-flex text-success">
										<SendIcon size="2x" />
									</div>
								</button>
							</form>

							<button
								class="btn btn-action rounded-circle"
								data-bs-content="btn"
								data-bs-placement="top"
								data-bs-toggle="modal"
								data-bs-target="#{user.uuid}Modal"
							>
								<div class="d-flex align-items-center justify-content-center text-danger">
									<TrashIcon size="2x" />
								</div>
							</button>

							<!-- Modal -->
							<div
								class="modal fade"
								id="{user.uuid}Modal"
								tabindex="-1"
								aria-labelledby="{user.uuid}ModalLabel"
								aria-hidden="true"
							>
								<div class="modal-dialog">
									<div class="modal-content">
										<div class="modal-header">
											<h1 class="modal-title fs-5" id="{user.uuid}ModalLabel">Modal title</h1>
											<button
												type="button"
												class="btn-close"
												data-bs-dismiss="modal"
												aria-label="Close"
											/>
										</div>
										<div class="modal-body">
											Are you sure, that you want to delete <strong>{user.name}</strong>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
												>No
											</button>
											<button type="button" class="btn btn-primary">Yes</button>
										</div>
									</div>
								</div>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!--
    <div class="alert alert-primary" role="alert">A simple primary alert—check it out!</div>
    <div class="alert alert-secondary" role="alert">A simple secondary alert—check it out!</div>
    <div class="alert alert-success" role="alert">A simple success alert—check it out!</div>
    <div class="alert alert-danger" role="alert">A simple danger alert—check it out!</div>
    <div class="alert alert-warning" role="alert">A simple warning alert—check it out!</div>
    <div class="alert alert-info" role="alert">A simple info alert—check it out!</div>
    <div class="alert alert-light" role="alert">A simple light alert—check it out!</div>
    <div class="alert alert-dark" role="alert">A simple dark alert—check it out!</div>
    -->
</AdminMain>

<style>
	.btn-action {
		width: 50px !important;
		max-width: 100% !important;
		max-height: 100% !important;
		height: 50px !important;
		text-align: center;
		padding: 0;
		font-size: 10px;
	}

	.btn-action:hover {
		color: white;
		background-color: grey;
	}
</style>
