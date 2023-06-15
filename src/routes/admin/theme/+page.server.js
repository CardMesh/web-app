import { PUBLIC_REST_API_URL } from '$env/static/public';

export const load = async ({
  fetch,
  cookies,
  url,
}) => {
  const { token } = JSON.parse(cookies.get('access')).data;
  const uuid = url.searchParams.get('uuid') || JSON.parse(cookies.get('user')).data.uuid;
  const { themeId } = JSON.parse(cookies.get('user')).data;

  const fetchVcard = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const response = await fetch(`${PUBLIC_REST_API_URL}/api/users/${uuid}/vcard-options`, options);
    return response.json();
  };

  const fetchTheme = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
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
    request,
    cookies,
  }) => {
    const { token } = JSON.parse(cookies.get('access')).data;
    const { themeId } = JSON.parse(cookies.get('user')).data;
    const formData = await request.formData();

    const data = {
      themeId: 1,
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
        height: formData.get('logoHeight'),
      },
      vCardBtn: {
        text: formData.get('buttonText'),
      },
    };

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/themes/${themeId}`, options);

      if (response.ok) {
        return { success: true };
      }

      return { success: false };
    } catch (error) {
      return { success: false };
    }
  },

  uploadLogo: async ({
    request,
    cookies,
  }) => {
    const { token } = JSON.parse(cookies.get('access')).data;
    const { themeId } = JSON.parse(cookies.get('user')).data;
    const formData = await request.formData();

    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: formData,
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/themes/${themeId}/images`, options);

      if (response.ok) {
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      return { success: false };
    }
  },
};
