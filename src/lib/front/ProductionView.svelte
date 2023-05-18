<div class="container p-0">
	<div class="overflow-hidden shadow-custom rounded-custom">
		<slot />
	</div>
</div>

<style lang="scss">
	@media (min-width: 500px) {
		.container {
			max-width: 500px;
			padding-top: 50px !important;
		}

		.rounded-custom {
			border-radius: 0.5rem;
		}

		.shadow-custom {
			padding-top-webkit-box-shadow: 8px 10px 11px -4px rgba(0, 0, 0, 0.71);
			-moz-box-shadow: 8px 10px 11px -4px rgba(0, 0, 0, 0.71);
			box-shadow: 8px 10px 11px -4px rgba(0, 0, 0, 0.71);
		}
	}
</style>
