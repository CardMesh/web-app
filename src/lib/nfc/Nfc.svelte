<script>
  import { displayError, displaySuccess, displayWarning } from '../../js/toast.js';

  let showOverlay = false;

  const handleClick = () => {
    showOverlay = false;
  };

  export let className;

  export let profileUrl = '';

  const writeTag = async () => {
    if (!('NDEFReader' in window)) {
      return displayWarning('Unfortunately, writing with Web NFC isn\'t supported on your device.');
    }

    showOverlay = true;

    const ndef = new NDEFReader();
    try {
      await ndef.write({
        records: [{
          recordType: 'url',
          data: profileUrl
        }]
      });

      showOverlay = false;
      displaySuccess('Your NFC tag has been successfully written!');

      // This workaround prevents the phone from reading the NFC tag immediately after the write operation.
      const abortController = new AbortController();
      await ndef.scan({ signal: abortController.signal });
    } catch (err) {
      if (err instanceof DOMException && err.message.includes('Failed to write due to an IO error: null')) {
        showOverlay = false;
        displayError('It seems like the tag was removed a bit too soon. Please give it another try.');
      } else if (err instanceof AbortError && err.message.includes('Push is cancelled due to a new push request.')) {
        showOverlay = true;
      } else {
        displayWarning('Unfortunately, writing with Web NFC isn\'t supported on your device.');
        showOverlay = false;
      }
    }
  };
</script>

