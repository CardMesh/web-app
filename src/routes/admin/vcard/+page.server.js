import { redirect } from '@sveltejs/kit';
import { PUBLIC_REST_API_URL } from '$env/static/public';

export const load = async ({
  fetch,
  cookies,
  url,
}) => {
  const { token } = JSON.parse(cookies.get('access')).data;

  const userId = url.searchParams.get('userId') || JSON.parse(cookies.get('user')).data.userId;
  const themeId = url.searchParams.get('themeId') || JSON.parse(cookies.get('user')).data.themeId;

  const fetchVcard = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`${PUBLIC_REST_API_URL}/api/users/${userId}/vcards`, options);

    if (response.status === 404) {
      throw redirect(302, '/login');
    }

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
    vCard: fetchVcard(),
    theme: fetchTheme(),
  };
};

export const actions = {
  save: async ({
    fetch,
    request,
    cookies,
    url,
  }) => {
    const { token } = JSON.parse(cookies.get('access')).data;
    const formData = await request.formData();

    const vCard = {
      person: {
        firstName: formData.get('firstName'),
        middleName: formData.get('middleName'),
        lastName: formData.get('lastName'),
        suffix: formData.get('suffix'),
        birthday: formData.get('birthday'),
        pronouns: formData.get('pronouns'),
      },
      professional: {
        title: formData.get('title'),
        company: formData.get('company'),
        role: formData.get('role'),
        bio: formData.get('bio'),
      },
      contact: {
        phone: {
          number: formData.get('number'),
          countryCode: formData.get('countryCode'),
          extension: formData.get('extension'),
        },
        email: formData.get('email'),
        web: formData.get('web'),
        file: {
          url: formData.get('fileUrl'),
          name: formData.get('fileName'),
        },
      },
      location: {
        street: formData.get('street'),
        storey: formData.get('storey'),
        city: formData.get('city'),
        state: formData.get('state'),
        postalCode: formData.get('postalCode'),
        country: formData.get('country'),
        timeZone: formData.get('timeZone'),
        coordinates: {
          latitude: +formData.get('latitude'),
          longitude: +formData.get('longitude'),
        },
      },
      socialMedia: {
        twitter: formData.get('twitter'),
        linkedin: formData.get('linkedin'),
        facebook: formData.get('facebook'),
        instagram: formData.get('instagram'),
        pinterest: formData.get('pinterest'),
        github: formData.get('github'),
      },
    };

    const userId = url.searchParams.get('userId') || JSON.parse(cookies.get('user')).data.userId;

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(vCard),
    };

    try {
      const response = await fetch(
        `${PUBLIC_REST_API_URL}/api/users/${userId}/vcards`,
        options,
      );

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
    const { userId } = JSON.parse(cookies.get('user')).data;
    const formData = await request.formData();

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/users/${userId}/images`, options);

      if (response.ok) {
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      return { success: false };
    }
  },
};
