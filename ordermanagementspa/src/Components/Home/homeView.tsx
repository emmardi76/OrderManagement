import { Container } from "@mui/material";
//import { ResponsiveAppBar } from "../ResponsiveAppBar/responsiveAppBar";
import MenuBar from "../Menu/menuBar";

const HomeView = (): JSX.Element => {
  return (
    <Container>
      <div>
        <MenuBar></MenuBar>
      </div>
    </Container>
  );
};

export default HomeView;
