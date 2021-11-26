import axios from 'axios';

export async function getGiayTo() {
  const url = 'quantri/giayto';

  const res = await axios({
    url,
    method: 'GET',
  });
  return res.data;
}
export async function getMonHoc() {
  const url = 'quantri/monhoc';

  const res = await axios({
    url,
    method: 'GET',
  });
  return res.data;
}
export async function getDVHC() {
  const url = 'quantri/dvhc';

  const res = await axios({
    url,
    method: 'GET',
  });
  return res.data;
}
export async function getHangGPLX() {
  const url = 'quantri/hanggplx';

  const res = await axios({
    url,
    method: 'GET',
  });
  return res.data;
}
export async function getChucVu() {
  const url = 'quantri/chucvu';

  const res = await axios({
    url,
    method: 'GET',
  });
  return res.data;
}
export async function getSanTap() {
  const url = 'quantri/santaplai';

  const res = await axios({
    url,
    method: 'GET',
  });
  return res.data;
}
export async function GetThueXe() {
  const url = 'quantri/xe';

  const res = await axios({
    url,
    method: 'GET',
  });
  return res.data;
}

export async function GetTTKTGiaoVien() {
  const url = 'ketoan/thongtin/giaovien';

  const res = await axios({
    url,
    method: 'GET',
  });
  return res.data;
}
export async function GetTTKTNhanVien() {
  const url = 'ketoan/thongtin/nhanvien';

  const res = await axios({
    url,
    method: 'GET',
  });
  return res.data;
}
export async function GetPhanQuyen() {
  const url = 'quantri/nguoidung';

  const res = await axios({
    url,
    method: 'GET',
  });
  return res.data;
}
export async function GetThongBao() {
  const url = 'quantri/thongbao';

  const res = await axios({
    url,
    method: 'GET',
  });
  return res.data;
}
export default {
  getGiayTo,
  getMonHoc,
  getDVHC,
  getHangGPLX,
  getChucVu,
  getSanTap,
  GetThueXe,
  GetTTKTNhanVien,
  GetTTKTGiaoVien,
  GetPhanQuyen,
  GetThongBao,
};
