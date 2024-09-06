import { GET_ALL_SAN_PHAM_SAGA } from "../types/sanPham.types";

const initialState = {
    listSanPhamCart: [],

}
const GioHangReducerSaga = (state = initialState, action) => {
    switch (action.type) {

        case "GET_ALL_SP_GIO_HANG_SAGA": {
            return { ...state, listSanPhamCart: action.data }
        }
        // case "GET_ALL_SAN_PHAM_USER_SAGA": {
        //     return { ...state, listSanPhamUser: action.data }
        // }
        // case "ADD_SAN_PHAM_CART": {
        //     const newSanPhamCart = [...state.sanPhamCart];
        //     let index = newSanPhamCart.findIndex(item => item.maSanPham === action.data.maSanPham);
        //     if (index !== -1) {
        //         newSanPhamCart[index] = { ...newSanPhamCart[index], soLuong: Number(newSanPhamCart[index].soLuong) + 1 }
        //     } else {
        //         newSanPhamCart.push(action.data)
        //     }
        //     console.log('newSanPhamCart: ', newSanPhamCart);
        //     return { ...state, sanPhamCart: newSanPhamCart }

        // }
        // case "TANG_GIAM_SO_LUONG_SP": {
        //     let sanPhamTangGiam = [...state.sanPhamCart];
        //     let index = sanPhamTangGiam.findIndex(item => item.maSanPham === action.data.id);
        //     if (index !== -1) {
        //         let newSoLuong = Number(sanPhamTangGiam[index].soLuong) + (action.data.type ? 1 : (-1));
        //         if (newSoLuong < 0) {
        //             newSoLuong = 0;
        //         }
        //         sanPhamTangGiam[index] = {
        //             ...sanPhamTangGiam[index],
        //             soLuong: newSoLuong
        //         }
        //     }
        //     return { ...state, sanPhamCart: sanPhamTangGiam }

        // }
        default:
            return { ...state }

    }
}
export default GioHangReducerSaga;