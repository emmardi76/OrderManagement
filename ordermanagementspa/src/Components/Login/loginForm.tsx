import React, { useState, useContext, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import { MailOutline, VpnKey } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { login } from "../Services/userServices";
import { LoginContext } from "../Context/loginContext";
interface LoginFormProps {
  hideHeader?: (hide: boolean) => void;
}

const LoginForm = ({ hideHeader }: LoginFormProps): JSX.Element => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const { handleLogin, setToken, setUserId } = useContext(LoginContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(user).then((loginResult) => {
      if (loginResult.status === 200) {
        const token = loginResult.data.token;
        const claims = token.split(".")[1];
        var decodedValue = JSON.parse(window.atob(claims));
        setToken && setToken(token);
        setUserId && setUserId(decodedValue.sub);
        handleLogin(decodedValue.sub, token);
        hideHeader && hideHeader(false);
        navigate({ pathname: "/homeview" });
      } else {
        setMsg("The credentials aren´t correct, try again.");
      }
    });
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    hideHeader && hideHeader(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container id="loginForm">
      <form onSubmit={handleSubmit}>
        <h2 id="loginTitle">Order Management</h2>
        <h2>Welcome</h2>
        <Icon color="action" className="loginIcon">
          <MailOutline />
        </Icon>
        &nbsp;
        <TextField
          type="email"
          name="email"
          onChange={(e: { target: { name: string; value: string } }) =>
            handleChange(e)
          }
          required
          placeholder="Write your email"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <Icon color="action" className="loginIcon">
          <VpnKey />
        </Icon>
        &nbsp;
        <TextField
          type="password"
          name="password"
          onChange={(e) => handleChange(e)}
          required
          placeholder="Write your password"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <h4 style={{ color: "red" }}>{msg}</h4>
        <hr />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>{" "}
        &nbsp;
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate({ pathname: "/register" })}
        >
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
