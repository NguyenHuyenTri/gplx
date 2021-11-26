import _get from 'lodash/get';

const newDate = (date) => {
  try {
    return new Date(date);
  } catch (e) {
    return new Date();
  }
};

export const convertData = (data) => {
  if (Array.isArray(data) && data.length > 0) {
    return data.map((item) => {
      const temp = {};
      temp.title = item.tenNguoiThue;
      temp.startDate = newDate(item.ngayGioBDThue);
      temp.endDate = newDate(item.ngayGioKTThue);
      temp.id = item.id;
      temp.location = _get(item, 'sanTapLai.tenSan');

      return temp;
    });
  }

  return data;
};

export const filterXe = (data, nameLoaiXe) => {
  if (!nameLoaiXe) {
    return data;
  }

  if (Array.isArray(data) && data.length > 0) {
    const result = data.filter((item) => item.loaiXe.tenLoaiXe === nameLoaiXe);

    return result;
  }

  return data;
};
