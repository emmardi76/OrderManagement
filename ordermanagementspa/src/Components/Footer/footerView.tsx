import { Email, Facebook } from "@mui/icons-material";
import { Icon } from "@mui/material";

const FooterView = () => {
  return (
    <footer>
      <p>OrderManagementApp - Copyright</p>
      <Icon>
        <Email />
      </Icon>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Icon>
        <Facebook />
      </Icon>
    </footer>
  );
};

export default FooterView;
