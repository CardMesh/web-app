import { PUBLIC_REST_API_URL } from '$env/static/public';

export const load = async ({
  fetch,
  cookies,
  url,
}) => {
  const { token } = JSON.parse(cookies.get('user')).data;

  const uuid = url.searchParams.get('uuid') || JSON.parse(cookies.get('user')).data.uuid;

  const clicks = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const response = await fetch(`${PUBLIC_REST_API_URL}/api/users/${uuid}/statistics/clicks`, options);
    return response.json();
  };

  return {
    clicks: clicks(),
  };
};
