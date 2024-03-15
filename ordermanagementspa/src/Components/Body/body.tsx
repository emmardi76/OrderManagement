import { Route, Routes } from "react-router-dom";
import RegisterForm from "../Register/registerForm";
import LoginForm from "../Login/loginForm";
import HomeView from "../Home/homeView";
import { TaxTypeSearchForm } from "../TaxType/taxTypeSearchForm";
import { ProductSearchForm } from "../Product/productSearchForm";
import CustomerSearchForm from "../Customer/customerSearchForm";
import OrderSearchForm from "../Order/orderSearchForm";
import { UserSearchForm } from "../User/userSearchForm";
import InvoiceSearchForm from "../Invoice/invoiceSearchForm";

interface BodyProps {
  hideHeader?: (hide: boolean) => void;
}
export const Body = ({ hideHeader }: BodyProps): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm hideHeader={hideHeader} />} />
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
        <Route
          path="/Invoice/invoiceSearchForm"
          element={<InvoiceSearchForm />}
        />
        <Route path="/User/userSearchForm" element={<UserSearchForm />} />
      </Routes>
    </>
  );
};
