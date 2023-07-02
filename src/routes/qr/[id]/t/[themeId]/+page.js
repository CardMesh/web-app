import QRCode from 'qrcode-svg';
import { dev } from '$app/environment';
import { PUBLIC_BASE_URL } from '$env/static/public';

export const csr = dev;

export const prerender = 'auto';

export const load = async ({
  params,
}) => {
  const profileUrl = `${PUBLIC_BASE_URL}/p/${params.id}/t/${params.themeId}`;

  return {
    qrCode: new QRCode({
      content: `${profileUrl}?source=qr`,
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
