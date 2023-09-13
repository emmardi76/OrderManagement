import React, { useState } from "react";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import { AccountCircle, MailOutline, Phone, VpnKey } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { register } from "../Services/userServices";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const RegisterForm = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(user);
    await register(user);
    navigate({ pathname: "/" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    console.log([e.target.name], e.target.value);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h2 style={{ color: "grey" }}>Order Management</h2>
        <h2>Regíster now</h2>
        <Icon color="action">
          <AccountCircle />
        </Icon>
        &nbsp;
        <TextField
          name="firstName"
          onChange={(e) => handleChange(e)}
          required
          placeholder="Write your firstname"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <Icon color="action">
          <AccountCircle />
        </Icon>
        &nbsp;
        <TextField
          name="lastName"
          onChange={(e) => handleChange(e)}
          required
          placeholder="Write your lastname"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <Icon color="action">
          <MailOutline />
        </Icon>
        &nbsp;
        <TextField
          name="email"
          onChange={(e) => handleChange(e)}
          required
          placeholder="Write your email"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <Icon color="action">
          <Phone />
        </Icon>
        &nbsp;
        <TextField
          name="phoneNumber"
          onChange={(e) => handleChange(e)}
          required
          placeholder="Write your phonenumber"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <Icon color="action">
          <VpnKey />
        </Icon>
        &nbsp;
        <TextField
          name="password"
          type="password"
          required
          onChange={(e) => handleChange(e)}
          placeholder="Write your password"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <hr />
        <Button
          variant="contained"
          color="inherit"
          onClick={() => navigate({ pathname: "/" })}
        >
          Return
        </Button>
        &nbsp;
        <Button type="submit" variant="contained" color="secondary">
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default RegisterForm;
