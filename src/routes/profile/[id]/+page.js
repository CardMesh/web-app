import { PUBLIC_REST_API_URL } from '$env/static/public';

export const prerender = 'auto';

export const load = async ({
  fetch,
  params,
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

    const response = await fetch(`${PUBLIC_REST_API_URL}/api/themes`, options);

    return response.json();
  };

  return {
    vCardOptions: fetchVcard(),
    theme: fetchTheme(),
  };
};
