<script>
	import { Edit2Icon, EyeIcon, TrashIcon } from 'svelte-feather-icons';
</script>

<div class="table-responsive">
	<table class="table">
		<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">Name</th>
				<th scope="col">Email</th>
				<th class="text-end" scope="col">Actions</th>
			</tr>
		</thead>
		<tbody class="table-group-divider">
			<tr>
				<th class="align-middle" scope="row">1</th>
				<td class="align-middle">John Doe</td>
				<td class="align-middle">johndoe@example.com</td>
				<td class="text-end">
					<button
						class=" btn btn-action rounded-circle"
						data-bs-content="btn"
						data-bs-placement="top"
						data-bs-toggle="popover"
						data-bs-trigger="hover"
					>
						<div class="d-flex align-items-center justify-content-center text-info">
							<EyeIcon size="2x" />
						</div>
					</button>

					<button
						class=" btn btn-action rounded-circle"
						data-bs-content="btn"
						data-bs-placement="top"
						data-bs-toggle="popover"
						data-bs-trigger="hover"
					>
						<div class="d-flex align-items-center justify-content-center text-warning">
							<Edit2Icon size="2x" />
						</div>
					</button>

					<button
						class="btn btn-action rounded-circle"
						data-bs-content="btn"
						data-bs-placement="top"
						data-bs-toggle="popover"
						data-bs-trigger="hover"
					>
						<div class="d-flex align-items-center justify-content-center text-danger">
							<TrashIcon size="2x" />
						</div>
					</button>
				</td>
			</tr>
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
