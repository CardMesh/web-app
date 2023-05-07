export const load = async ({ fetch, cookies, url }) => {
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

    const response = await fetch(`https://meishi-rest-api.fly.dev/api/users/${uuid}/vcard-options`, options);
    return response.json();
  };

  return {
    vCards: fetchVcard(),
  };
};

export const actions = {
  save: async ({ request, cookies, url }) => {
    const { token } = JSON.parse(cookies.get('user')).data;
    const formData = await request.formData();
    //  console.log(formData);
    const data = Object.fromEntries(Array.from(formData.entries()));
    const uuid = url.searchParams.get('uuid') || JSON.parse(cookies.get('user')).data.uuid;

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        `https://meishi-rest-api.fly.dev/api/users/${uuid}/vcard-options`,
        options,
      );

      if (response.ok) {
        console.log('Form submitted successfully.');
        console.log('put', uuid);
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
