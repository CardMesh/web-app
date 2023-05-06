import { toast } from '@zerodevx/svelte-toast';

export const displaySuccess = (message) => toast.push(message, {
  theme: {
    '--toastColor': '#003917',
    '--toastBackground': '#6bb187',
    '--toastBarBackground': '#003917',
  },
});

export const displayError = (message) => toast.push(message, {
  theme: {
    '--toastColor': '#5b1103',
    '--toastBackground': '#ea6947',
    '--toastBarBackground': '#5b1103',
  },
});

export const displayInfo = (message) => toast.push(message, {
  theme: {
    '--toastColor': '#b8dcff',
    '--toastBackground': '#0091d5',
    '--toastBarBackground': '#b8dcff',
  },
});

export const displayWarning = (message) => toast.push(message, {
  theme: {
    '--toastColor': '#3e2800',
    '--toastBackground': '#dbae59',
    '--toastBarBackground': '#3e2800',
  },
});
