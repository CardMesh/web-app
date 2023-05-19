import { PUBLIC_REST_API_URL } from '$env/static/public';

export const load = async ({
  fetch,
  cookies,
  url,
}) => {
  const { token } = JSON.parse(cookies.get('user')).data;
  const uuid = url.searchParams.get('uuid') || JSON.parse(cookies.get('user')).data.uuid;

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

    const response = await fetch(`${PUBLIC_REST_API_URL}/api/themes`, options);

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
    url,
  }) => {
    const { token } = JSON.parse(cookies.get('user')).data;
    const formData = await request.formData();

    const vCardOptions = {
      name: {
        firstName: formData.get('firstName'),
        middleName: formData.get('middleName'),
        lastName: formData.get('lastName'),
        suffix: formData.get('suffix'),
      },
      professional: {
        title: formData.get('title'),
        company: 'Example Company',
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
      personal: {
        birthday: formData.get('birthday'),
        pronouns: formData.get('pronouns'),
      },
    };

    //   const data = Object.fromEntries(Array.from(formData.entries()));
    const uuid = url.searchParams.get('uuid') || JSON.parse(cookies.get('user')).data.uuid;

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(vCardOptions),
    };

    try {
      const response = await fetch(
        `${PUBLIC_REST_API_URL}/api/users/${uuid}/vcard-options`,
        options,
      );

      if (response.ok) {
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      return { success: false };
    }
  },
};
