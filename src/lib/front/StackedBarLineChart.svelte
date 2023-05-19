<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  export let clickCountsByDate;

  let canvas;

  onMount(() => {
    const dates = Object.keys(clickCountsByDate);
    const qrCounts = dates.map((date) => clickCountsByDate[date].qr || 0);
    const nfcCounts = dates.map((date) => clickCountsByDate[date].nfc || 0);
    const webCounts = dates.map((date) => clickCountsByDate[date].web || 0);

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'QR',
            data: qrCounts,
            backgroundColor: '#ea6947',
          },
          {
            label: 'NFC',
            data: nfcCounts,
            backgroundColor: '#0091d5',
          },
          {
            label: 'Web',
            data: webCounts,
            backgroundColor: '#dbae59',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
          },
        },
      },
    });
  });
</script>

<div class="chart">
    <canvas bind:this={canvas}/>
</div>