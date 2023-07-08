import { PUBLIC_REST_API_URL } from '$env/static/public';

export const load = async ({ url }) => {
  const token = url.searchParams.get('token');
  const email = url.searchParams.get('email');

  return {
    email,
    token,
  };
};

export const actions = {
  save: async ({
    fetch,
    request,
  }) => {
    const formData = await request.formData();

    const body = {
      token: formData.get('token'),
      password: formData.get('password'),
      email: formData.get('email'),
    };

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/v1/auth/reset`, options);

      if (response.ok) {
        return { success: true };
      }

      return { success: false };
    } catch (err) {
      return { success: false };
    }
  },
};
