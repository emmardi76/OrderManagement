import React from "react";
import ProductForm from "./productForm";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Product } from "../../Models/Product";

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

const ProductFormDialog = ({
  product,
  open,
  onClose,
}: ProductFormProps): JSX.Element => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Product Form</DialogTitle>
      <DialogContent>
        <ProductForm product={product} onClose={handleClose}></ProductForm>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
