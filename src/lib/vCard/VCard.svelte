<script>
  import { PUBLIC_REST_API_URL } from '$env/static/public';
  import { onMount } from 'svelte';

  export let vCardOptions;
  export let className;
  export let backgroundColor;
  export let color;

  let link;

  onMount(() => {
    const detectOperatingSystem = () => {
      const userAgent = navigator.userAgent;

      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 3; // 'iOS'
      } else if (/Android|Windows|Linux/.test(userAgent)) {
        return 4; // 'Android', 'Windows', 'Linux'
      }

      return 3;
    };

    link = `${PUBLIC_REST_API_URL}/uploads/${
      vCardOptions.uuid
    }/profile${detectOperatingSystem()}.vcf`;
  });
</script>

<a class={className} href={link} style="background-color: {backgroundColor}; color: {color}">
    <slot/>
</a>
