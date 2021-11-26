import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Loading } from '../components';
import { Checkin } from '../pages/quan_li_xe/check_in';
import EditCheckin from '../pages/quan_li_xe/check_in/EditCheckin';
import { TheThueXe } from '../pages/quan_li_xe/the_thue_xe';
import AddTheThueXe from '../pages/quan_li_xe/the_thue_xe/AddTheThueXe';
import EditTheThueXe from '../pages/quan_li_xe/the_thue_xe/EditTheThueXe';
import { AuthRouter } from './auth-router';

// Quản trị
const Login = lazy(() => import('../pages/login/Login'));
const Signup = lazy(() => import('../pages/signup/Signup'));
const HomePage = lazy(() => import('../pages/home/HomePage'));
const NotFound = lazy(() => import('../pages/not-found/NotFound'));

//! dao-tao
const HocVienPage = lazy(() => import('../pages/dao-tao/hoc-vien/HocVienPage'));
const AddHocVienPage = lazy(() => import('../pages/dao-tao/hoc-vien/AddHocVien'));
const ChiTietHV = lazy(() => import('../pages/dao-tao/hoc-vien/ChiTietHVPage'));
const GiaoVienPage = lazy(() => import('../pages/dao-tao/giao-vien/GiaoVienPage'));
const AddGiaoVienPage = lazy(() => import('../pages/dao-tao/giao-vien/AddGiaoVien'));
const ChiTietGiaoVienPage = lazy(() => import('../pages/dao-tao/giao-vien/ChiTietGV'));
const UpdateGiaoVien = lazy(() => import('../pages/dao-tao/giao-vien/UpdateGV'));
const DiemThiPage = lazy(() => import('../pages/dao-tao/diem-thi/DiemThiPage'));
const KhoaHoc = lazy(() => import('../pages/dao-tao/khoa-hoc/KhoaHoc'));
const CreateKhoaHoc = lazy(() => import('../pages/dao-tao/khoa-hoc/CreateKhoaHoc'));
const EditKhoaHoc = lazy(() => import('../pages/dao-tao/khoa-hoc/EditKhoaHoc'));
const LichHocPage = lazy(() => import('../pages/dao-tao/lich-hoc/LichHocPage'));
const KetQuaPage = lazy(() => import('../pages/dao-tao/ket-qua/KetQuaPage'));

//! sat-hach
const HocVienSHPage = lazy(() => import('../pages/sat-hach/hoc-vien/HocVienPage'));
const AddHocVienSHPage = lazy(() => import('../pages/sat-hach/hoc-vien/AddHocVien'));
const EditHocVienSHPage = lazy(() => import('../pages/sat-hach/hoc-vien/EditHocVien'));
const LichSatHachPage = lazy(() => import('../pages/sat-hach/lich-sat-hach/LichSatHachPage'));
const KetQuaSH = lazy(() => import('../pages/sat-hach/ket-qua/KetQuaSH'));
const HoSoPage = lazy(() => import('../pages/sat-hach/ho-so/HoSoPage'));

//! accountant
const KTNhanVienPage = lazy(() => import('../pages/ke_toan/nhan_vien/NhanVienPage'));
const EditKTNhanVienPage = lazy(() => import('../pages/ke_toan/nhan_vien/EditNhanVien'));
const KTHocVienPage = lazy(() => import('../pages/ke_toan/hoc_vien/HocVienPage'));
const KTGiaoVienPage = lazy(() => import('../pages/ke_toan/giao_vien/GiaoVien'));
const EditKTGiaoVienPage = lazy(() => import('../pages/ke_toan/giao_vien/UpdateGiaoVien'));

//! quan_li_xe
const ListXePage = lazy(() => import('../pages/quan_li_xe/xe/ListXe'));
const CreateXePage = lazy(() => import('../pages/quan_li_xe/xe/CreateXe'));
const UpdateXe = lazy(() => import('../pages/quan_li_xe/xe/UpdateXe'));
const ChiTietXe = lazy(() => import('../pages/quan_li_xe/xe/ChiTietXePage'));
const DoanhThu = lazy(() => import('../pages/quan_li_xe/doanh_thu_thue_xe/DoanhThu'));
const ThueXeSanPage = lazy(() => import('../pages/quan_li_xe/thue-xe-san-tap-lai/ThueXeSanPage'));

