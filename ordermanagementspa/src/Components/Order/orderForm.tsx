import React, { useEffect, useState } from "react";
import { Order } from "../../Models/Order";
import { AxiosResponse } from "axios";
import { addOrder, updateOrder } from "../Services/orderServices";
import { Autocomplete, Box, Button, Container, TextField } from "@mui/material";
import OrderLineSearchView from "../OrderLine/orderLineSearchView";
import { OrderLine } from "../../Models/OrderLine";
import { OrderLineQuery } from "../../Models/OrderLineQuery";
import { getOrderLines } from "../Services/orderLineServices";
import { dateToAnsiDate } from "../../Utils/utils";
import { CustomerAddress } from "../../Models/CustomerAddress";
import { getCustomerAddresses } from "../Services/customerAddressServices";
import { Customer } from "../../Models/Customer";
import { getCustomers, searchCustomer } from "../Services/customerServices";

interface OrderFormProps {
  onClose: () => void;
  order: Order;
}

const OrderForm = ({ order, onClose }: OrderFormProps): JSX.Element => {
  const [editOrder, setOrder] = useState<Order>(order);
  const [msg, setMsg] = useState("");
  const [currentCustomerAddresses, setCurrentCustomerAddresses] = useState<
    CustomerAddress[]
  >([]);

  const [currentCustomerAddress, setCurrentCustomerAddress] = useState<
    CustomerAddress | undefined
  >(undefined);

  const [currentCustomers, setCurrentCustomers] = useState<Customer[]>([]);

  const [currentCustomer, setCurrentCustomer] = useState<Customer | undefined>(
    undefined
  );

  useEffect(() => {
    if (editOrder.customerId) {
      getCustomerAddresses({ customerId: editOrder.customerId }).then(
        (result) => {
          if (result.status === 200) {
            const addresses: CustomerAddress[] = result.data;
            setCurrentCustomerAddresses(addresses);
          }
        }
      );
      getCustomers({ id: editOrder.customerId }).then((result) => {
        if (result.status === 200) {
          const customers: Customer[] = result.data;
          setCurrentCustomers(customers);
        }
      });
    } else {
      setCurrentCustomerAddresses([]);
      //setCurrentCustomers([]);
    }
  }, [editOrder.customerId]);

  useEffect(() => {
    if (editOrder.customerAddressId && currentCustomerAddresses.length > 0) {
      const currentAddress = currentCustomerAddresses.find(
        (x) => x.id === editOrder.customerAddressId
      );
      setCurrentCustomerAddress(currentAddress);
    } else {
      setCurrentCustomerAddress(undefined);
    }
  }, [currentCustomerAddresses, editOrder.customerAddressId]);

  useEffect(() => {
    console.log("currentCustomerAddress", currentCustomerAddress);
  }, [currentCustomerAddress]);

  useEffect(() => {
    if (editOrder.customerId && currentCustomers.length > 0) {
      const currentCustomer = currentCustomers.find(
        (c) => c.id === editOrder.customerId
      );
      setCurrentCustomer(currentCustomer);
    } else {
      setCurrentCustomer(undefined);
    }
  }, [currentCustomers, editOrder.customerId]);

  useEffect(() => {
    console.log("currentCustomer", currentCustomer);
  }, [currentCustomer]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let result: AxiosResponse<Order> | undefined = undefined;
    if (editOrder) {
      if (editOrder.id === 0) {
        // Create.
        result = await addOrder(editOrder);
      } else {
        // Change.
        result = await updateOrder(editOrder);
      }

      if (result.status === 200) {
        setMsg("The operation is success.");
        alert(msg);
        onClose();
      } else {
        setMsg("The operation isn´t success, try again.");
        alert(msg);
      }
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    console.log("editOrder", editOrder);
    if (editOrder) {
      setOrder({
        ...editOrder,
        [e.target.name]: e.target.value,
      });
    }
  };

  const [orderLines, setOrderLines] = useState<OrderLine[]>([]);

  const refreshOrderLines = () => {
    const orderLineQuery: OrderLineQuery = {
      orderId: editOrder.id,
    };
    getOrderLines(orderLineQuery).then((result) => {
      if (result.status === 200) {
        setOrderLines(result.data);
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

  const [inputValue, setInputValue] = useState<string>("");

  const getCustomersFromName = (name: string) => {
    searchCustomer(name).then((result) => {
      if (result.status === 200) {
        const customers: Customer[] = result.data;
        setCurrentCustomers(customers);
      }
    });
  };

  return (
    <Container sx={{ width: "100%" }}>
      <form onSubmit={handleSubmit}>
        <div className="formFields">
          <div className="formFieldPanel">
            {/*<TextField
            // label="CustomerId"
              focused
              type="number"
              name="customerId"
              value={editOrder?.customerId}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value)) {
                  setOrder({
                    ...editOrder,
                    customerId: 0,
                  });
                } else {
                  setOrder({
                    ...editOrder,
                    customerId: parseFloat(e.target.value),
                  });
                }
              }}
              placeholder="Write the customerId of order"
              //style={{ width: 100 }}
            /> 
            <br />
            <br />*/}
            <Autocomplete
              options={currentCustomers}
              defaultValue={currentCustomer}
              onInputChange={(e, value) => {
                //console.log("value", value);
                getCustomersFromName(value);
              }}
              onChange={(event: any, newValue: Customer | null) => {
                if (newValue) {
                  setOrder({
                    ...editOrder,
                    customerId: newValue?.id,
                  });
                } else {
                  setCurrentCustomer(undefined);
                }
              }}
              getOptionLabel={(option: Customer) =>
                `${option.id}, ${option.firstName}, ${option.lastName}`
              }
              renderInput={(params) => (
                <TextField
                  className="formField"
                  focused
                  {...params}
                  label="Customer"
                  placeholder={
                    currentCustomer
                      ? `${currentCustomer.id}, ${currentCustomer.firstName}, ${currentCustomer.lastName}`
                      : "Please, select a customer"
                  }
                />
              )}
            />
            {/*<TextField
              label="CustomerAddressId"
              focused
              type="number"
              name="customerAddressId"
              value={editOrder?.customerAddressId}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value)) {
                  setOrder({
                    ...editOrder,
                    customerAddressId: 0,
                  });
                } else {
                  setOrder({
                    ...editOrder,
                    customerAddressId: parseFloat(e.target.value),
                  });
                }
              }}
              placeholder="Write the customerAddressId of order"
              style={{ width: 200 }}
            />*/}
            <Autocomplete
              options={currentCustomerAddresses}
              defaultValue={currentCustomerAddress}
              onChange={(event: any, newValue: CustomerAddress | null) => {
                if (newValue) {
                  setOrder({
                    ...editOrder,
                    customerAddressId: newValue?.id,
                  });
                } else {
                  setCurrentCustomerAddress(undefined);
                }
              }}
              getOptionLabel={(option: CustomerAddress) =>
                `${option.street}, ${option.streetNumber}, ${option.zipCode}`
              }
              renderInput={(params) => (
                <TextField
                  className="formField"
                  focused
                  {...params}
                  label="Customer Address"
                  placeholder={
                    currentCustomerAddress
                      ? `${currentCustomerAddress.street}, ${currentCustomerAddress.streetNumber}, ${currentCustomerAddress.zipCode}`
                      : "Please, select an address"
                  }
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
                  setOrder({
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
              type="number"
              name="orderNumber"
              variant="standard"
              value={editOrder?.orderNumber}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value)) {
                  setOrder({
                    ...editOrder,
                    orderNumber: 0,
                  });
                } else {
                  setOrder({
                    ...editOrder,
                    orderNumber: parseFloat(e.target.value),
                  });
                }
              }}
              placeholder="Write the orderNumber of order"
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
                  setOrder({
                    ...editOrder,
                    totalWithoutTaxes: 0,
                  });
                } else {
                  setOrder({
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
                  setOrder({
                    ...editOrder,
                    total: 0,
                  });
                } else {
                  setOrder({
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
                  setOrder({
                    ...editOrder,
                    totalTaxes: 0,
                  });
                } else {
                  setOrder({
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
        {order && (
          <OrderLineSearchView
            orderId={editOrder.id}
            orderLines={orderLines}
            onClose={onCloseOrderLineDialog}
          ></OrderLineSearchView>
        )}
      </form>
    </Container>
  );
};

export default OrderForm;
