import axios from 'axios';
const baseUrl = 'http://localhost:8080/';

const auth = () => {
  const { token } = JSON.parse(localStorage.getItem('userInfo'));
  console.log(token);
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

async function logIn({ email, password }) {
  try {
    const res = await axios.post(`${baseUrl}auth/login`, {
      email,
      password,
    });
    console.log(res.data);
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (err) {
    console.log(err);
    const {
      response: {
        data: { error },
      },
    } = err;

    return { error };
  }
}
async function register({ name, email, password }) {
  try {
    const res = await axios.post(`${baseUrl}auth/register`, {
      name,
      email,
      password,
    });
    console.log(res.data);
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (err) {
    console.log(err);
    const {
      response: {
        data: { error },
      },
    } = err;

    return { error };
  }
}

async function logOut() {
  try {
    const res = await axios.post(`${baseUrl}user/logout`, undefined, auth());
    console.log(res.data);
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (error) {
    console.log(error);
    const {
      response: {
        data: { message, errors },
      },
    } = error;

    if (errors) {
      const errorMessages = Object.keys(errors).map((key) => {
        const firstError = errors[key][0];
        if (firstError) {
          return firstError;
        }
      });
      return { errorMessages };
    }
    return { message };
  }
}

export { logIn, auth, logOut, register };
