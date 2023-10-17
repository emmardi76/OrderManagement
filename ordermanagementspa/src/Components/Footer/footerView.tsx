import { Email, Facebook } from "@mui/icons-material";
import { Box, Icon } from "@mui/material";

const FooterView = () => {
  return (
    <footer>
      <span id="copyright">OrderManagementApp - Copyright</span>
      <Box id="footer-icons">
        <Icon className="footer-icon">
          <Email />
        </Icon>

        <Icon className="footer-icon">
          <Facebook />
        </Icon>
      </Box>
    </footer>
  );
};

export default FooterView;
