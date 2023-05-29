import { PUBLIC_REST_API_URL } from '$env/static/public';

export const load = async ({
  fetch,
  cookies,
  url,
}) => {
  const { token } = JSON.parse(cookies.get('access')).data;

  const fetchUsers = async () => {
    const params = new URLSearchParams(url.search);
    const page = params.get('page');
    const limit = params.get('limit') ?? 10;
    const search = params.get('search');

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const apiUrl = new URL(`${PUBLIC_REST_API_URL}/api/users`);

    if (page) {
      apiUrl.searchParams.append('page', page);
    }
    if (limit) {
      apiUrl.searchParams.append('limit', limit);
    }
    if (search) {
      apiUrl.searchParams.append('search', search);
    }

    const response = await fetch(apiUrl.toString(), options);
    return response.json();
  };

  return {
    users: fetchUsers(),
  };
};

export const actions = {
  view: async ({
    request,
    cookies,
  }) => {
    const { token } = JSON.parse(cookies.get('access')).data;
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
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      return { success: false };
    }
  },

  send: async ({
    request,
    cookies,
  }) => {
    const { token } = JSON.parse(cookies.get('access')).data;
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

      if (response.ok) {
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      return { success: false };
    }
  },

  create: async ({
    request,
    cookies,
  }) => {
    const { token } = JSON.parse(cookies.get('access')).data;
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
        sendMail: Boolean(formData.get('sendMail')),
      }),
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/auth/signup`, options);

      if (response.ok) {
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      return { success: false };
    }
  },
};
