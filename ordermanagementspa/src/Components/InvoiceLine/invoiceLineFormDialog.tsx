import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { InvoiceLine } from "../../Models/InvoiceLine";
import React from "react";
import InvoiceLineForm from "./invoiceLineForm";

interface InvoiceLineFormProps {
  open: boolean;
  onClose: () => void;
  invoiceLine: InvoiceLine;
}

const InvoiceLineFormDialog = ({
  invoiceLine,
  open,
  onClose,
}: InvoiceLineFormProps): JSX.Element => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"lg"}>
      <DialogTitle>Invoice Line Form</DialogTitle>
      <DialogContent>
        <InvoiceLineForm
          invoiceLine={invoiceLine}
          onClose={handleClose}
        ></InvoiceLineForm>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceLineFormDialog;
