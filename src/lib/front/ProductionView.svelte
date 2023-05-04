<div class="container p-0">
	<div class="rounded-3 overflow-hidden shadow">
		<slot />
	</div>
</div>

<style lang="scss">
	@media (min-width: 500px) {
		.container {
			max-width: 500px;
			padding-top: 50px !important;
		}
	}
</style>
