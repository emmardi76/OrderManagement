import React, { useState } from "react";
import { OrderQuery } from "../../Models/OrderQuery";
import { useNavigate } from "react-router-dom";
import { Order } from "../../Models/Order";
import { getOrders } from "../Services/orderServices";
import { Button, Container, Icon, TextField } from "@mui/material";
import { ArrowBack, Search } from "@mui/icons-material";
import OrderSearchView from "./orderSearchView";

const OrderSearchForm = (): JSX.Element => {
  const [search, setSearch] = useState<OrderQuery | undefined>();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);

  const handleSearch = async () => {
    const { data: orders } = await getOrders(search);
    setOrders(orders);
  };

  return (
    <Container>
      <nav>
        <TextField
          name="customerId"
          type="number"
          value={search?.customerId ?? ""}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (isNaN(value)) {
              setSearch({
                ...search,
                customerId: 0,
              });
            } else {
              setSearch({
                ...search,
                customerId: parseFloat(e.target.value),
              });
            }
          }}
          placeholder="Search by customerId of order"
          style={{ width: 100 }}
        />
        <TextField
          name="customerAddressId"
          type="number"
          value={search?.customerAddressId ?? ""}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (isNaN(value)) {
              setSearch({
                ...search,
                customerAddressId: 0,
              });
            } else {
              setSearch({
                ...search,
                customerAddressId: parseFloat(e.target.value),
              });
            }
          }}
          placeholder="Search by customerAddressId of order"
          style={{ width: 200 }}
        />
        {/*<TextField
          name="date"
          type="Date"
          value={search?.date ?? ""}
          onChange={(e) =>
            setSearch({ ...search, date: new Date(e.target.value) })
          }
          placeholder="Write the date of order"
          style={{ width: 200 }}
        // eslint-disable-next-line react/jsx-no-comment-textnodes
        />*/}
        {/* 
         <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DemoContainer components={["DatePicker"]}>
           <DatePicker
             label="Write the date of order"
             value={search?.date ?? ""}
             onChange={(e) => {
               if (e) {
                 setSearch({ ...search, date: e as Date });
               }
             }}
           />
         </DemoContainer>
       </LocalizationProvider>*/}
        <TextField
          name="date"
          type="Date"
          value={search?.date ?? ""}
          onChange={(e) => {
            if (e) {
              setSearch({ ...search, date: (e as unknown) as Date });
            }
          }}
          placeholder="Write the date of order"
          style={{ width: 200 }}
          // eslint-disable-next-line react/jsx-no-comment-textnodes
        />
        <TextField
          name="orderNumber"
          type="number"
          value={search?.orderNumber ?? ""}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (isNaN(value)) {
              setSearch({
                ...search,
                orderNumber: 0,
              });
            } else {
              setSearch({
                ...search,
                orderNumber: parseFloat(e.target.value),
              });
            }
          }}
          placeholder="Search by customerId of order"
          style={{ width: 100 }}
        />
        <TextField
          name="remarks"
          value={search?.remarks ?? ""}
          onChange={(e) => setSearch({ ...search, remarks: e.target.value })}
          placeholder="Search by remarks of order"
          style={{ width: 500 }}
        />
        <TextField
          name="total"
          type="number"
          value={search?.total}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (isNaN(value)) {
              setSearch({
                ...search,
                total: 0,
              });
            } else {
              setSearch({
                ...search,
                total: parseFloat(e.target.value),
              });
            }
          }}
          placeholder="Search by Total of order"
          style={{ width: 100 }}
        />
        <TextField
          name="totalTaxes"
          value={search?.totalTaxes ?? ""}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (isNaN(value)) {
              setSearch({
                ...search,
                totalTaxes: 0,
              });
            } else {
              setSearch({
                ...search,
                totalTaxes: parseFloat(e.target.value),
              });
            }
          }}
          placeholder="Search by totalTaxes of order"
          style={{ width: 100 }}
        />
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
      <OrderSearchView orders={orders}></OrderSearchView>
    </Container>
  );
};

export default OrderSearchForm;
