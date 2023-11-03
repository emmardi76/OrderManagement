import React, { useEffect, useState } from "react";
import { OrderLine } from "../../Models/OrderLine";
import {
  Button,
  Container,
  Icon,
  InputAdornment,
  TextField,
} from "@mui/material";
import { addOrderLine, updateOrderLine } from "../Services/orderLineServices";
import { AxiosResponse } from "axios";
import { Search } from "@mui/icons-material";
import { Product } from "../../Models/Product";
import { getProducts, searchProduct } from "../Services/productServices";
import ProductSearchFormDialog from "../Product/productSearchFormDialog";

interface OrderLineFormProps {
  onClose: () => void;
  orderLine: OrderLine;
}

const OrderLineForm = ({
  orderLine,
  onClose,
}: OrderLineFormProps): JSX.Element => {
  const [editOrderLine, setOrderLine] = useState<OrderLine>(orderLine);
  const [msg, setMsg] = useState("");

  const onSave = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let result: AxiosResponse<OrderLine> | undefined = undefined;
    if (editOrderLine) {
      if (editOrderLine.id === 0) {
        // Create.
        result = await addOrderLine(editOrderLine);
      } else {
        // Change.
        result = await updateOrderLine(editOrderLine);
      }

      if (result.status === 200) {
        setMsg("The operation is success.");
        onClose();
      } else {
        setMsg("The operation isn´t success, try again.");
      }
    }
  };

  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (editOrderLine.productId) {
      getProducts({ id: editOrderLine.productId }).then((result) => {
        if (result.status === 200) {
          const products: Product[] = result.data;
          setCurrentProducts(products);
        }
      });
    } else {
      setCurrentProducts([]);
    }
  }, [editOrderLine.productId]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    if (editOrderLine) {
      setOrderLine({
        ...editOrderLine,
        [e.target.name]: e.target.value,
      });
    }
  };

  const [inputValue, setInputValue] = useState<string>("");

  const getProductsFronName = (name: string) => {
    searchProduct(name).then((result) => {
      if (result.status === 200) {
        const products: Product[] = result.data;
        setCurrentProducts(products);
      }
    });
  };

  const handleSearchProduct = () => {
    setOpenProductSearchForm(true);
  };

  const [openProductSearchForm, setOpenProductSearchForm] = useState(false);
  const handleCloseProductSearchForm = (product?: Product) => {
    setOpenProductSearchForm(false);
    if (product) {
      editOrderLine.productId = product.id;
      editOrderLine.name = product.name;
      editOrderLine.taxTypeId = product.taxTypeId;
      editOrderLine.unitPrice = product.unitPrice;
      if (product.taxPercentage) {
        editOrderLine.taxPercentage = product.taxPercentage;
      }
    }
  };

  return (
    <Container sx={{ width: "100%" }}>
      <form>
        <div className="formFields">
          <div className="formFieldPanel">
            <TextField
              focused
              className="formField"
              label="Product Name"
              type="text"
              name="productName"
              value={editOrderLine?.name}
              onChange={(e) => handleChange(e)}
              placeholder="Write the product name of the orderLine"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <Icon color="action" onClick={handleSearchProduct}>
                      <Search />
                    </Icon>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="formField"
              label="Quantity"
              focused
              type="number"
              name="quantity"
              value={editOrderLine?.quantity}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value)) {
                  setOrderLine({
                    ...editOrderLine,
                    quantity: 0,
                  });
                } else {
                  setOrderLine({
                    ...editOrderLine,
                    quantity: parseFloat(e.target.value),
                  });
                }
              }}
              placeholder="Write the quantity of orderLine"
            />
            <TextField
              className="formField"
              label="TaxPercentage"
              disabled
              type="number"
              name="taxPercentage"
              value={editOrderLine?.taxPercentage}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value)) {
                  setOrderLine({
                    ...editOrderLine,
                    taxPercentage: 0,
                  });
                } else {
                  setOrderLine({
                    ...editOrderLine,
                    taxPercentage: parseFloat(e.target.value),
                  });
                }
              }}
              placeholder="Write the taxPercentage of orderLine"
            />
            <TextField
              className="formField"
              label="UnitPrice"
              focused
              type="number"
              name="unitPrice"
              value={editOrderLine?.unitPrice}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value)) {
                  setOrderLine({
                    ...editOrderLine,
                    unitPrice: 0,
                  });
                } else {
                  setOrderLine({
                    ...editOrderLine,
                    unitPrice: parseFloat(e.target.value),
                  });
                }
              }}
              placeholder="Write the unitPrice of orderLine"
            />
          </div>
          <div className="formButtonsPanel">
            <Button
              className="formButton"
              type="button"
              variant="contained"
              color="primary"
              onClick={onSave}
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
        <ProductSearchFormDialog
          open={openProductSearchForm}
          onClose={handleCloseProductSearchForm}
        ></ProductSearchFormDialog>
      </form>
    </Container>
  );
};

export default OrderLineForm;
