<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  let chart;
  let canvas;

  export let totalClicksByType;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Web', 'NFC', 'QR'],
        datasets: [
          {
            data: [totalClicksByType.web, totalClicksByType.nfc, totalClicksByType.qr],
            backgroundColor: ['#ea6947', '#0091d5', '#dbae59'],
            borderWidth: 0,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  });
</script>

<div class="chart">
    <canvas bind:this={canvas}/>
</div>

<style>
    .chart {
        height: 300px;
        margin: 0 auto;
    }
</style>
