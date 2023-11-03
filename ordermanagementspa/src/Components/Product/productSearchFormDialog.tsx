import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Product } from "../../Models/Product";
import { ProductSearchForm } from "./productSearchForm";

interface ProductSearchFormDialogProps {
  open: boolean;
  onClose: (product?: Product) => void;
}

const ProductSearchFormDialog = ({
  open,
  onClose,
}: ProductSearchFormDialogProps): JSX.Element => {
  return (
    <Dialog open={open} maxWidth={"lg"}>
      <DialogTitle>Product Search Form</DialogTitle>
      <DialogContent>
        <ProductSearchForm onClose={onClose}></ProductSearchForm>
      </DialogContent>
    </Dialog>
  );
};

export default ProductSearchFormDialog;
