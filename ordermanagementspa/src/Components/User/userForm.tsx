import React, { useState } from "react";
import { User } from "../../Models/User";
import { updateUser } from "../Services/userServices";
import axios, { AxiosResponse } from "axios";
import { RegisterUser } from "../../Models/RegisterUser";
import { useNavigate } from "react-router-dom";
import { Button, Container, Icon, TextField } from "@mui/material";

interface UserFormProps {
  onClose: () => void;
  user: User;
}

const UserForm = ({ onClose, user }: UserFormProps): JSX.Element => {
  const [editUser, setUser] = useState<User>(user);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let result: AxiosResponse<User> | undefined = undefined;
    let resultRegister: AxiosResponse<RegisterUser> | undefined = undefined;
    if (editUser) {
      if (editUser.id === 0) {
        // Create.//Send to register
        setMsg("The user doesn´t exist.You must register");
        navigate({ pathname: "/register" });
        resultRegister = await axios.post("User/RegisterUser", user);
        result = resultRegister;
      } else {
        // Change.
        result = await updateUser(editUser);
      }

      if (result?.status === 200) {
        setMsg("The operation is success.");
        onClose();
      } else {
        setMsg("The operation isn´t success, try again.");
      }
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    console.log("editUser", editUser);
    if (editUser) {
      setUser({
        ...editUser,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="formFields">
          <div className="formFieldPanel">
            <TextField
              className="formField"
              label="FirstName"
              focused
              type="firstName"
              name="firstName"
              onChange={(e) => handleChange(e)}
              required
              placeholder="Write your firstname"
            />
            <TextField
              className="formField"
              label="LastName"
              focused
              type="lastName"
              name="lastName"
              onChange={(e) => handleChange(e)}
              required
              placeholder="Write your lastname"
            />
            <TextField
              className="formField"
              label="Email"
              focused
              type="email"
              name="email"
              onChange={(e) => handleChange(e)}
              required
              placeholder="Write your email"
            />
            <TextField
              className="formField"
              label="PhoneNumber"
              focused
              type="phonenumber"
              name="phoneNumber"
              onChange={(e) => handleChange(e)}
              required
              placeholder="Write your phonenumber"
            />
            <TextField
              className="formField"
              label="password"
              focused
              name="password"
              type="password"
              required
              onChange={(e) => handleChange(e)}
              placeholder="Write your password"
            />
          </div>
          <div className="formButtonsPanel">
            <Button
              className="formButton"
              type="submit"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
            <Button
              className="formButton"
              type="button"
              variant="contained"
              color="primary"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default UserForm;
