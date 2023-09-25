import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "../Register/registerForm";
import LoginForm from "../Login/loginForm";
import HomeView from "../Home/homeView";
import { LoginContext } from "../Context/loginContext";
import { TaxTypeSearchForm } from "../TaxType/taxTypeSearchForm";
import { ProductSearchForm } from "../Product/productSearchForm";
import CustomerSearchForm from "../Customer/customerSearchForm";
import OrderSearchForm from "../Order/orderSearchForm";

export const Body = (): JSX.Element => {
  const { userId } = useContext(LoginContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/homeview" element={<HomeView />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/Product/productSearchForm"
          element={<ProductSearchForm />}
        />
        <Route
          path="/TaxType/taxTypeSearchForm"
          element={<TaxTypeSearchForm />}
        />
        <Route
          path="/Customer/customerSearchForm"
          element={<CustomerSearchForm />}
        />
        <Route path="/Order/orderSearchForm" element={<OrderSearchForm />} />
      </Routes>
    </>
  );
};
