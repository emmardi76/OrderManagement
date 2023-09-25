import React from "react";
import { Customer } from "../../Models/Customer";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import CustomerForm from "./customerForm";

interface CustomerFormProps {
  open: boolean;
  onClose: () => void;
  customer: Customer;
}

const CustomerFormDialog = ({
  customer,
  open,
  onClose,
}: CustomerFormProps): JSX.Element => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Customer Form</DialogTitle>
      <DialogContent>
        <CustomerForm customer={customer} onClose={handleClose}></CustomerForm>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerFormDialog;
