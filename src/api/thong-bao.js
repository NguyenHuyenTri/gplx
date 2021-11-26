import axios from 'axios';

export async function createThongBao(data) {
  const url = 'quantri/thongbao';
  const res = await axios({
    url,
    method: 'POST',
    data,
  });

  return res.data;
}

export async function deleteThongBao(id) {
  const url = `quantri/thongbao/${id}`;
  const res = await axios({
    url,
    method: 'DELETE',
  });

  return res.data;
}

export async function getThongBaoTC() {
  const url = `thongbao`;

  const res = await axios({
    url,
    method: 'GET',
  });

  return res.data;
}

export default {
  createThongBao,
  deleteThongBao,
  getThongBaoTC,
};
