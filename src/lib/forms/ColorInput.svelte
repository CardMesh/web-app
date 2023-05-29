<script>
  export let value = '';
  export let id = '';
  export let name = '';
  export let label = '';
</script>

<div class="input-group mb-3">
	<span class="input-group-text">
		<span class="input-group color-input-wrapper align-middle">
			<input bind:value class="form-control form-control-color" type="color"/>
		</span>
	</span>
    <div class="form-floating flex-grow-1">
        <input bind:value class="form-control" id="{id}" name="{name}" placeholder="" type="text"/>
        <label for="{id}">{label}</label>
    </div>
</div>

<style>
    .color-input-wrapper {
        height: 1.5em;
        width: 1.5em;
        overflow: hidden;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        position: relative;
    }

    .color-input-wrapper input[type='color'] {
        position: absolute;
        height: 5em;
        width: 5em;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        border: none;
        margin: 0;
        padding: 0;
    }
</style>
