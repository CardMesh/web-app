<script>
	export let width = '390px';
	export let height = '780px';
</script>

<!-- inspired by: https://codepen.io/annasrauther/pen/yeZdpa -->
<div id="wrapper">
	<div class="phone" style="width: {width}; height: {height};">
		<slot />
	</div>
</div>

<style lang="scss">
	$border-color: #121212;
	$shadow-color: #000;

	:root {
		--initial-scale: 1;
	}

	.phone {
		background: #212529;
		border: 55px solid $border-color;
		border-width: 55px 7px;
		border-radius: 40px;
		margin: 0 auto;
		overflow: auto;
		box-shadow: 0 3px 0 $shadow-color, 0 4px 0 $shadow-color, 0 5px 0 $shadow-color,
			0 7px 0 $shadow-color, 0 10px 20px $shadow-color;
		transform: scale(var(--initial-scale));
		transition: transform 0.3s ease-out;
	}

	@media (max-width: 1400px) {
		:root {
			--initial-scale: 0.9;
		}
	}

	@media (max-width: 1300px) {
		:root {
			--initial-scale: 0.8;
		}
	}

	@media (max-width: 1200px) {
		:root {
			--initial-scale: 0.7;
		}
	}

	@media (max-width: 1030px) {
		:root {
			--initial-scale: 0.6;
		}
	}
</style>
