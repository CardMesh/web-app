import { dev } from '$app/environment';
import { PUBLIC_REST_API_URL } from '$env/static/public';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
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

  return {
    vCards: fetchVcard(),
  };
};
