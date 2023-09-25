import React, { useState } from "react";
import { OrderLine } from "../../Models/OrderLine";
import { Box, Button, Container, TextField } from "@mui/material";
import { addOrderLine, updateOrderLine } from "../Services/orderLineServices";
import { AxiosResponse } from "axios";

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

  const handleChange = (e: { target: { name: string; value: string } }) => {
    if (editOrderLine) {
      setOrderLine({
        ...editOrderLine,
        [e.target.name]: e.target.value,
      });
    }
  };
  return (
    <Container sx={{ width: "100%" }}>
      <form>
        <div>This is the orderLine Form</div>
        <Box sx={{ width: "100%" }}>
          <TextField
            label="OrderId"
            focused
            type="number"
            name="orderId"
            value={editOrderLine?.orderId}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (isNaN(value)) {
                setOrderLine({
                  ...editOrderLine,
                  orderId: 0,
                });
              } else {
                setOrderLine({
                  ...editOrderLine,
                  orderId: parseFloat(e.target.value),
                });
              }
            }}
            placeholder="Write the OrderId of orderLine"
            style={{ width: 20 }}
          />
          <br />
          <br />
          <TextField
            label="ProductId"
            focused
            type="number"
            name="productId"
            value={editOrderLine?.productId}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (isNaN(value)) {
                setOrderLine({
                  ...editOrderLine,
                  productId: 0,
                });
              } else {
                setOrderLine({
                  ...editOrderLine,
                  productId: parseFloat(e.target.value),
                });
              }
            }}
            placeholder="Write the OrderId of orderLine"
            style={{ width: 20 }}
          />
          <br />
          <br />
          <TextField
            label="Name"
            focused
            type="name"
            name="name"
            value={editOrderLine?.name}
            onChange={(e) => handleChange(e)}
            placeholder="Write the name of orderLine"
            style={{ width: 500 }}
          />
          <br />
          <br />
          <TextField
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
            style={{ width: 20 }}
          />
          <br />
          <br />
          <TextField
            label="TaxTypeId"
            focused
            type="number"
            name="taxTypeId"
            value={editOrderLine?.taxTypeId}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (isNaN(value)) {
                setOrderLine({
                  ...editOrderLine,
                  taxTypeId: 0,
                });
              } else {
                setOrderLine({
                  ...editOrderLine,
                  taxTypeId: parseFloat(e.target.value),
                });
              }
            }}
            placeholder="Write the taxTypeId of orderLine"
            style={{ width: 20 }}
          />
          <br />
          <br />
          <TextField
            label="TaxPercentage"
            focused
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
            style={{ width: 20 }}
          />
          <br />
          <br />
          <TextField
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
            style={{ width: 20 }}
          />
          <br />
          <br />
          <TextField
            label="TotalWithoutTaxes"
            focused
            type="number"
            name="totalWithoutTaxes"
            value={editOrderLine?.totalWithoutTaxes}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (isNaN(value)) {
                setOrderLine({
                  ...editOrderLine,
                  totalWithoutTaxes: 0,
                });
              } else {
                setOrderLine({
                  ...editOrderLine,
                  totalWithoutTaxes: parseFloat(e.target.value),
                });
              }
            }}
            placeholder="Write the TotalWithoutTaxes of orderLine"
            style={{ width: 20 }}
          />
          <br />
          <br />
          <TextField
            label="Total"
            focused
            type="number"
            name="total"
            value={editOrderLine?.total}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (isNaN(value)) {
                setOrderLine({
                  ...editOrderLine,
                  total: 0,
                });
              } else {
                setOrderLine({
                  ...editOrderLine,
                  total: parseFloat(e.target.value),
                });
              }
            }}
            placeholder="Write the total of orderLine"
            style={{ width: 20 }}
          />
          <br />
          <br />
          <TextField
            label="TotalTaxes"
            focused
            type="number"
            name="totalTaxes"
            value={editOrderLine?.totalTaxes}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (isNaN(value)) {
                setOrderLine({
                  ...editOrderLine,
                  totalTaxes: 0,
                });
              } else {
                setOrderLine({
                  ...editOrderLine,
                  totalTaxes: parseFloat(e.target.value),
                });
              }
            }}
            placeholder="Write the totalTaxes of orderLine"
            style={{ width: 20 }}
          />
          <br />
          <br />
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={onSave}
          >
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
        </Box>
        <br />
      </form>
    </Container>
  );
};

export default OrderLineForm;
