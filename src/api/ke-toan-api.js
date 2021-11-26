import axios from 'axios';

export async function getNhanVien() {
  const url = 'ketoan/nhanvien';
  const res = await axios({
    url,
    method: 'GET',
  });

  return res.data;
}
export async function getGiaoVien() {
  const url = 'ketoan/giaovien';
  const res = await axios({
    url,
    method: 'GET',
  });

  return res.data;
}

export default {
  getNhanVien,
  getGiaoVien,
};
