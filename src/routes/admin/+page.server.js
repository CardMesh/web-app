import { redirect } from '@sveltejs/kit';
import { PUBLIC_REST_API_URL } from '$env/static/public';

export const load = async ({
  fetch,
  cookies,
  url,
}) => {
  const { token } = JSON.parse(cookies.get('access')).data;
  const userId = url.searchParams.get('userId') || JSON.parse(cookies.get('user')).data.userId;

  const clicks = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`${PUBLIC_REST_API_URL}/api/users/${userId}/statistics/clicks`, options);

    if (response.status === 404) {
      throw redirect(302, '/login');
    }

    return response.json();
  };

  return {
    clicks: clicks(),
  };
};
