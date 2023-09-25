import React, { useState } from "react";
import { Product } from "../../Models/Product";
import { Button, Container, TextField } from "@mui/material";
import { AxiosResponse } from "axios";
import { addProduct, updateProduct } from "../Services/productServices";

interface ProductFormProps {
  onClose: () => void;
  product: Product;
}

const ProductForm = ({ product, onClose }: ProductFormProps): JSX.Element => {
  const [editProduct, setProduct] = useState<Product>(product);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let result: AxiosResponse<Product> | undefined = undefined;
    if (editProduct) {
      if (editProduct.id === 0) {
        // Create.
        result = await addProduct(editProduct);
      } else {
        // Change.
        result = await updateProduct(editProduct);
      }

      if (result.status === 200) {
        setMsg("The operation is success.");
        onClose();
      } else {
        setMsg("The operation isn´t success, try again.");
      }
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    console.log("editProduct", editProduct);
    if (editProduct) {
      setProduct({
        ...editProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div>"This is the product Form"</div>
        <br />
        <TextField
          label="Name"
          focused
          type="name"
          name="name"
          value={editProduct?.name}
          onChange={(e: { target: { name: string; value: string } }) =>
            handleChange(e)
          }
          placeholder="Write the name of product"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <TextField
          label="Description"
          focused
          type="description"
          name="description"
          value={editProduct?.description}
          onChange={(e) => handleChange(e)}
          placeholder="Write your product description"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <TextField
          label="TaxTypeId"
          focused
          type="taxtypeId"
          name="taxtypeId"
          value={editProduct?.taxTypeId}
          onChange={(e) => handleChange(e)}
          placeholder="Write your taxtypeId for the product "
          style={{ width: 300 }}
        />
        <br />
        <br />
        <TextField
          label="UnitPrice"
          focused
          type="unitPrice"
          name="unitPrice"
          value={editProduct?.unitPrice}
          onChange={(e) => handleChange(e)}
          placeholder="Write your unitPrice for the product "
          style={{ width: 300 }}
        />
        <br />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        &nbsp;
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={onClose}
        >
          Cancel
        </Button>
      </form>
    </Container>
  );
};

export default ProductForm;
