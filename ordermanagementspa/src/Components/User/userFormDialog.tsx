import React from "react";
import { User } from "../../Models/User";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import UserForm from "./userForm";

interface UsertFormProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

const UserFormDialog = ({
  user,
  open,
  onClose,
}: UsertFormProps): JSX.Element => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"lg"}>
      <DialogTitle>User Form</DialogTitle>
      <DialogContent>
        <UserForm user={user} onClose={handleClose}></UserForm>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
