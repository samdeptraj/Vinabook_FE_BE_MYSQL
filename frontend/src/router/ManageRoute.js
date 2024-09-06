import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/homePage";
import { ROUTERS, ROUTERS_ADMIN } from "../utils/router";
import ProfilePage from "../pages/profilePage";
import SignUp from "../pages/signupPage/SignUp";
import Cart from "../pages/cartPage/Cart";
import News from "../pages/news/News";
import NewsPage from "../pages/news/NewsPage";
import Category from "../pages/categoryPage/Category";
import DetailProduct from "../pages/layouts/Main/mainLeft/DetailProduct";
import PageNotFound from "../components/PageNotFound";
import Home from "../components/admin/home/Home";
import TaiKhoan from "../pages/layouts/header/component/headerMain/TaiKhoan";
import UpdateChiTietSP from "../components/admin/home/UpdateChiTietSP";
import AddChiTiet from "../components/admin/home/AddChiTiet";
import Checkout from "../pages/cartPage/Checkout";
import CompleteCheckout from "../pages/cartPage/CompleteCheckout";
import ProductOrdered from "../pages/cartPage/ProductOrdered";
import Search from "../pages/Search/Search";
export const ManageRoute = [
    {
        path: ROUTERS.HOME,
        component: <HomePage />,
        isShowLayout: true
    },
    {
        path: ROUTERS.PROFILE,
        component: <ProfilePage />,
        isShowLayout: true
    },
    {
        path: ROUTERS.SIGNUP,
        component: <SignUp />,
        isShowLayout: true
    },
    {
        path: ROUTERS.DETAIL,
        component: <DetailProduct />,
        isShowLayout: true
    },
    {
        path: ROUTERS.CART,
        component: <Cart />,
        isShowLayout: true
    },
    {
        path: ROUTERS.NEWS,
        component: <News />,
        isShowLayout: true,
        child: [
            {
                path: ROUTERS.NEWSPAGE,
                component: <NewsPage />,
                isShowLayout: true
            },
        ],
    },
    {
        path: ROUTERS.CATEGORY,
        component: <Category />,
        isShowLayout: true
    },
    {
        path: ROUTERS.TAIKHOAN,
        component: <TaiKhoan />,
        isShowLayout: true
    },
    {
        path: ROUTERS.THANHTOAN,
        component: <Checkout />,
        isShowLayout: false
    },
    {
        path: ROUTERS.KIEMTRATHANHTOAN,
        component: < CompleteCheckout />,
        isShowLayout: false
    },
    {
        path: ROUTERS.DONHANGCUATOI,
        component: < ProductOrdered />,
        isShowLayout: true
    },
    {
        path: ROUTERS.SEARCH,
        component: < Search />,
        isShowLayout: true
    },
    {
        path: ROUTERS.NOTFOUND,
        component: <PageNotFound />,
        isShowLayout: true
    },
    {
        path: ROUTERS_ADMIN.HOME,
        component: <Home />,
        isShowLayout: false
    },
    {
        path: ROUTERS_ADMIN.UPDATE_CHITIET_SP,
        component: <UpdateChiTietSP />,
        isShowLayout: false
    },
    {
        path: ROUTERS_ADMIN.ADD_CHITIET_SP,
        component: <AddChiTiet />,
        isShowLayout: false
    }
];