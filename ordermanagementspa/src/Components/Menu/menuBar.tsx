import { Link } from "react-router-dom";

const MenuBar = (): JSX.Element => {
  return (
    <nav className="menubar">
      <ul>
        <li>
          <Link className="nav-link" to={"/Customer/customerSearchForm"}>
            Customer
          </Link>
        </li>
        <li>
          <Link className="nav-link" to={"/Order/orderSearchForm"}>
            Order
          </Link>
        </li>
        <li>
          <Link className="nav-link" to={"/Product/productSearchForm"}>
            Product
          </Link>
        </li>
        <li>
          <Link className="nav-link" to={"/TaxType/taxTypeSearchForm"}>
            TaxType
          </Link>
        </li>
        <li>
          <Link className="nav-link" to={"/User/userSearchForm"}>
            User
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MenuBar;
