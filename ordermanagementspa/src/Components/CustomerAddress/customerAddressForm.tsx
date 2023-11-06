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
        onClose();
      } else {
        setMsg("The operation isn´t success, try again.");
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
        <div className="formFields">
          <div className="formFieldPanel">
            <TextField
              className="formField"
              label="Description"
              focused
              type="text"
              name="description"
              value={editCustomerAddress?.description}
              onChange={(e: { target: { name: string; value: string } }) =>
                handleChange(e)
              }
              placeholder="Write the description of customer address"
            />
            <TextField
              className="formField"
              label="Street"
              focused
              type="text"
              name="street"
              value={editCustomerAddress?.street}
              onChange={(e) => handleChange(e)}
              placeholder="Write the street of customer Address"
            />
            <TextField
              className="formField"
              label="StreetNumber"
              focused
              name="streetNumber"
              value={editCustomerAddress?.streetNumber}
              onChange={(e) => handleChange(e)}
              placeholder="Write the streetNumber of customer Address"
            />
            <TextField
              className="formField"
              label="Door"
              focused
              name="door"
              value={editCustomerAddress?.door}
              onChange={(e) => handleChange(e)}
              placeholder="Write the door of customer Address"
            />
            <TextField
              className="formField"
              label="ZipCode"
              focused
              name="zipCode"
              value={editCustomerAddress?.zipCode}
              onChange={(e) => handleChange(e)}
              placeholder="Write the zipCode of customer Address"
            />
            <TextField
              className="formField"
              label="City"
              focused
              name="city"
              value={editCustomerAddress?.city}
              onChange={(e) => handleChange(e)}
              placeholder="Write the city of customer Address"
            />
            <TextField
              className="formField"
              label="Country"
              focused
              name="country"
              value={editCustomerAddress?.country}
              onChange={(e) => handleChange(e)}
              placeholder="Write the country of customer Address"
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
      </form>
    </Container>
  );
};

export default CustomerAddressForm;
