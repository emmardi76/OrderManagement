import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../Models/Customer";
import { CustomerQuery } from "../../Models/CustomerQuery";
import { getCustomers } from "../Services/customerServices";
import { Button, Container, Icon, TextField } from "@mui/material";
import { Close, ArrowBack, Search } from "@mui/icons-material";
import CustomerSearchView from "./customerSearchView";

const CustomerSearchForm = (): JSX.Element => {
  const [search, setSearch] = useState<CustomerQuery | undefined>();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<Customer[]>([]);

  const handleSearch = async () => {
    const { data: customers } = await getCustomers(search);
    setCustomers(customers);
  };

  return (
    <Container>
      <nav>
        <TextField
          name="firsttName"
          value={search?.firstName ?? ""}
          onChange={(e) => setSearch({ ...search, firstName: e.target.value })}
          placeholder="Search by firstname of customer"
          style={{ width: 300 }}
        />
        <TextField
          name="lastName"
          value={search?.lastName ?? ""}
          onChange={(e) => setSearch({ ...search, lastName: e.target.value })}
          placeholder="Search by lastname of customer"
          style={{ width: 300 }}
        />
        <TextField
          name="email"
          value={search?.email ?? ""}
          onChange={(e) => setSearch({ ...search, email: e.target.value })}
          placeholder="Search by email of customer"
          style={{ width: 300 }}
        />
        <TextField
          name="phoneNumber"
          value={search?.phoneNumber ?? ""}
          onChange={(e) =>
            setSearch({ ...search, phoneNumber: e.target.value })
          }
          placeholder="Search by phoneNumber of customer"
          style={{ width: 300 }}
        />
        <Icon
          color="action"
          onClick={() => setSearch({})}
          style={{ cursor: "pointer" }}
        >
          <Close />
        </Icon>
        <Button
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
        &nbsp;
        <Button
          variant="contained"
          onClick={() => {
            navigate({ pathname: "/HomeView " });
          }}
        >
          <Icon color="action">
            <ArrowBack />
          </Icon>
          Back
        </Button>
        &nbsp;
      </nav>
      <br></br>
      <CustomerSearchView customers={customers}></CustomerSearchView>
    </Container>
  );
};

export default CustomerSearchForm;
