import { redirect } from '@sveltejs/kit';
import { PUBLIC_REST_API_URL } from '$env/static/public';

export const load = async ({
  fetch,
  cookies,
  url,
}) => {
  const { token } = JSON.parse(cookies.get('access')).data;

  const fetchThemes = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`${PUBLIC_REST_API_URL}/api/v1/themes`, options);

    return response.json();
  };

  const fetchUsers = async () => {
    const params = new URLSearchParams(url.search);
    const page = params.get('page');
    const limit = params.get('limit') ?? 5;
    const search = params.get('search');

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const apiUrl = new URL(`${PUBLIC_REST_API_URL}/api/v1/users`);

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

    if (response.status === 404) {
      throw redirect(302, '/login');
    }

    if (response.status === 403) {
      throw redirect(302, '/admin');
    }

    return response.json();
  };

  return {
    themes: fetchThemes(),
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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/v1/users`, options);

      if (response.ok) {
        return { success: true };
      }
      return { success: false };
    } catch (err) {
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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: formData.get('userId'),
      }),
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/v1/auth/recover`, options);
      if (response.ok) {
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      return { success: false };
    }
  },

  delete: async ({
    request,
    cookies,
  }) => {
    const { token } = JSON.parse(cookies.get('access')).data;
    const formData = await request.formData();

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: formData.get('userId'),
      }),
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/v1/users/${formData.get('userId')}`, options);

      if (response.ok) {
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      return { success: false };
    }
  },

  updateUser: async ({
    fetch,
    request,
    cookies,
  }) => {
    const { token } = JSON.parse(cookies.get('access')).data;
    const formData = await request.formData();

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        themeId: formData.get('themeId'),
        email: formData.get('email'),
        name: formData.get('name'),
        role: formData.get('role'),
      }),
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/v1/users/${formData.get('userId')}`, options);

      // Update the cookie.
      await cookies.set('user', JSON.stringify(await response.json()), {
        path: '/',
        maxAge: 3600 * 60 * 60 * 24, // 1 day
        secure: true,
        sameSite: 'strict',
        httpOnly: false,
      });

      if (response.ok) {
        return { success: true };
      }
      return { success: false };
    } catch (err) {
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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        themeId: formData.get('themeId'),
        email: formData.get('email'),
        name: formData.get('name'),
        role: formData.get('role'),
        sendMail: Boolean(formData.get('sendMail')),
      }),
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/v1/auth/signup`, options);

      if (response.ok) {
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      return { success: false };
    }
  },
};
