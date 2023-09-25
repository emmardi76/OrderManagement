import { Logout, Menu } from "@mui/icons-material";
import { Avatar, Button, Icon } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const MenuBar = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div>
      <nav>
        <ul>
          <li>
            <br />
            <Icon color="action">
              <Menu />
            </Icon>
          </li>
          <li>
            <Link className="nav-link" to={"/HomeView"}>
              Home
            </Link>
          </li>
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
            <Link className="nav-link" to={"/User"}>
              User
            </Link>
          </li>
          <li>
            <br />
            <Icon>
              <Avatar sx={{ width: 24, height: 24 }}>
                <Logout />
              </Avatar>
            </Icon>
            &nbsp;&nbsp;
          </li>
          <li>
            <Button
              variant="contained"
              onClick={() => {
                localStorage.clear();
                navigate({ pathname: "/" });
              }}
            >
              <Icon color="action">logout</Icon>Logout
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuBar;
