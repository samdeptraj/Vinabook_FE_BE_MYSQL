import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
// import App from './App';
import { Provider } from "react-redux";
import LoadingComponent from "./components/globalSetting/LoadingComponent/LoadingComponent";
import store from "./redux/configStore";
import reportWebVitals from "./reportWebVitals";
import RouterCustom from "./router/routerUser";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <LoadingComponent />
      <RouterCustom />
    </Provider>
  </BrowserRouter>
);
export default store;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
