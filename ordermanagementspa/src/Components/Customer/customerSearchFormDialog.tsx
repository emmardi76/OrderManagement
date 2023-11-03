import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import CustomerSearchForm from "./customerSearchForm";
import { Customer } from "../../Models/Customer";

interface CustomerSearchFormDialogProps {
  open: boolean;
  onClose: (customer?: Customer) => void;
}

const CustomerSearchFormDialog = ({
  open,
  onClose,
}: CustomerSearchFormDialogProps): JSX.Element => {
  return (
    <Dialog open={open} maxWidth={"lg"}>
      <DialogTitle>Customer Search Form</DialogTitle>
      <DialogContent>
        <CustomerSearchForm onClose={onClose}></CustomerSearchForm>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerSearchFormDialog;
