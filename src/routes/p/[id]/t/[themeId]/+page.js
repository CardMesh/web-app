import { redirect } from '@sveltejs/kit';
import { PUBLIC_REST_API_URL } from '$env/static/public';

export const prerender = 'auto';

export const load = async ({
  fetch,
  params,
  url,
}) => {
  const fetchVcard = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(
      `${PUBLIC_REST_API_URL}/api/v1/users/${params.id}/vcards`,
      options,
    );

    if (response.status === 404) {
      throw redirect(302, '/404');
    }

    return response.json();
  };

  const fetchTheme = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`${PUBLIC_REST_API_URL}/api/v1/themes/${params.themeId}`, options);

    return response.json();
  };

  const fetchClicks = async () => {
    const data = { source: url.searchParams.get('source') };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(`${PUBLIC_REST_API_URL}/api/v1/users/${params.id}/statistics/clicks`, options);

    return response.json();
  };

  await fetchClicks();

  return {
    vCard: fetchVcard(),
    theme: fetchTheme(),
  };
};
