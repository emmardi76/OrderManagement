import React, { useState } from "react";
import { CustomerAddress } from "../../Models/CustomerAddress";
import { AxiosResponse } from "axios";
import {
  addCustomerAddress,
  updateCustomerAddress,
} from "../Services/customerAddressServices";
import { Button, Container, TextField } from "@mui/material";

interface CustomerAddressFormProps {
  onClose: () => void;
  customerAddress: CustomerAddress;
}

const CustomerAddressForm = ({
  customerAddress,
  onClose,
}: CustomerAddressFormProps): JSX.Element => {
  const [editCustomerAddress, setCustomerAddress] =
    useState<CustomerAddress>(customerAddress);
  const [msg, setMsg] = useState("");

  const onSave = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let result: AxiosResponse<CustomerAddress> | undefined = undefined;
    if (editCustomerAddress) {
      if (editCustomerAddress.id === 0) {
        // Create.
        result = await addCustomerAddress(editCustomerAddress);
      } else {
        // Change.
        result = await updateCustomerAddress(editCustomerAddress);
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
    if (editCustomerAddress) {
      setCustomerAddress({
        ...editCustomerAddress,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <Container>
      <form>
        <div>This is the customerAddress Form</div>
        <br />
        <TextField
          label="Description"
          focused
          type="description"
          name="description"
          value={editCustomerAddress?.description}
          onChange={(e: { target: { name: string; value: string } }) =>
            handleChange(e)
          }
          placeholder="Write the description of customer address"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <TextField
          label="Street"
          focused
          type="street"
          name="street"
          value={editCustomerAddress?.street}
          onChange={(e) => handleChange(e)}
          placeholder="Write the street of customer Address"
          style={{ width: 500 }}
        />
        <br />
        <br />
        <TextField
          label="StreetNumber"
          focused
          type="streetNumber"
          name="streetNumber"
          value={editCustomerAddress?.streetNumber}
          onChange={(e) => handleChange(e)}
          placeholder="Write the streetNumber of customer Address"
          style={{ width: 15 }}
        />
        <br />
        <br />
        <TextField
          label="Door"
          focused
          type="door"
          name="door"
          value={editCustomerAddress?.door}
          onChange={(e) => handleChange(e)}
          placeholder="Write the door of customer Address"
          style={{ width: 10 }}
        />
        <br />
        <br />
        <TextField
          label="ZipCode"
          focused
          type="zipCode"
          name="zipCode"
          value={editCustomerAddress?.zipCode}
          onChange={(e) => handleChange(e)}
          placeholder="Write the zipCode of customer Address"
          style={{ width: 20 }}
        />
        <br />
        <br />
        <TextField
          label="City"
          focused
          type="city"
          name="city"
          value={editCustomerAddress?.city}
          onChange={(e) => handleChange(e)}
          placeholder="Write the city of customer Address"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <TextField
          label="Country"
          focused
          type="country"
          name="country"
          value={editCustomerAddress?.country}
          onChange={(e) => handleChange(e)}
          placeholder="Write the country of customer Address"
          style={{ width: 300 }}
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
      </form>
    </Container>
  );
};

export default CustomerAddressForm;
