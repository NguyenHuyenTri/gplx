import axios from 'axios';

export async function getKhoaHoc() {
  const url = 'daotao/khoahoc';

  const res = await axios({
    url,
    method: 'GET',
  });

  return res.data;
}

export async function getHocVien(idKhoaHoc) {
  const url = `daotao/hocvien/khoahoc/${idKhoaHoc}`;

  const res = await axios({
    url,
    method: 'GET',
  });

  return res.data;
}
export async function getDiemThi(idKhoaHoc) {
  const url = `daotao/diemthi/${idKhoaHoc}`;

  const res = await axios({
    url,
    method: 'GET',
  });

  return res.data;
}
export async function getKetQua(idKhoaHoc) {
  const url = `daotao/ketquadaotao/${idKhoaHoc}`;

  const res = await axios({
    url,
    method: 'GET',
  });

  return res.data;
}

export default {
  getKhoaHoc,
  getHocVien,
  getDiemThi,
};
