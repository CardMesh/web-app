<script>
  import { PUBLIC_REST_API_URL } from '$env/static/public';
  import { onMount } from 'svelte';

  export let vCard;
  export let className;
  export let backgroundColor;
  export let color;

  let link;

  onMount(() => {
    const detectOperatingSystem = () => {
      const userAgent = window.navigator.userAgent;

      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 3; // 'iOS'
      } else if (/Android|Windows|Linux/.test(userAgent)) {
        return 4; // 'Android', 'Windows', 'Linux'
      }

      return 3;
    };

    link = `${PUBLIC_REST_API_URL}/api/v1/users/${vCard.userId}/vcf?v=${detectOperatingSystem()}`;
  });

  const handleClick = () => {
    window.location.href = link;
  };
</script>

<button class={className} on:click={handleClick} style="background-color: {backgroundColor}; color: {color}">
    <slot/>
</button>
