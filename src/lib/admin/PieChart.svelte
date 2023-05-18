<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  let chart;
  let canvas;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['URL', 'NFC', 'QR'],
        datasets: [
          {
            data: [55, 180, 10],
            backgroundColor: ['#ea6947', '#0091d5', '#dbae59'],
            borderWidth: 1, // Change border width
            borderColor: '#ffffff' // Change border color
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Change tooltip background color
            titleColor: '#fff', // Change tooltip title color
            bodyColor: '#fff', // Change tooltip body color
            borderColor: '#adb5bd', // Change tooltip border color
            borderWidth: 1 // Change tooltip border width
          }
        }
      }
    });
  });
</script>

<div class="chart-container">
    <canvas bind:this={canvas}/>
</div>

<!--
<div class="alert alert-primary" role="alert">A simple primary alert—check it out!</div>
<div class="alert alert-secondary" role="alert">A simple secondary alert—check it out!</div>
<div class="alert alert-success" role="alert">A simple success alert—check it out!</div>
<div class="alert alert-danger" role="alert">A simple danger alert—check it out!</div>
<div class="alert alert-warning" role="alert">A simple warning alert—check it out!</div>
<div class="alert alert-info" role="alert">A simple info alert—check it out!</div>
<div class="alert alert-light" role="alert">A simple light alert—check it out!</div>
<div class="alert alert-dark" role="alert">A simple dark alert—check it out!</div>
-->

<style>
    .chart-container {
        max-width: 600px;
        margin: 0 auto;
    }
</style>
