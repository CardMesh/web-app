<script>
	import SocialIcons from '@rodneylab/svelte-social-icons';

	export let link;

	export let network;

	export let size = 22;
</script>

{#if link}
	<a href={link} target="_blank">
		<SocialIcons alt={network} height={size} {network} width={size} />
	</a>
{/if}