{#if showOverlay}
    <div class="modal-dialog overlay text-center" on:click={handleClick}>
        <div class="modal-content">
            <div class="modal-body mb-5">
                <svg viewBox="0 0 190.99 134.53" class="responsive-svg color-svg"
                     xmlns="http://www.w3.org/2000/svg">
                    <path transform="translate(-714.81 -612.55)"
                          d="m747.38 637.58a2.188 2.188 0 0 0-2.465-3.616 33.782 33.782 0 0 0 0 55.857 2.187 2.187 0 0 0 2.462-3.615 29.405 29.405 0 0 1 0-48.625"/>
                    <path transform="translate(-718.75 -617.95)"
                          d="m758.36 711.55a45.171 45.171 0 0 1 7.744-89.177v17.317l-4.748-5.026a2.187 2.187 0 0 0-3.18 3l8.518 9.023a2.19 2.19 0 0 0 3.182 0l8.519-9.023a2.187 2.187 0 1 0-3.18-3l-4.737 5.015v-19.548a2.186 2.186 0 0 0-2.186-2.187 49.544 49.544 0 0 0-10.888 97.875 2.187 2.187 0 0 0 0.958-4.269"/>
                    <path transform="translate(-708.02 -609.48)"
                          d="M765.557,675.607a2.179,2.179,0,0,0,1.26-.4c6.151-4.343,9.541-10.082,9.541-16.164s-3.39-11.821-9.541-16.163a2.187,2.187,0,1,0-2.522,3.573c4.957,3.5,7.687,7.97,7.687,12.589,0,4.145-2.2,8.173-6.233,11.484l-12.21-12.162a2.188,2.188,0,1,0-3.088,3.1l13.561,13.5a2.183,2.183,0,0,0,1.544.638"/>
                    <path transform="translate(-710.85 -609.48)"
                          d="m751.15 675.21a2.188 2.188 0 0 0 2.524-3.575c-4.959-3.5-7.689-7.971-7.689-12.591 0-4.145 2.2-8.17 6.233-11.482l12.21 12.16a2.187 2.187 0 0 0 3.088-3.1l-13.561-13.507a2.189 2.189 0 0 0-2.805-0.237c-6.151 4.343-9.541 10.083-9.541 16.164s3.39 11.821 9.541 16.165"/>
                    <path transform="translate(-708.78 -617.65)"
                          d="M899.531,738.537c-2.064-3.981-20.169-38.975-22.784-41.99l-.53-.619c-2.485-2.938-5.282-6.262-9.51-6.565-2.925-.211-11.228-.34-14.835-.386l-9.23-43.722-.008-.031a8.684,8.684,0,0,0-10.308-6.681l-29.8,6.326a49.258,49.258,0,0,0-5.685-8.835,49.753,49.753,0,0,0-27.62-17.168,2.187,2.187,0,0,0-.958,4.267,45.369,45.369,0,0,1,25.179,15.655,44.6,44.6,0,0,1,4.645,7.02l-11.27,2.393a33.752,33.752,0,0,0-9-9.112,2.187,2.187,0,1,0-2.471,3.609,29.375,29.375,0,0,1,7.508,7.456,8.7,8.7,0,0,0-2.81,8.375l4.737,22.121a29.4,29.4,0,0,1-9.435,10.621,2.187,2.187,0,1,0,2.471,3.609,33.741,33.741,0,0,0,8.28-8.076l2.887,13.49a44.969,44.969,0,0,1-28.479,12.015V695.383l4.735,5.015a2.188,2.188,0,0,0,3.18-3.005l-8.52-9.022a2.256,2.256,0,0,0-3.18,0l-8.517,9.022a2.188,2.188,0,0,0,3.18,3.005l4.745-5.028v19.182a2.189,2.189,0,0,0,2.189,2.188A49.364,49.364,0,0,0,790.039,705.2l8.578,40.072.008.031a8.685,8.685,0,0,0,10.309,6.682l43.124-9.12v0a2.1,2.1,0,1,0-.868-4.1v0L808.1,747.875a4.472,4.472,0,0,1-5.3-3.429L784.233,657.7a4.48,4.48,0,0,1,3.429-5.3l45.516-9.649a4.479,4.479,0,0,1,5.3,3.429l11.984,56.5-14.75-6.794c-6.179-2.856-9.5-.49-10.932,1.166a8.825,8.825,0,0,0-2.35,5.724,8.247,8.247,0,0,0,3.253,6.289c1.075.977,4.593,3.441,11.6,8.314l6.3,4.359c-16.756,3.46-30.342,6.246-35.76,7.349a2.1,2.1,0,0,0-1.653,2.42l.027.1,0,0a2.1,2.1,0,0,0,2.479,1.64c1.734-.354,17.476-3.592,39.7-8.2,3.028,2.1,5.475,3.8,6.254,4.4,1.281.971,2.354,3.35,3.39,5.653a28.8,28.8,0,0,0,2.827,5.28c2.611,3.5,5.182,6.227,9.234,8.2a21.942,21.942,0,0,0,8.634,2.072,2.1,2.1,0,0,0,0-4.2,18.009,18.009,0,0,1-6.818-1.639c-3.3-1.6-5.391-3.841-7.7-6.93a25.6,25.6,0,0,1-2.354-4.492c-1.246-2.786-2.539-5.653-4.663-7.281-1.18-.9-5.443-3.827-10.411-7.276l-7.094-4.912c-2.434-1.688-9.819-6.822-11.248-8.049a4.286,4.286,0,0,1-1.791-3.12,4.853,4.853,0,0,1,1.326-2.97c.447-.506,1.761-2.045,5.985-.1l28.525,13.113a2.009,2.009,0,0,0,.25.114l.163.074.008-.021a2.048,2.048,0,0,0,.554.085,2.093,2.093,0,0,0,1.18-3.821l.011-.023-.343-.159c-.018-.008-.035-.017-.052-.024l-9.028-4.158c-.005-.026,0-.051-.01-.079l-2.451-11.606c3.9.044,11.067.188,13.577.387s4.516,2.6,6.631,5.088l.538.638c1.732,2.05,14.557,26.332,22.253,41.2a2.1,2.1,0,0,0,2.779.927l.089-.054h0a2.106,2.106,0,0,0,.9-2.836"/>
                    <path transform="translate(-674.89 -583.86)" d="m845.75 716.66h-5e-3z"/>
                    <path transform="translate(-688.73 -588.5)"
                          d="m805.66 707.04a3.819 3.819 0 1 0 3.819-3.821 3.82 3.82 0 0 0-3.819 3.821"/>
                </svg>
            </div>
            <p class="text-center text-success fs-3 mx-3">Kindly place the NFC card adjacent to the NFC reader on
                your phone.</p>
        </div>
    </div>
{/if}

<button class={className} on:click={writeTag}>
    <slot/>
</button>

<style>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: auto; /* enable pointer events on overlay */
        z-index: 1030;
    }

    .responsive-svg {
        width: 100%;
        height: auto;
        max-width: 80vw;
    }

    .color-svg path {
        fill: #6bb187;
    }

    .modal-content {
        max-width: 100% !important;
    }

    body.showOverlay {
        pointer-events: none; /* disable pointer events on everything else when overlay is active */
    }
</style>
