<div class="sticky-top bg-body">
	<header
		class="d-flex flex-wrap justify-content-center border-bottom align-content-center"
		style="height: 4.5rem;"
	>
		<a
			class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
			href="/src/routes/public"
		>
			<span class="fs-5 px-4">meishi</span>
		</a>

		<ul class="nav nav-pills">
			<li class="nav-item"><a class="nav-link" href="#">johndoe@example.com</a></li>
		</ul>

		<div class="dropdown bd-mode-toggle mx-5">
			<button
				aria-expanded="false"
				aria-label="Toggle theme (light)"
				class="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
				data-bs-toggle="dropdown"
				id="bd-theme"
				type="button"
			>
				<svg class="bi my-1 theme-icon-active" height="1em" width="1em">
					<use href="#sun-fill" />
				</svg>
				<span class="visually-hidden" id="bd-theme-text">Toggle theme</span>
			</button>
			<ul aria-labelledby="bd-theme-text" class="dropdown-menu dropdown-menu-end shadow">
				<li>
					<button
						aria-pressed="true"
						class="dropdown-item d-flex align-items-center active"
						data-bs-theme-value="light"
						type="button"
					>
						<svg class="bi me-2 opacity-50 theme-icon" height="1em" width="1em">
							<use href="#sun-fill" />
						</svg>
						Light
						<svg class="bi ms-auto d-none" height="1em" width="1em">
							<use href="#check2" />
						</svg>
					</button>
				</li>
				<li>
					<button
						aria-pressed="false"
						class="dropdown-item d-flex align-items-center"
						data-bs-theme-value="dark"
						type="button"
					>
						<svg class="bi me-2 opacity-50 theme-icon" height="1em" width="1em">
							<use href="#moon-stars-fill" />
						</svg>
						Dark
						<svg class="bi ms-auto d-none" height="1em" width="1em">
							<use href="#check2" />
						</svg>
					</button>
				</li>
				<li>
					<button
						aria-pressed="false"
						class="dropdown-item d-flex align-items-center"
						data-bs-theme-value="auto"
						type="button"
					>
						<svg class="bi me-2 opacity-50 theme-icon" height="1em" width="1em">
							<use href="#circle-half" />
						</svg>
						Auto
						<svg class="bi ms-auto d-none" height="1em" width="1em">
							<use href="#check2" />
						</svg>
					</button>
				</li>
			</ul>
		</div>
	</header>
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

	.bd-mode-toggle {
		z-index: 1500;
	}
</style>
