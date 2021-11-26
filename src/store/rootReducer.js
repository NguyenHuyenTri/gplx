import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from '../reducers/authState/authReducer';
import toastReducer from '../reducers/toastState/toastReducer';
import DTHVReducer from '../reducers/DTHVState/DTHVReducer';
import ThongBaoReducer from '../reducers/quan-tri/ThongBao/ThongBaoReducer';
import XeReducer from '../reducers/qly-xe/Xe/XeReducer';
import GiayToReducer from '../reducers/quan-tri/GiayTo/GiayToReducer';
import { reducer as formReducer } from 'redux-form';
import SanTapLaiReducer from '../reducers/quan-tri/SanTapLai/SanTapLaiReducer';
import ThueXeReducer from '../reducers/quan-tri/ThueXe/ThueXeReducer';
import csdtReducer from '../reducers/quan-tri/CoSoDaoTao/CoSoDaoTaoReducer'
import hangGplxReducer from '../reducers/quan-tri/HangGPLX/HangGPLXReducer';
import MonHocReducer from '../reducers/quan-tri/MonHoc/MonHocReducer';
import NhanVienReducer from '../reducers/ke-toan/NhanVien/NhanVienReducer';
import GiaoVienReducer from '../reducers/ke-toan/GiaoVien/GiaoVienReducer';
import DoanhThuReducer from '../reducers/qly-xe/DoanhThu/DoanhThuReducer';
import KetQuaSatHachReducer from '../reducers/sat-hach/KetQuaSatHach/KetQuaSatHachReducer';
import ChucVuReducer from '../reducers/quan-tri/ChucVu/ChucVuReducer';
import KhoaHocReducer from '../reducers/dao-tao/KhoaHoc/KhoaHocReducer';
import DonViHanhChinhReducer from '../reducers/quan-tri/DonViHanhChinh/DonViHanhChinhReducer';
import TTKeToanReducer from '../reducers/quan-tri/TTKeToan/TTKeToanReducer';
import KetQuaDaoTaoReducer from '../reducers/dao-tao/KetQua/KetQuaDaoTaoReducer';
import PhanQuyenReducer from '../reducers/quan-tri/PhanQuyen/PhanQuyenReducer';
import HangDaoTaoReducer from '../reducers/quan-tri/HangDaoTao/HangDaoTaoReducer';
import HangDaoTaoMonHocReducer from '../reducers/quan-tri/HangDaoTaoMonHoc/HangDaoTaoMonHocReducer';
import DonViVanTaiReducer from '../reducers/quan-tri/DonViHanhChinh/DonViVanTaiReducer';
import dthvGVReducer from '../reducers/dao-tao/GiaoVien/GiaoVienReducer';
import DonViReducer from '../reducers/quan-tri/DonVi/DonViReducer';
import DiemThiReducer from '../reducers/dao-tao/DiemThi/DiemThiReducer';
import TheThueXeReducer from '../reducers/qly-xe/TheThueXe/TheThueXeReducer'
import CheckinReducer from '../reducers/qly-xe/Checkin/CheckinReducer'
import thueXeReducer from '../reducers/qly-xe/Thue-xe/ThueXeReducer'

const store = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    toast: toastReducer,
    dthv: DTHVReducer,
    thongBaos: ThongBaoReducer,
    form: formReducer,
    xe: XeReducer,
    giayTos: GiayToReducer,
    sanTLs: SanTapLaiReducer,
    xes: ThueXeReducer,
	  hangGplx: hangGplxReducer,
	  csdt:csdtReducer,
    monHoc: MonHocReducer,
    nhanVienkt: NhanVienReducer,
    giaoVienkt: GiaoVienReducer,
    allLichThueXe:DoanhThuReducer,
    kqSatHach:KetQuaSatHachReducer,
    chucVus: ChucVuReducer,
    khoaHocs: KhoaHocReducer,
    dvhc:DonViHanhChinhReducer,
    kqDaoTao :KetQuaDaoTaoReducer,
    thongTinKTNVs: TTKeToanReducer,
    thongTinKTGVs: TTKeToanReducer,
    phanQuyens: PhanQuyenReducer,
    donviVt:DonViVanTaiReducer,
    giaoVien: dthvGVReducer,
    hangDaoTao:HangDaoTaoReducer,
    hangDaoTaoMonHoc:HangDaoTaoMonHocReducer,
    donVis: DonViReducer,
    hocViens: DiemThiReducer,
    monHocs: DiemThiReducer,
    theThueXe: TheThueXeReducer,
    checkin: CheckinReducer,
    hangDaoTao: HangDaoTaoReducer,
    hangDaoTaoMonHoc: HangDaoTaoMonHocReducer,
    thuexe: thueXeReducer,
    thongbao: ThongBaoReducer,
  });

export default store;
