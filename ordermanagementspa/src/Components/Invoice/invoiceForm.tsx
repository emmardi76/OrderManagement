import React, { useEffect, useState } from "react";
import { Invoice } from "../../Models/Invoice";
import { CustomerAddress } from "../../Models/CustomerAddress";
import { getCustomerAddresses } from "../Services/customerAddressServices";
import { AxiosResponse } from "axios";
import {
  addInvoice,
  getInvoice,
  updateInvoice,
} from "../Services/invoiceServices";
import { InvoiceUpdate } from "../../Models/InvoiceUpdate";
import { InvoiceLine } from "../../Models/InvoiceLine";
import { Customer } from "../../Models/Customer";
import { InvoiceLineQuery } from "../../Models/InvoiceLineQuery";
import { getInvoiceLines } from "../Services/invoiceLineServices";
import {
  Autocomplete,
  Button,
  Container,
  Icon,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { dateToAnsiDate } from "../../Utils/utils";
import CustomerSearchFormDialog from "../Customer/customerSearchFormDialog";
import InvoiceLineSearchView from "../InvoiceLine/invoiceLineSearchView";

interface InvoiceFormProps {
  onClose: () => void;
  invoice: Invoice;
}

const defaultCustomerAddress = {
  id: 0,
  customerId: 0,
  description: "",
  street: "",
  streetNumber: "",
  door: "",
  zipCode: "",
  city: "",
  country: "",
};

const InvoiceForm = ({ invoice, onClose }: InvoiceFormProps): JSX.Element => {
  const [editInvoice, setEditInvoice] = useState<Invoice>(invoice);

  const [msg, setMsg] = useState("");

  const [currentCustomerAddresses, setCurrentCustomerAddresses] = useState<
    CustomerAddress[]
  >([defaultCustomerAddress]);

  const [currentCustomerAddress, setCurrentCustomerAddress] = useState<
    CustomerAddress | undefined
  >();

  useEffect(() => {
    if (editInvoice.customerId) {
      getCustomerAddresses({ customerId: editInvoice.customerId }).then(
        (result) => {
          if (result.status === 200) {
            const addresses: CustomerAddress[] = result.data;
            addresses.push(defaultCustomerAddress);
            setCurrentCustomerAddresses(addresses);
          }
        }
      );
    } else {
      setCurrentCustomerAddresses([defaultCustomerAddress]);
    }
  }, [editInvoice.customerId]);

  useEffect(() => {
    if (editInvoice.customerAddressId && currentCustomerAddresses.length > 0) {
      const currentAddress = currentCustomerAddresses.find(
        (x) => x.id === editInvoice.customerAddressId
      );
      setCurrentCustomerAddress(currentAddress);
    } else {
      setCurrentCustomerAddress(defaultCustomerAddress);
    }
  }, [currentCustomerAddresses, editInvoice.customerAddressId]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let result: AxiosResponse<Invoice> | undefined = undefined;
    if (editInvoice) {
      if (editInvoice.id === 0) {
        // Create.
        result = await addInvoice(editInvoice);
      } else {
        // Change.
        const invoiceUpdate: InvoiceUpdate = editInvoice;
        result = await updateInvoice(invoiceUpdate);
      }

      if (result.status === 200) {
        setMsg("The operation is success.");
        if (editInvoice.id > 0) {
          onClose();
        } else {
          setEditInvoice(result.data);
        }
      } else {
        setMsg("The operation isn´t success, try again.");
      }
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    if (editInvoice) {
      setEditInvoice({
        ...editInvoice,
        [e.target.name]: e.target.value,
      });
    }
  };

  const [invoiceLines, setEditInvoiceLines] = useState<InvoiceLine[]>([]);

  const refreshInvoiceLines = () => {
    const invoiceLineQuery: InvoiceLineQuery = {
      invoiceId: editInvoice.id,
    };
    getInvoiceLines(invoiceLineQuery).then((result) => {
      if (result.status === 200) {
        setEditInvoiceLines(result.data);
      }
    });

    getInvoice(editInvoice.id).then((result) => {
      if (result.status === 200) {
        const freshInvoice = result.data;
        if (freshInvoice) {
          setEditInvoice({
            ...editInvoice,
            total: freshInvoice.total,
            totalTaxes: freshInvoice.totalTaxes,
            totalWithoutTaxes: freshInvoice.totalWithoutTaxes,
          });
        }
      }
    });
  };

  useEffect(() => {
    refreshInvoiceLines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editInvoice.id]);
  const onCloseInvoiceLineDialog = () => {
    refreshInvoiceLines();
  };
  const handleSearchCustomer = () => {
    setOpenCustomerSearchForm(true);
  };

  const [openCustomerSearchForm, setOpenCustomerSearchForm] = useState(false);
  const handleCloseCustomerSearchForm = (customer?: Customer) => {
    setOpenCustomerSearchForm(false);
    if (customer) {
      editInvoice.customerId = customer.id;
      editInvoice.customerName = customer.firstName + " " + customer.lastName;
    }
  };

  return (
    <Container sx={{ width: "100%" }}>
      <form onSubmit={handleSubmit}>
        <div className="formFields">
          <div className="formFieldPanel">
            <TextField
              focused
              className="formField"
              fullWidth
              label="Customer"
              type="text"
              name="customer"
              value={editInvoice?.customerName}
              placeholder="Please use the search button to select one"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <Icon color="action" onClick={handleSearchCustomer}>
                      <Search />
                    </Icon>
                  </InputAdornment>
                ),
              }}
            />

            <Autocomplete
              options={currentCustomerAddresses}
              value={currentCustomerAddress ?? defaultCustomerAddress}
              onChange={(event: any, newValue: CustomerAddress | null) => {
                if (newValue) {
                  setEditInvoice({
                    ...editInvoice,
                    customerAddressId: newValue?.id,
                  });
                } else {
                  setCurrentCustomerAddress(defaultCustomerAddress);
                }
              }}
              getOptionLabel={(option: CustomerAddress) => {
                if (option.id === 0) {
                  return "";
                } else {
                  return `${option.street}, ${option.streetNumber}, ${option.zipCode}`;
                }
              }}
              renderInput={(params) => (
                <TextField
                  className="formField"
                  focused
                  {...params}
                  label="Customer Address"
                  placeholder="Please, select an address"
                />
              )}
            />

            <TextField
              className="formField"
              label="Date"
              focused
              type="Date"
              name="date"
              value={dateToAnsiDate(editInvoice?.date)}
              onChange={(e) => {
                if (e) {
                  setEditInvoice({
                    ...editInvoice,
                    date: e.target.value
                      ? new Date(e.target.value)
                      : new Date(),
                  });
                }
              }}
              placeholder="Write the date of invoice"
            />
            <TextField
              className="formField"
              label="InvoiceNumber"
              focused
              name="invoiceNumber"
              value={editInvoice?.invoiceNumber}
              onChange={(e) => {
                setEditInvoice({
                  ...editInvoice,
                  invoiceNumber: e.target.value,
                });
              }}
              placeholder="Write the invoiceNumber of invoice"
              inputProps={{ maxLength: 10, type: "string" }}
            />

            <TextField
              className="formField"
              label="Remarks"
              focused
              type="text"
              name="remarks"
              value={editInvoice?.remarks}
              onChange={(e) => handleChange(e)}
              placeholder="Write the remarks of invoice"
            />

            <TextField
              className="formField"
              label="DueDate"
              focused
              type="Date"
              name="dueDate"
              value={dateToAnsiDate(editInvoice?.dueDate)}
              onChange={(e) => {
                if (e) {
                  setEditInvoice({
                    ...editInvoice,
                    dueDate: e.target.value
                      ? new Date(e.target.value)
                      : new Date(),
                  });
                }
              }}
              placeholder="Write the dueDate of invoice"
            />
            <TextField
              className="formField"
              label="TotalWithoutTaxes"
              disabled
              type="number"
              name="totalWithoutTaxes"
              value={editInvoice?.totalWithoutTaxes}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value)) {
                  setEditInvoice({
                    ...editInvoice,
                    totalWithoutTaxes: 0,
                  });
                } else {
                  setEditInvoice({
                    ...editInvoice,
                    totalWithoutTaxes: parseFloat(e.target.value),
                  });
                }
              }}
              placeholder="Write the totalWithoutTaxes of invoice"
            />
            <TextField
              className="formField"
              label="Total"
              disabled
              type="number"
              name="total"
              value={editInvoice?.total}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value)) {
                  setEditInvoice({
                    ...editInvoice,
                    total: 0,
                  });
                } else {
                  setEditInvoice({
                    ...editInvoice,
                    total: parseFloat(e.target.value),
                  });
                }
              }}
              placeholder="Write the total of invoice"
            />
            <TextField
              className="formField"
              label="TotalTaxes"
              disabled
              type="number"
              name="totalTaxes"
              value={editInvoice?.totalTaxes}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value)) {
                  setEditInvoice({
                    ...editInvoice,
                    totalTaxes: 0,
                  });
                } else {
                  setEditInvoice({
                    ...editInvoice,
                    totalTaxes: parseFloat(e.target.value),
                  });
                }
              }}
              placeholder="Write the totalTaxes of invoice"
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

        {/*grid of invoice lines*/}
        {editInvoice && editInvoice.id > 0 && (
          <InvoiceLineSearchView
            invoiceId={editInvoice.id}
            invoiceLines={invoiceLines}
            onClose={onCloseInvoiceLineDialog}
          />
        )}

        <CustomerSearchFormDialog
          open={openCustomerSearchForm}
          onClose={handleCloseCustomerSearchForm}
        ></CustomerSearchFormDialog>
      </form>
    </Container>
  );
};

export default InvoiceForm;
