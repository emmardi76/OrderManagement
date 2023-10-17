import logo from "./logo.png";
import "./App.css";
import { Body } from "./Components/Body/body";
import FooterView from "./Components/Footer/footerView";
import { useNavigate } from "react-router-dom";
import { Button, Icon } from "@mui/material";
import { useState } from "react";

function App() {
  const navigate = useNavigate();
  const [hide, setHide] = useState<boolean>(false);
  const hideHeader = (hide: boolean) => {
    setHide(hide);
  };
  return (
    <div className="App">
      <header className={`App-header ${hide ? "hide" : ""}`}>
        <img src={logo} className="App-logo" alt="logo" />
        <span id="title">OrderManagement</span>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <style>@import url('https://fonts.cdnfonts.com/css/roboto');</style>
        <Button
          id="logout"
          variant="contained"
          onClick={() => {
            localStorage.clear();
            navigate({ pathname: "/" });
          }}
        >
          <Icon color="action">logout</Icon>Logout
        </Button>
      </header>
      <div className="App-body">
        <Body hideHeader={hideHeader}></Body>
      </div>
      <div className="App-footer">
        <FooterView></FooterView>
      </div>
    </div>
  );
}

export default App;
