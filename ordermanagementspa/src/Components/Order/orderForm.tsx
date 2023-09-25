import React, { useEffect, useState } from "react";
import { Order } from "../../Models/Order";
import { AxiosResponse } from "axios";
import { addOrder, updateOrder } from "../Services/orderServices";
import { Box, Button, Container, TextField } from "@mui/material";
import OrderLineSearchView from "../OrderLine/orderLineSearchView";
import { OrderLine } from "../../Models/OrderLine";
import { OrderLineQuery } from "../../Models/OrderLineQuery";
import { getOrderLines } from "../Services/orderLineServices";

interface OrderFormProps {
  onClose: () => void;
  order: Order;
}

const OrderForm = ({ order, onClose }: OrderFormProps): JSX.Element => {
  const [editOrder, setOrder] = useState<Order>(order);
  const [msg, setMsg] = useState("");

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

  return (
    <Container sx={{ width: "100%" }}>
      <form onSubmit={handleSubmit}>
        <div>This is the order Form</div>
        <br />
        <Box sx={{ width: "100%" }}>
          <TextField
            label="CustomerId"
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
            style={{ width: 100 }}
          />
          <br />
          <br />
          <TextField
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
          />
          <br />
          <br />
          <TextField
            label="Date"
            focused
            type="Date"
            name="date"
            value={editOrder?.date}
            onChange={(e) => handleChange(e)}
            placeholder="Write the date of order"
            style={{ width: 200 }}
          />
          <br />
          <br />
          <TextField
            label="OrderNumber"
            focused
            type="number"
            name="orderNumber"
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
            style={{ width: 100 }}
          />
          <br />
          <br />
          <TextField
            label="Remarks"
            focused
            type="remarks"
            name="remarks"
            value={editOrder?.remarks}
            onChange={(e) => handleChange(e)}
            placeholder="Write the remarks of order"
            style={{ width: 500 }}
          />
          <br />
          <br />
          <TextField
            label="TotalWithoutTaxes"
            focused
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
            style={{ width: 200 }}
          />
          <br />
          <br />
          <TextField
            label="Total"
            focused
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
            style={{ width: 100 }}
          />
          <br />
          <br />
          <TextField
            label="TotalTaxes"
            focused
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
            style={{ width: 100 }}
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
          {/*grid of order lines*/}
          {order && (
            <OrderLineSearchView
              orderId={editOrder.id}
              orderLines={orderLines}
              onClose={onCloseOrderLineDialog}
            ></OrderLineSearchView>
          )}
        </Box>
      </form>
    </Container>
  );
};

export default OrderForm;
