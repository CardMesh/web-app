import { PUBLIC_REST_API_URL } from '$env/static/public';

export const load = async ({ fetch, cookies }) => {
  const { token } = JSON.parse(cookies.get('user')).data;

  const fetchUsers = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const response = await fetch(`${PUBLIC_REST_API_URL}/api/users`, options);
    return response.json();
  };

  return {
    users: fetchUsers(),
  };
};

export const actions = {
  view: async ({ request, cookies }) => {
    const { token } = JSON.parse(cookies.get('user')).data;
    const formData = await request.formData();
    const data = Object.fromEntries(Array.from(formData.entries()));

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/users`, options);

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

  send: async ({ request, cookies }) => {
    const { token } = JSON.parse(cookies.get('user')).data;
    const formData = await request.formData();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        uuid: formData.get('uuid'),
      }),
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/auth/recover`, options);
      console.log(`${PUBLIC_REST_API_URL}/api/auth/recover`);
      console.log(options);

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

  create: async ({ request, cookies }) => {
    const { token } = JSON.parse(cookies.get('user')).data;
    const formData = await request.formData();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        email: formData.get('email'),
        name: formData.get('name'),
        role: formData.get('role'),
        sendMail: !!formData.get('sendMail'),
      }),
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/auth/signup`, options);

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
