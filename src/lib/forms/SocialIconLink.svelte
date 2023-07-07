<script>
  import SocialIcons from '@rodneylab/svelte-social-icons';

  export let link;

  export let network;

  export let size = 22;

  export let fontColor = '';

  export let backgroundColor = '';
</script>

{#if link}
    {#if backgroundColor.length > 0 && fontColor.length > 0}
        <a href={link} target="_blank">
            <SocialIcons alt={network} height={size} network="{network}" width={size} fgColor="{fontColor}"
                         bgColor="{backgroundColor}"/>
        </a>
    {:else}
        <a href={link} target="_blank">
            <SocialIcons alt={network} height={size} network="{network}" width={size}/>
        </a>
    {/if}
{/if}
