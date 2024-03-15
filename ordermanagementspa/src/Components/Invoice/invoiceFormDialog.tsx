import React from "react";
import { Invoice } from "../../Models/Invoice";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import InvoiceForm from "./invoiceForm";

interface InvoiceFormProps {
  open: boolean;
  onClose: () => void;
  invoice: Invoice;
}

const InvoiceFormDialog = ({
  invoice,
  open,
  onClose,
}: InvoiceFormProps): JSX.Element => {
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"lg"}>
      <DialogTitle>Invoice Form</DialogTitle>
      <DialogContent>
        <InvoiceForm invoice={invoice} onClose={handleClose}></InvoiceForm>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceFormDialog;
