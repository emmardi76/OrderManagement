import logo from "./logo.png";
import "./App.css";
import { Body } from "./Components/Body/body";
import FooterView from "./Components/Footer/footerView";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>OrderManagement</p>
        {/* 
          <a
          className="App-link"
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Search in Google
        </a>
        */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <style>@import url('https://fonts.cdnfonts.com/css/roboto');</style>
      </header>
      <div className="App-body">
        <Body></Body>
      </div>
      <br />
      <br />
      <div className="App-footer">
        <FooterView></FooterView>
      </div>
    </div>
  );
}

export default App;
