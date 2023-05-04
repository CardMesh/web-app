<script>
	export let width = '400px';
	export let height = '800px';
</script>

<div class="mx-auto">
	<div class="phone" style="width: {width}; height: {height};">
		<slot />
	</div>
</div>

<style lang="scss">
	$border-color: #121212;
	$shadow-color: #000;

	.phone {
		background: #212529;
		border: 55px solid $border-color;
		border-width: 55px 7px;
		border-radius: 40px;
		margin: 0 auto;
		overflow: auto;
		box-shadow: 0 3px 0 $shadow-color, 0 4px 0 $shadow-color, 0 5px 0 $shadow-color,
			0 7px 0 $shadow-color, 0 10px 20px $shadow-color;
	}
</style>
