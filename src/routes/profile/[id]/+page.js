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
      `${PUBLIC_REST_API_URL}/api/users/${params.id}/vcard-options`,
      options,
    );
    return response.json();
  };

  const fetchTheme = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`${PUBLIC_REST_API_URL}/api/themes/1`, options);

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

    const response = await fetch(`${PUBLIC_REST_API_URL}/api/users/${params.id}/statistics/clicks`, options);

    return response.json();
  };

  await fetchClicks();

  return {
    vCard: fetchVcard(),
    theme: fetchTheme(),
  };
};
