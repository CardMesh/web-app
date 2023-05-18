import { PUBLIC_REST_API_URL } from '$env/static/public';

export const load = async ({ url }) => {
  // const uuid = url.searchParams.get('uuid');
  const token = url.searchParams.get('token');
  const email = url.searchParams.get('email');

  return {
    // uuid,
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

    console.log(body);

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/auth/reset`, options);

      if (response.ok) {
        console.log('Form submitted successfully.');
        return { success: true };
      }

      console.error('Error submitting form: Server responded with an error.');
      return { success: false };
    } catch (error) {
      console.error('Error submitting form:', error);
      return { success: false };
    }
  },
};
