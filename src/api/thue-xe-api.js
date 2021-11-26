import axios from 'axios';

export async function getLichThueXeById(id) {
  const url = `lichthuexe${id ? `/${id}` : ''}`;
  const res = await axios({
    url,
    method: 'GET',
  });

  return res.data;
}

export async function getLichThueXes(id) {
  const url = `lichthuexe/xe`;
  const res = await axios({
    url,
    method: 'GET',
  });

  return res.data;
}

export default {
  getLichThueXeById,
  getLichThueXes,
};