// quan tri he thong
const CoSoDaoTao = lazy(() => import('../pages/qt_he_thong/co_so_dao_tao/CoSoDaoTao'));
const DonViHanhChinh = lazy(() => import('../pages/qt_he_thong/don_vi_hanh_chinh/DonViHanhChinh'));
const CreateDonViHanhChinh = lazy(() =>
  import('../pages/qt_he_thong/don_vi_hanh_chinh/CreateDonViHanhChinh')
);
const UpdateDonViHanhChinh = lazy(() =>
  import('../pages/qt_he_thong/don_vi_hanh_chinh/UpdateDonViHanhChinh')
);
const CreateDonViVanTai = lazy(() =>
  import('../pages/qt_he_thong/don_vi_hanh_chinh/CreateDonViVanTai')
);
const UpdateDonViVanTai = lazy(() =>
  import('../pages/qt_he_thong/don_vi_hanh_chinh/UpdateDonViVanTai')
);

const DonViChucVu = lazy(() => import('../pages/qt_he_thong/don_vi_chuc_vu/DonViChucVu'));
const CreateChucVu = lazy(() => import('../pages/qt_he_thong/don_vi_chuc_vu/CreateChucVu'));
const EditChucVu = lazy(() => import('../pages/qt_he_thong/don_vi_chuc_vu/EditChucVu'));
const DonVi = lazy(() => import('../pages/qt_he_thong/don_vi_chuc_vu/don_vi/DonVi'));
const CreateDonVi = lazy(() => import('../pages/qt_he_thong/don_vi_chuc_vu/don_vi/CreateDonVi'));
const EditDonVi = lazy(() => import('../pages/qt_he_thong/don_vi_chuc_vu/don_vi/EditDonVi'));

const GiayTo = lazy(() => import('../pages/qt_he_thong/giay_to/GiayTo'));
const CreateGiayTo = lazy(() => import('../pages/qt_he_thong/giay_to/CreateGiayTo'));
const EditGiayTo = lazy(() => import('../pages/qt_he_thong/giay_to/EditGiayTo'));

const HangGiayPhepLaiXe = lazy(() => import('../pages/qt_he_thong/hang_gplx/HangGiayPhepLaiXe'));
const AddHangGPLX = lazy(() => import('../pages/qt_he_thong/hang_gplx/AddHangGPLX'));
const EditHangGPLX = lazy(() => import('../pages/qt_he_thong/hang_gplx/EditHangGPLX'));
const HangDaoTao = lazy(() => import('../pages/qt_he_thong/hang_dao_tao/HangDaoTao'));
const AddHangDaoTao = lazy(() => import('../pages/qt_he_thong/hang_dao_tao/AddHangDaoTao'));
const EditHangDaoTao = lazy(() => import('../pages/qt_he_thong/hang_dao_tao/EditHangDaoTao'));
const MonHocHangDaoTao = lazy(() =>
  import('../pages/qt_he_thong/mon_hoc_hang_dao_tao/MonHocHangDaoTao')
);
const AddMonHocHangDaoTao = lazy(() =>
  import('../pages/qt_he_thong/mon_hoc_hang_dao_tao/AddMonHocHangDaoTao')
);
const EditMonHocHangDaoTao = lazy(() =>
  import('../pages/qt_he_thong/mon_hoc_hang_dao_tao/EditMonHocHangDaoTao')
);
const MonHoc = lazy(() => import('../pages/qt_he_thong/mon_hoc/MonHoc'));
const CreateMonHoc = lazy(() => import('../pages/qt_he_thong/mon_hoc/CreateMonHoc'));
const UpdateMonHoc = lazy(() => import('../pages/qt_he_thong/mon_hoc/UpdateMonHoc'));
const PhanQuyen = lazy(() => import('../pages/qt_he_thong/phan_quyen/PhanQuyen'));
const CreatePhanQuyen = lazy(() => import('../pages/qt_he_thong/phan_quyen/CreatePhanQuyen'));
const EditPhanQuyen = lazy(() => import('../pages/qt_he_thong/phan_quyen/EditPhanQuyen'));
const DetailPhanQuyen = lazy(() => import('../pages/qt_he_thong/phan_quyen/DetailPhanQuyen'));
const ThongBao = lazy(() => import('../pages/qt_he_thong/thong_bao/ThongBao'));
const CreateThongBao = lazy(() => import('../pages/qt_he_thong/thong_bao/CreateThongBao'));
const EditThongBao = lazy(() => import('../pages/qt_he_thong/thong_bao/EditThongBao'));
const ThongTinKeToan = lazy(() => import('../pages/qt_he_thong/thong_tin_ke_toan/TTKeToan'));
const CreateThongTinKeToan = lazy(() =>
  import('../pages/qt_he_thong/thong_tin_ke_toan/CreateTTKeToan')
);
const UpdateThongTinKeToan = lazy(() =>
  import('../pages/qt_he_thong/thong_tin_ke_toan/UpdateTTKeToan')
);

