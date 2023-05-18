<script>
  const genders = [
    'M', // Male
    'F', // Female
    'N', // Not applicable
    'O' // Other
  ];
</script>

<ul>
    {#each genders as gender}
        <li>{gender}</li>
    {/each}
</ul>
