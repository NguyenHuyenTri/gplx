import axios from 'axios';

export async function loginApi(data) {
  const response = await axios({
    method: 'POST',
    url: 'auth/login',
    data,
  });

  return response.data;
}

export async function getUser() {
  const url = 'nguoidung/thongtin';

  const response = await axios({
    url,
    method: 'GET',
  });
  return response;
}

export async function resetPassword(data) {
  const url = 'auth/password/reset';

  const response = await axios({
    url,
    method: 'POST',
    data,
  });

  return response;
}

export default {
  loginApi,
  getUser,
  resetPassword,
};
