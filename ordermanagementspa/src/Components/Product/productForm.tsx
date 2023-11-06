import React, { useEffect, useState } from "react";
import { Product } from "../../Models/Product";
import { Button, Container, MenuItem, TextField } from "@mui/material";
import { AxiosResponse } from "axios";
import { addProduct, updateProduct } from "../Services/productServices";
import { TaxType } from "../../Models/TaxType";
import { getTaxes } from "../Services/taxTypeServices";

interface ProductFormProps {
  onClose: () => void;
  product: Product;
}

const ProductForm = ({ product, onClose }: ProductFormProps): JSX.Element => {
  const [editProduct, setProduct] = useState<Product>(product);
  const [msg, setMsg] = useState("");

  const [taxPercentages, setTaxPercentages] = useState<TaxType[]>([]);

  const handleTaxPercentage = async () => {
    const { data: taxPercentage } = await getTaxes();
    setTaxPercentages(taxPercentage);
  };

  useEffect(() => {
    handleTaxPercentage();
  }, []);

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
        <div className="formFields">
          <div className="formFieldPanel">
            <TextField
              className="formField"
              label="Name"
              focused
              type="text"
              name="name"
              value={editProduct?.name}
              onChange={(e: { target: { name: string; value: string } }) =>
                handleChange(e)
              }
              placeholder="Write the name of product"
              style={{ width: 300 }}
            />
            <TextField
              className="formField"
              label="Description"
              focused
              type="text"
              name="description"
              value={editProduct?.description}
              onChange={(e) => handleChange(e)}
              placeholder="Write your product description"
              style={{ width: 300 }}
            />
            <TextField
              className="formField"
              select
              autoFocus
              label={"TaxType"}
              style={{ width: 300 }}
              onChange={(e) => {
                setProduct({
                  ...editProduct,
                  taxTypeId: e.target.value as unknown as number,
                });
              }}
              value={editProduct?.taxTypeId}
            >
              {taxPercentages.map((option) => (
                <MenuItem key={option.taxPercentage} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              className="formField"
              label="UnitPrice"
              focused
              type="number"
              name="unitPrice"
              value={editProduct?.unitPrice}
              onChange={(e) => handleChange(e)}
              placeholder="Write your unitPrice for the product "
              style={{ width: 300 }}
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

export default ProductForm;
