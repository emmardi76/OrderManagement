import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "../Register/registerForm";
import LoginForm from "../Login/loginForm";
import HomeView from "../Home/homeView";
import TaxTypeForm from "../TaxType/taxTypeForm";
import { LoginContext } from "../Context/loginContext";
import { TaxTypeSearchForm } from "../TaxType/taxTypeSearchForm";

export const Body = (): JSX.Element => {
  const { userId } = useContext(LoginContext);
  console.log("userId", userId);
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/homeview" element={<HomeView />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/TaxType/taxTypeForm"
          element={<TaxTypeForm id={0} name={""} taxPercentage={0} />}
        />
        <Route
          path="/TaxType/taxTypeSearchForm"
          element={<TaxTypeSearchForm />}
        />
      </Routes>
    </>
  );
};