const ThueXeSanTap = lazy(() => import('../pages/qt_he_thong/thue_xe_san_tap/ThueXeSanTap'));
const CreateSanTapLai = lazy(() =>
  import('../pages/qt_he_thong/thue_xe_san_tap/san_tap_lai/CreateSanTapLai')
);
const EditSanTapLai = lazy(() =>
  import('../pages/qt_he_thong/thue_xe_san_tap/san_tap_lai/EditSanTapLai')
);
const EditThueXe = lazy(() => import('../pages/qt_he_thong/thue_xe_san_tap/thue_xe/EditThueXe'));

//! thong tin ca nhan
const TTGiaoVienPage = lazy(() => import('../pages/thong_tin_ca_nhan/giao_vien/TTGiaoVienPage'));
const TTHocVienPage = lazy(() => import('../pages/thong_tin_ca_nhan/hoc_vien/TTHocVienPage'));
const TTNhanVienPage = lazy(() => import('../pages/thong_tin_ca_nhan/nhan_vien/TTNhanVienPage'));

function Routes() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <AuthRouter path='/' exact>
          <HomePage />
        </AuthRouter>

        <AuthRouter path='/home' exact>
          <HomePage />
        </AuthRouter>

        <AuthRouter path='/dao_tao/hoc_vien' exact>
          <HocVienPage />
        </AuthRouter>

        <AuthRouter path='/hoc_vien/them_hoc_vien' exact>
          <AddHocVienPage />
        </AuthRouter>

        <AuthRouter path='/hoc_vien/chi_tiet_hv/:id' exact>
          <ChiTietHV />
        </AuthRouter>

        <AuthRouter path='/dao_tao/ket_qua' exact>
          <KetQuaPage />
        </AuthRouter>

        <AuthRouter path='/dao_tao/lich_hoc' exact>
          <LichHocPage />
        </AuthRouter>

        <AuthRouter path='/dao_tao/khoa_hoc' exact>
          <KhoaHoc />
        </AuthRouter>

        <AuthRouter path='/dao_tao/them_khoa_hoc' exact>
          <CreateKhoaHoc />
        </AuthRouter>

        <AuthRouter path='/dao_tao/chinh_sua_khoa_hoc/:id' exact>
          <EditKhoaHoc />
        </AuthRouter>

        <AuthRouter path='/dao_tao/giao_vien' exact>
          <GiaoVienPage />
        </AuthRouter>

        <AuthRouter path='/giao_vien/them_giao_vien' exact>
          <AddGiaoVienPage />
        </AuthRouter>
        <AuthRouter path='/giao_vien/chi_tiet_gv/:id' exact>
          <ChiTietGiaoVienPage />
        </AuthRouter>
        <AuthRouter path='/giao_vien/sua_thong_tin/:id' exact>
          <UpdateGiaoVien />
        </AuthRouter>
        <AuthRouter path='/dao_tao/diem_thi' exact>
          <DiemThiPage />
        </AuthRouter>

        <AuthRouter path='/sat_hach/thi_sinh' exact>
          <HocVienSHPage />
        </AuthRouter>

        <AuthRouter path='/sat_hach/them_hoc_vien_sh' exact>
          <AddHocVienSHPage />
        </AuthRouter>

        <AuthRouter path='/sat_hach/sua_thong_tin_sh' exact>
          <EditHocVienSHPage />
        </AuthRouter>

        <AuthRouter path='/sat_hach/lich' exact>
          <LichSatHachPage />
        </AuthRouter>

        <AuthRouter path='/sat_hach/ho_so' exact>
          <HoSoPage />
        </AuthRouter>

        <AuthRouter path='/sat_hach/ket_qua' exact>
          <KetQuaSH />
        </AuthRouter>

        <AuthRouter path='/ke_toan/nhan_vien' exact>
          <KTNhanVienPage />
        </AuthRouter>

        <AuthRouter path='/ke_toan/sua_thong_tin_nhan_vien_kt/:id' exact>
          <EditKTNhanVienPage />
        </AuthRouter>

        <AuthRouter path='/ke_toan/giao_vien' exact>
          <KTGiaoVienPage />
        </AuthRouter>

        <AuthRouter path='/ke_toan/sua_thong_tin_giao_vien_kt/:id' exact>
          <EditKTGiaoVienPage />
        </AuthRouter>

        <AuthRouter path='/ke_toan/hoc_vien' exact>
          <KTHocVienPage />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/co_so_dao_tao' exact>
          <CoSoDaoTao />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/don_vi_chuc_vu' exact>
          <DonViChucVu />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/them_don_vi' exact>
          <CreateDonVi />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/chinh_sua_don_vi/:id' exact>
          <EditDonVi />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/don_vi_hanh_chinh' exact>
          <DonViHanhChinh />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/them_don_vi_hanh_chinh' exact>
          <CreateDonViHanhChinh />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/chinh_sua_don_vi_hanh_chinh/:id' exact>
          <UpdateDonViHanhChinh />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/them_don_vi_van_tai' exact>
          <CreateDonViVanTai />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/chinh_sua_don_vi_van_tai/:id' exact>
          <UpdateDonViVanTai />
        </AuthRouter>
        <AuthRouter path='/qt_he_thong/them_chuc_vu' exact>
          <CreateChucVu />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/chinh_sua_chuc_vu/:id' exact>
          <EditChucVu />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/giay_to' exact>
          <GiayTo />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/them_giay_to' exact>
          <CreateGiayTo />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/chinh_sua_giay_to/:id' exact>
          <EditGiayTo />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/hang_gplx' exact>
          <HangGiayPhepLaiXe />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/them_hang_GPLX' exact>
          <AddHangGPLX />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/sua_thong_tin_hang_GPLX/:id' exact>
          <EditHangGPLX />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/hang_dao_tao/:id' exact>
          <HangDaoTao />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/them_hang_dao_tao/:id' exact>
          <AddHangDaoTao />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/sua_hang_dao_tao/:id' exact>
          <EditHangDaoTao />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/mon_hoc_hang_dao_tao/:id' exact>
          <MonHocHangDaoTao />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/them_mon_hoc_hang_dao_tao/:id' exact>
          <AddMonHocHangDaoTao />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/sua_mon_hoc_hang_dao_tao/:id' exact>
          <EditMonHocHangDaoTao />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/mon_hoc' exact>
          <MonHoc></MonHoc>
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/them_moi_mon_hoc' exact>
          <CreateMonHoc></CreateMonHoc>
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/sua_mon_hoc/:id' exact>
          <UpdateMonHoc></UpdateMonHoc>
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/phan_quyen' exact>
          <PhanQuyen />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/them_phan_quyen' exact>
          <CreatePhanQuyen />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/thong_bao' exact>
          <ThongBao />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/them_thong_bao' exact>
          <CreateThongBao />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/chinh_sua_thong_bao/:id' exact>
          <EditThongBao />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/thong_tin_ke_toan' exact>
          <ThongTinKeToan />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/them_moi_thong_tin_ke_toan' exact>
          <CreateThongTinKeToan></CreateThongTinKeToan>
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/sua_thong_tin_ke_toan/:id' exact>
          <UpdateThongTinKeToan></UpdateThongTinKeToan>
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/thue_xe_san_tap' exact>
          <ThueXeSanTap />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/them_san_tap_lai' exact>
          <CreateSanTapLai />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/chinh_sua_san_tap_lai/:id' exact>
          <EditSanTapLai />
        </AuthRouter>

        <AuthRouter path='/qt_he_thong/chinh_sua_thue_xe/:id' exact>
          <EditThueXe />
        </AuthRouter>

        <AuthRouter path='/ql_xe/xe' exact>
          <ListXePage />
        </AuthRouter>

        <AuthRouter path='/ql_xe/them_xe' exact>
          <CreateXePage />
        </AuthRouter>

        <AuthRouter path='/ql_xe/sua_thong_tin_xe/:id' exact>
          <UpdateXe />
        </AuthRouter>

        <AuthRouter path='/ql_xe/thong_tin_xe/:id' exact>
          <ChiTietXe />
        </AuthRouter>

        <AuthRouter path='/ql_xe/doanh_thu' exact>
          <DoanhThu />
        </AuthRouter>

        <AuthRouter path='/ql_xe/thue_xe_san_tap_lai' exact>
          <ThueXeSanPage />
        </AuthRouter>

        <AuthRouter path='/thong_tin_ca_nhan/giao_vien' exact>
          <TTGiaoVienPage />
        </AuthRouter>

        <AuthRouter path='/thong_tin_ca_nhan/hoc_vien' exact>
          <TTHocVienPage />
        </AuthRouter>

        <AuthRouter path='/thong_tin_ca_nhan/nhan_vien' exact>
          <TTNhanVienPage />
        </AuthRouter>

        <AuthRouter path='/ql_xe/the_thue_xe' exact>
          <TheThueXe />
        </AuthRouter>

        <AuthRouter path='/ql_xe/the_thue_xe/them_ttx' exact>
          <AddTheThueXe />
        </AuthRouter>

        <AuthRouter path='/ql_xe/the_thue_xe/sua_ttx/:id' exact>
          <EditTheThueXe />
        </AuthRouter>

        <AuthRouter path='/ql_xe/the_thue_xe/ra_vao_the/:id' exact>
          <Checkin />
        </AuthRouter>

        <AuthRouter path='/ql_xe/the_thue_xe/ra_vao_the/sua/:id' exact>
          <EditCheckin />
        </AuthRouter>

        <Route path='/login' exact>
          <Login />
        </Route>

        <Route path='/login/identify' exact>
          <Signup />
        </Route>

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default Routes;
