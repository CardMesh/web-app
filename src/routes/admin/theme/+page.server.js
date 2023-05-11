import { PUBLIC_REST_API_URL } from '$env/static/public';

export const load = async ({ fetch, cookies }) => {
  const { token } = JSON.parse(cookies.get('user')).data;

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
    theme: fetchTheme(),
  };
};

export const actions = {
  save: async ({ request, cookies }) => {
    const { token } = JSON.parse(cookies.get('user')).data;
    const formData = await request.formData();

    const data = Object.fromEntries(Array.from(formData.entries()));
    data.displayMap = !!data.displayMap; // typecast to boolean
    data.displayPhone = !!data.displayPhone; // typecast to boolean
    data.displaySms = !!data.displaySms; // typecast to boolean
    data.displayEmail = !!data.displayEmail; // typecast to boolean
    data.displayWeb = !!data.displayWeb; // typecast to boolean
    data.displayAddress = !!data.displayAddress; // typecast to boolean
    data.displayContactBtn = !!data.displayContactBtn; // typecast to boolean

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/themes`, options);

      if (response.ok) {
        console.log('Form submitted successfully.');
        return { success: true };
      }

      console.error('Error submitting form: Server responded with an error.', response);
      return { success: false };
    } catch (error) {
      console.error('Error submitting form:', error);
      return { success: false };
    }
  },

  uploadLogo: async ({ request, cookies }) => {
    const { token } = JSON.parse(cookies.get('user')).data;
    const formData = await request.formData();
    // formData.append('height', 50);

    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: formData,
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/themes/upload`, options);

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
