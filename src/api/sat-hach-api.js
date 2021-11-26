import axios from 'axios';

export async function getHSSH() {
  const url = 'kysathach';

  const res = await axios({
    url,
    method: 'GET',
  });

  return res.data;
}

export default {
  getHSSH,
};
