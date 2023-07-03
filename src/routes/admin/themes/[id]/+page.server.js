import { redirect } from '@sveltejs/kit';
import { PUBLIC_REST_API_URL } from '$env/static/public';

export const load = async ({
  fetch,
  cookies,
  params,
}) => {
  const {
    role,
    uuid,
  } = JSON.parse(cookies.get('user')).data;
  const { token } = JSON.parse(cookies.get('access')).data;

  const themeId = params.id;

  if (!['admin', 'editor'].includes(role)) {
    throw redirect(302, '/admin');
  }

  const fetchVcard = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`${PUBLIC_REST_API_URL}/api/users/${uuid}/vcards`, options);
    return response.json();
  };

  const fetchTheme = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`${PUBLIC_REST_API_URL}/api/themes/${themeId}`, options);

    return response.json();
  };

  return {
    vCards: fetchVcard(),
    theme: fetchTheme(),
  };
};

export const actions = {
  save: async ({
    fetch,
    request,
    cookies,
    params,
  }) => {
    const { token } = JSON.parse(cookies.get('access')).data;
    const themeId = params.id;
    const formData = await request.formData();

    const data = {
      color: {
        font: {
          primary: formData.get('fontColor'),
          secondary: formData.get('secondaryFontColor'),
        },
        background: formData.get('backgroundColor'),
        socialIcons: {
          font: formData.get('socialIconFontColor'),
          background: formData.get('socialIconBackgroundColor'),
        },
        vCardBtn: {
          font: formData.get('btnFontColor'),
          background: formData.get('btnBackgroundColor'),
        },
      },
      display: {
        phone: formData.get('displayPhone') === 'on',
        sms: formData.get('displaySms') === 'on',
        email: formData.get('displayEmail') === 'on',
        web: formData.get('displayWeb') === 'on',
        address: formData.get('displayAddress') === 'on',
        map: formData.get('displayMap') === 'on',
        vCardBtn: formData.get('displayContactBtn') === 'on',
      },
      logo: {
        size: {
          height: formData.get('logoHeight'),
        },
      },
    };

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/themes/${themeId}`, options);

      if (response.ok) {
        return { success: true };
      }

      return { success: false };
    } catch (err) {
      return { success: false };
    }
  },

  uploadLogo: async ({
    fetch,
    request,
    cookies,
  }) => {
    const { token } = JSON.parse(cookies.get('access')).data;
    const { themeId } = JSON.parse(cookies.get('user')).data;
    const formData = await request.formData();

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/themes/${themeId}/images`, options);

      if (response.ok) {
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      return { success: false };
    }
  },

  createTheme: async ({
    fetch,
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
        name: formData.get('name'),
      }),
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/themes`, options);

      if (response.ok) {
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      return { success: false };
    }
  },
};
