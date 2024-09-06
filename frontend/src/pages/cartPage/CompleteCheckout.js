import {jwtDecode} from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CompleteCheckout() {
    const dispatch = useDispatch();
    const listHoaDonDatHang = useSelector(state => state.HoaDonDatHangReducersSaga.listHoaDonDatHang);
    console.log('listHoaDonDatHang: ', listHoaDonDatHang);
    const token = localStorage.getItem('token');
    const decodeToken = jwtDecode(token);
    const maNguoiDung = decodeToken.maNguoiDung;
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (!dataLoaded) {
            dispatch({ type: "GET_ALL_HOA_DON_DAT_HANG_USER" });
        }
    }, [dataLoaded, dispatch]);

    useEffect(() => {
        if (listHoaDonDatHang.length > 0) {
            console.log('decodeToken.maNguoiDung: ', decodeToken.maNguoiDung);
            const listMaHoaDon = listHoaDonDatHang
                .filter(item => item.maNguoiDung === maNguoiDung)
                .map(item => item.id);
            console.log('listMaHoaDon: ', listMaHoaDon);
            dispatch({ type: "ADD_DON_HANG", data: listMaHoaDon });
            setTimeout(() => {
                setDataLoaded(true);
            }, 1000);
        }
    }, [listHoaDonDatHang, dispatch, maNguoiDung]);

    if (!dataLoaded) {
        return (
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="card p-5 shadow" style={{ width: "400px" }}>
                    <div className="text-center mb-4">
                        <h4 className="card-title">Đang tạo đơn hàng...</h4>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status"></div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="card p-5 shadow" style={{ width: "400px" }}>
                    <div className="text-center mb-4">
                        <p style={{ fontSize: "50px" }}><i className="fa-solid fa-circle-check text-success" /></p>
                        <h4 className="card-title">Đã tạo đơn hàng thành công!</h4>
                        <Link to="/don-hang-cua-toi" style={{ textDecoration: "none" }}>
                            <p style={{ fontSize: "18px" }}><i className="fa-solid fa-box"></i> Theo dõi đơn hàng</p>
                        </Link>
                        <br />
                        <Link to="/" className="text-primary"><i className="fa-solid fa-house"></i> Về trang chủ</Link>
                    </div>
                </div>
            </div>
        );
    }
}
