import React, { useEffect, useState } from "react";
import { Order } from "../../Models/Order";
import { AxiosResponse } from "axios";
import { addOrder, getOrder, updateOrder } from "../Services/orderServices";
import {
  Autocomplete,
  Button,
  Container,
  Icon,
  InputAdornment,
  TextField,
} from "@mui/material";
import OrderLineSearchView from "../OrderLine/orderLineSearchView";
import { OrderLine } from "../../Models/OrderLine";
import { OrderLineQuery } from "../../Models/OrderLineQuery";
import { getOrderLines } from "../Services/orderLineServices";
import { dateToAnsiDate } from "../../Utils/utils";
import { CustomerAddress } from "../../Models/CustomerAddress";
import { getCustomerAddresses } from "../Services/customerAddressServices";
import { Customer } from "../../Models/Customer";
import { getCustomers, searchCustomer } from "../Services/customerServices";
import { Search } from "@mui/icons-material";
import CustomerSearchFormDialog from "../Customer/customerSearchFormDialog";
import { OrderUpdate } from "../../Models/OrderUpdate";

interface OrderFormProps {
  onClose: () => void;
  order: Order;
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

const OrderForm = ({ order, onClose }: OrderFormProps): JSX.Element => {
  const [editOrder, setEditOrder] = useState<Order>(order);
  const [msg, setMsg] = useState("");
  const [currentCustomerAddresses, setCurrentCustomerAddresses] = useState<
    CustomerAddress[]
  >([defaultCustomerAddress]);

  const [currentCustomerAddress, setCurrentCustomerAddress] = useState<
    CustomerAddress | undefined
  >();

  useEffect(() => {
    if (editOrder.customerId) {
      getCustomerAddresses({ customerId: editOrder.customerId }).then(
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
  }, [editOrder.customerId]);

  useEffect(() => {
    if (editOrder.customerAddressId && currentCustomerAddresses.length > 0) {
      const currentAddress = currentCustomerAddresses.find(
        (x) => x.id === editOrder.customerAddressId
      );
      setCurrentCustomerAddress(currentAddress);
    } else {
      setCurrentCustomerAddress(defaultCustomerAddress);
    }
  }, [currentCustomerAddresses, editOrder.customerAddressId]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let result: AxiosResponse<Order> | undefined = undefined;
    if (editOrder) {
      if (editOrder.id === 0) {
        // Create.
        result = await addOrder(editOrder);
      } else {
        // Change.
        const orderUpdate: OrderUpdate = editOrder;
        result = await updateOrder(orderUpdate);
      }

      if (result.status === 200) {
        setMsg("The operation is success.");
        if (editOrder.id > 0) {
          onClose();
        } else {
          setEditOrder(result.data);
        }
      } else {
        setMsg("The operation isn´t success, try again.");
      }
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    if (editOrder) {
      setEditOrder({
        ...editOrder,
        [e.target.name]: e.target.value,
      });
    }
  };

  const [orderLines, setEditOrderLines] = useState<OrderLine[]>([]);

  const refreshOrderLines = () => {
    const orderLineQuery: OrderLineQuery = {
      orderId: editOrder.id,
    };
    getOrderLines(orderLineQuery).then((result) => {
      if (result.status === 200) {
        setEditOrderLines(result.data);
      }
    });

    getOrder(editOrder.id).then((result) => {
      if (result.status === 200) {
        const freshOrder = result.data;
        if (freshOrder) {
          setEditOrder({
            ...editOrder,
            total: freshOrder.total,
            totalTaxes: freshOrder.totalTaxes,
            totalWithoutTaxes: freshOrder.totalWithoutTaxes,
          });
        }
      }
    });
  };

  useEffect(() => {
    refreshOrderLines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editOrder.id]);

  const onCloseOrderLineDialog = () => {
    refreshOrderLines();
  };

  const handleSearchCustomer = () => {
    setOpenCustomerSearchForm(true);
  };

  const [openCustomerSearchForm, setOpenCustomerSearchForm] = useState(false);
  const handleCloseCustomerSearchForm = (customer?: Customer) => {
    setOpenCustomerSearchForm(false);
    if (customer) {
      editOrder.customerId = customer.id;
      editOrder.customerName = customer.firstName + " " + customer.lastName;
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
              value={editOrder?.customerName}
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
                  setEditOrder({
                    ...editOrder,
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
              value={dateToAnsiDate(editOrder?.date)}
              onChange={(e) => {
                if (e) {
                  setEditOrder({
                    ...editOrder,
                    date: e.target.value
                      ? new Date(e.target.value)
                      : new Date(),
                  });
                }
              }}
              placeholder="Write the date of order"
            />
            <TextField
              className="formField"
              label="OrderNumber"
              focused
              name="orderNumber"
              value={editOrder?.orderNumber}
              onChange={(e) => {
                setEditOrder({
                  ...editOrder,
                  orderNumber: e.target.value,
                });
              }}
              placeholder="Write the orderNumber of order"
              inputProps={{ maxLength: 10, type: "string" }}
            />
            <TextField
              className="formField"
              label="Remarks"
              focused
              type="remarks"
              name="remarks"
              value={editOrder?.remarks}
              onChange={(e) => handleChange(e)}
              placeholder="Write the remarks of order"
            />
            <TextField
              className="formField"
              label="TotalWithoutTaxes"
              disabled
              type="number"
              name="totalWithoutTaxes"
              value={editOrder?.totalWithoutTaxes}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value)) {
                  setEditOrder({
                    ...editOrder,
                    totalWithoutTaxes: 0,
                  });
                } else {
                  setEditOrder({
                    ...editOrder,
                    totalWithoutTaxes: parseFloat(e.target.value),
                  });
                }
              }}
              placeholder="Write the totalWithoutTaxes of order"
            />
            <TextField
              className="formField"
              label="Total"
              disabled
              type="number"
              name="total"
              value={editOrder?.total}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value)) {
                  setEditOrder({
                    ...editOrder,
                    total: 0,
                  });
                } else {
                  setEditOrder({
                    ...editOrder,
                    total: parseFloat(e.target.value),
                  });
                }
              }}
              placeholder="Write the total of order"
            />
            <TextField
              className="formField"
              label="TotalTaxes"
              disabled
              type="number"
              name="totalTaxes"
              value={editOrder?.totalTaxes}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value)) {
                  setEditOrder({
                    ...editOrder,
                    totalTaxes: 0,
                  });
                } else {
                  setEditOrder({
                    ...editOrder,
                    totalTaxes: parseFloat(e.target.value),
                  });
                }
              }}
              placeholder="Write the totalTaxes of order"
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

        {/*grid of order lines*/}
        {editOrder && editOrder.id > 0 && (
          <OrderLineSearchView
            orderId={editOrder.id}
            orderLines={orderLines}
            onClose={onCloseOrderLineDialog}
          ></OrderLineSearchView>
        )}

        <CustomerSearchFormDialog
          open={openCustomerSearchForm}
          onClose={handleCloseCustomerSearchForm}
        ></CustomerSearchFormDialog>
      </form>
    </Container>
  );
};

export default OrderForm;
