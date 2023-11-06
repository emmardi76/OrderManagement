import React, { useEffect, useState } from "react";
import { Customer } from "../../Models/Customer";
import { Button, Container, TextField } from "@mui/material";
import { AxiosResponse } from "axios";
import { addCustomer, updateCustomer } from "../Services/customerServices";
import { CustomerAddress } from "../../Models/CustomerAddress";
import CustomerAddressSearchView from "../CustomerAddress/customerAddressSearchView";
import { getCustomerAddresses } from "../Services/customerAddressServices";
import { CustomerAddressQuery } from "../../Models/CustomerAddressQuery";

interface CustomerFormProps {
  onClose: () => void;
  customer: Customer;
}

const CustomerForm = ({
  customer,
  onClose,
}: CustomerFormProps): JSX.Element => {
  const [editCustomer, setCustomer] = useState<Customer>(customer);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let result: AxiosResponse<Customer> | undefined = undefined;
    if (editCustomer) {
      if (editCustomer.id === 0) {
        // Create.
        result = await addCustomer(editCustomer);
      } else {
        // Change.
        result = await updateCustomer(editCustomer);
      }

      if (result.status === 200) {
        setMsg("The operation is success.");
        if (editCustomer.id > 0) {
          onClose();
        } else {
          setCustomer(result.data);
        }
      } else {
        setMsg("The operation isn´t success, try again.");
      }
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    if (editCustomer) {
      setCustomer({
        ...editCustomer,
        [e.target.name]: e.target.value,
      });
    }
  };

  const [customerAddresses, setCustomerAddresses] = useState<CustomerAddress[]>(
    []
  );

  const refreshCustomerAddresses = () => {
    const customerAddressQuery: CustomerAddressQuery = {
      customerId: editCustomer.id,
    };
    getCustomerAddresses(customerAddressQuery).then((result) => {
      if (result.status === 200) {
        setCustomerAddresses(result.data);
      }
    });
  };

  useEffect(() => {
    refreshCustomerAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editCustomer.id]);

  const onCloseCustomerAddressDialog = () => {
    refreshCustomerAddresses();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="formFields">
          <div className="formFieldPanel">
            <TextField
              className="formField"
              label="FirstName"
              focused
              type="text"
              name="firstName"
              value={editCustomer?.firstName}
              onChange={(e) => handleChange(e)}
              placeholder="Write the firstname of customer"
            />
            <TextField
              className="formField"
              label="LastName"
              focused
              type="text"
              name="lastName"
              value={editCustomer?.lastName}
              onChange={(e) => handleChange(e)}
              placeholder="Write the lastname of customer"
            />
            <TextField
              className="formField"
              label="Email"
              focused
              type="email"
              name="email"
              value={editCustomer?.email}
              onChange={(e) => handleChange(e)}
              placeholder="Write the email of customer"
            />
            <TextField
              className="formField"
              label="PhoneNumber"
              focused
              type="tel"
              name="phoneNumber"
              value={editCustomer?.phoneNumber}
              onChange={(e) => handleChange(e)}
              placeholder="Write the phonenumber of customer"
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

        {/*grid de customer addrees*/}
        {editCustomer && editCustomer.id > 0 && (
          <CustomerAddressSearchView
            customerId={editCustomer.id}
            customerAddresses={customerAddresses}
            onClose={onCloseCustomerAddressDialog}
          ></CustomerAddressSearchView>
        )}
      </form>
    </Container>
  );
};

export default CustomerForm;
