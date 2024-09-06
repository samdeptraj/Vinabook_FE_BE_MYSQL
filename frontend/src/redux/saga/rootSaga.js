import { all, call } from 'redux-saga/effects';
import { actionCreateSanPhamAPI, actionDeleteSanPhamAPI, actionGetAllSanPhamAPI, actionGetAllSanPhamAPIUser, actionUpdateSanPhamAPI } from './actions/SanPhamActionSaga';
import { actionGetUserAPI, actionTheoDoiDeleteUserAPI, actionTheoDoiGetAllUserAPI, actionTheoDoiLoginAPI, actionTheoDoiSignUpAPI, actionTheoDoiUpdateUserAPI } from './actions/NguoiDungActionSaga';
import { actionCreateDanhMucAPI, actionDeleteDanhMucAPI, actionGetAllDanhMucAPI, actionSapXepSpDanhMucAPI, actionUpdateDanhMucAPI } from './actions/DanhMucActionSaga';
import { actionCreateChiTietSPAPI, actionGetAllChiTietSPAPI, actionGetChiTietSPAPIUser, actionUpdateChiTietSPAPI } from './actions/ChiTietSPActionSage';
import { actionCreateSpGioHangAPI, actionDeleteSpGioHangAPI, actionGetAllSpGioHangAPI, actionUpdateSpGioHangAPI } from './actions/GioHangActionSaga';
import { actionCreateHoaDonDatHangAPI, actionGetAllHoaDonDatHangAPI } from './actions/HoaDonDatHangAction';
import { actionCreateDonHangAPI, actionGetAllDonHangAPI, actionGetAllDonHangCuaToiAPI, actionUpdateDonHangAPI } from './actions/DonHangActionSaga';

export function* rootSaga() {
    yield all([
        // sanpham
        call(actionGetAllSanPhamAPI),
        call(actionCreateSanPhamAPI),
        call(actionDeleteSanPhamAPI),
        call(actionUpdateSanPhamAPI),
        call(actionGetAllSanPhamAPIUser),
        call(actionGetChiTietSPAPIUser),

        // nguoidung
        call(actionTheoDoiLoginAPI),
        call(actionTheoDoiSignUpAPI),
        call(actionTheoDoiGetAllUserAPI),
        call(actionTheoDoiUpdateUserAPI),
        call(actionTheoDoiDeleteUserAPI),
        call(actionGetUserAPI),

        // danhmuc
        call(actionGetAllDanhMucAPI),
        call(actionCreateDanhMucAPI),
        call(actionUpdateDanhMucAPI),
        call(actionDeleteDanhMucAPI),
        call(actionSapXepSpDanhMucAPI),

        // chitietsp
        call(actionGetAllChiTietSPAPI),
        call(actionUpdateChiTietSPAPI),
        call(actionCreateChiTietSPAPI),

        // cart
        call(actionCreateSpGioHangAPI),
        call(actionGetAllSpGioHangAPI),
        call(actionUpdateSpGioHangAPI),
        call(actionDeleteSpGioHangAPI),

        // hoa don dat hang
        call(actionCreateHoaDonDatHangAPI),

         // donhang
         call(actionCreateDonHangAPI),
         call(actionGetAllHoaDonDatHangAPI),
         call(actionGetAllDonHangCuaToiAPI),
         call(actionGetAllDonHangAPI),
         call(actionUpdateDonHangAPI),
    ])
}