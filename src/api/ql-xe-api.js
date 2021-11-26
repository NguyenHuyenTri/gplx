import axios from 'axios';

export async function getDoanhThu() {
  const url = 'lichthuexe';
  const res = await axios({
    url,
    method: 'GET',
  });

  return res.data;
}

export default {
  getDoanhThu,
};
