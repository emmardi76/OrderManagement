import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../Models/Customer";
import { CustomerQuery } from "../../Models/CustomerQuery";
import { getCustomers } from "../Services/customerServices";
import { Button, Container, Icon, TextField } from "@mui/material";
import { Close, ArrowBack, Search } from "@mui/icons-material";
import CustomerSearchView from "./customerSearchView";

export interface CustomerSearchFormProps {
  onClose?: (customer?: Customer) => void;
}

const CustomerSearchForm = ({
  onClose,
}: CustomerSearchFormProps): JSX.Element => {
  const [search, setSearch] = useState<CustomerQuery | undefined>();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<Customer[]>([]);

  const handleSearch = async () => {
    const { data: customers } = await getCustomers(search);
    setCustomers(customers);
  };

  // Initial search.
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();
  const onSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <Container>
      <div className="searchFields">
        <div className="searchFieldPanel">
          <TextField
            className="searchField"
            name="firsttName"
            value={search?.firstName ?? ""}
            onChange={(e) =>
              setSearch({ ...search, firstName: e.target.value })
            }
            placeholder="Search by firstname of customer"
          />
          <TextField
            className="searchField"
            name="lastName"
            value={search?.lastName ?? ""}
            onChange={(e) => setSearch({ ...search, lastName: e.target.value })}
            placeholder="Search by lastname of customer"
          />
          <TextField
            className="searchField"
            name="email"
            value={search?.email ?? ""}
            onChange={(e) => setSearch({ ...search, email: e.target.value })}
            placeholder="Search by email of customer"
          />
          <TextField
            className="searchField"
            name="phoneNumber"
            value={search?.phoneNumber ?? ""}
            onChange={(e) =>
              setSearch({ ...search, phoneNumber: e.target.value })
            }
            placeholder="Search by phoneNumber of customer"
          />
        </div>
        <div className="searchButtonsPanel">
          <Button
            className="searchButton"
            variant="contained"
            onClick={() => {
              handleSearch();
            }}
          >
            <Icon color="action">
              <Search />
            </Icon>
            Search
          </Button>
          <Button
            className="searchButton"
            variant="contained"
            onClick={() => setSearch({})}
            style={{ cursor: "pointer" }}
          >
            <Icon color="action">
              <Close />
            </Icon>
            Clean
          </Button>
          <Button
            className="searchButton"
            variant="contained"
            onClick={() => {
              if (onClose) {
                onClose(selectedCustomer);
              } else {
                navigate({ pathname: "/HomeView " });
              }
            }}
          >
            <Icon color="action">
              <ArrowBack />
            </Icon>
            Back
          </Button>
        </div>
      </div>
      <CustomerSearchView
        customers={customers}
        onSelect={onSelectCustomer}
        handleSearch={handleSearch}
      ></CustomerSearchView>
    </Container>
  );
};

export default CustomerSearchForm;
