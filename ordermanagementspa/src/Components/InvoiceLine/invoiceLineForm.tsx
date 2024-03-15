import React, { useEffect, useState } from "react";
import { InvoiceLine } from "../../Models/InvoiceLine";
import {
  addInvoiceLine,
  updateInvoiceLine,
} from "../Services/invoiceLineServices";
import { AxiosResponse } from "axios";
import { getProducts, searchProduct } from "../Services/productServices";
import { Product } from "../../Models/Product";
import {
  Button,
  Container,
  Icon,
  InputAdornment,
  TextField,
} from "@mui/material";
import ProductSearchFormDialog from "../Product/productSearchFormDialog";
import { Search } from "@mui/icons-material";

interface InvoiceLIneFormProps {
  onClose: () => void;
  invoiceLine: InvoiceLine;
}

const InvoiceLineForm = ({
  invoiceLine,
  onClose,
}: InvoiceLIneFormProps): JSX.Element => {
  const [editInvoiceLine, setInvoiceLine] = useState<InvoiceLine>(invoiceLine);

  const [msg, setMsg] = useState("");

  const onSave = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let result: AxiosResponse<InvoiceLine> | undefined = undefined;
    if (editInvoiceLine) {
      if (editInvoiceLine.id === 0) {
        // Create.
        result = await addInvoiceLine(editInvoiceLine);
      } else {
        // Change.
        result = await updateInvoiceLine(editInvoiceLine);
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
    if (editInvoiceLine.productId) {
      getProducts({ id: editInvoiceLine.productId }).then((result) => {
        if (result.status === 200) {
          const products: Product[] = result.data;
          setCurrentProducts(products);
        }
      });
    } else {
      setCurrentProducts([]);
    }
  }, [editInvoiceLine.productId]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    if (editInvoiceLine) {
      setInvoiceLine({
        ...editInvoiceLine,
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
      editInvoiceLine.productId = product.id;
      editInvoiceLine.name = product.name;
      editInvoiceLine.taxTypeId = product.taxTypeId;
      editInvoiceLine.unitPrice = product.unitPrice;
      if (product.taxPercentage) {
        editInvoiceLine.taxPercentage = product.taxPercentage;
      }
    }
  };

  return (
    <Container>
      <form>
        <div className="formFields">
          <div className="formFieldPanel">
            <TextField
              focused
              className="formField"
              label="Product Name"
              type="text"
              name="productName"
              value={editInvoiceLine?.name}
              onChange={(e) => handleChange(e)}
              placeholder="Write the product name of the invoiceLine"
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
              value={editInvoiceLine?.quantity}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value)) {
                  setInvoiceLine({
                    ...editInvoiceLine,
                    quantity: 0,
                  });
                } else {
                  setInvoiceLine({
                    ...editInvoiceLine,
                    quantity: parseFloat(e.target.value),
                  });
                }
              }}
              placeholder="Write the quantity of invoiceLine"
            />
            <TextField
              className="formField"
              label="TaxPercentage"
              disabled
              type="number"
              name="taxPercentage"
              value={editInvoiceLine?.taxPercentage}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value)) {
                  setInvoiceLine({
                    ...editInvoiceLine,
                    taxPercentage: 0,
                  });
                } else {
                  setInvoiceLine({
                    ...editInvoiceLine,
                    taxPercentage: parseFloat(e.target.value),
                  });
                }
              }}
              placeholder="Write the taxPercentage of invoiceLine"
            />
            <TextField
              className="formField"
              label="UnitPrice"
              focused
              type="number"
              name="unitPrice"
              value={editInvoiceLine?.unitPrice}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value)) {
                  setInvoiceLine({
                    ...editInvoiceLine,
                    unitPrice: 0,
                  });
                } else {
                  setInvoiceLine({
                    ...editInvoiceLine,
                    unitPrice: parseFloat(e.target.value),
                  });
                }
              }}
              placeholder="Write the unitPrice of invoiceLine"
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

export default InvoiceLineForm;
