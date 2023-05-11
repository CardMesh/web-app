import QRCode from 'qrcode-svg';
import { dev } from '$app/environment';
import { PUBLIC_BASE_URL, PUBLIC_REST_API_URL } from '$env/static/public';

export const csr = dev;

export const prerender = 'auto';

export const load = async ({ fetch, params }) => {
  const fetchVcard = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(
      `${PUBLIC_REST_API_URL}/api/users/${params.id}/vcard-options`,
      options,
    );
    return response.json();
  };

  const profileUrl = `${PUBLIC_BASE_URL}/profile/${params.id}`;

  return {
    vCards: fetchVcard(),
    qrCode: new QRCode({
      content: `${profileUrl}?entryPoint=qr`,
      join: true,
      ecl: 'M',
      width: 300,
      height: 300,
      margin: 20,
      color: '#212529',
      background: '#fff',
    }).svg(),
  };
};
