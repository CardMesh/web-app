<script>
  import SocialIcons from '@rodneylab/svelte-social-icons';

  export let value = '';
  export let id = '';
  export let name = '';
  export let label = '';
  export let network = '';
</script>

<div class="input-group mb-3">
	<span class="input-group-text">
		<SocialIcons alt="" height="24" {network} width="24"/>
	</span>
    <div class="form-floating flex-grow-1">
        <input bind:value class="form-control" id="{id}" name="{name}" placeholder="" type="text"/>
        <label for={id}>{label}</label>
    </div>
</div>
