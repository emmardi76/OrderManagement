import React, { useEffect, useState } from "react";
import { OrderQuery } from "../../Models/OrderQuery";
import { useNavigate } from "react-router-dom";
import { Order } from "../../Models/Order";
import { getOrders } from "../Services/orderServices";
import { Button, Container, Icon, TextField } from "@mui/material";
import { ArrowBack, Close, Search } from "@mui/icons-material";
import OrderSearchView from "./orderSearchView";
import { dateToAnsiDate } from "../../Utils/utils";

const OrderSearchForm = (): JSX.Element => {
  const [search, setSearch] = useState<OrderQuery | undefined>();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);

  const handleSearch = async () => {
    const { data: orders } = await getOrders(search);
    setOrders(orders);
  };

  // Initial search.
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <div className="searchFields">
        <div className="searchFieldPanel">
          <TextField
            className="searchField"
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
          />
          <TextField
            className="searchField"
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
          />
          <TextField
            className="searchField"
            name="date"
            type="Date"
            variant="standard"
            margin="dense"
            value={dateToAnsiDate(search?.date)}
            onChange={(e) => {
              if (e) {
                setSearch({
                  ...search,
                  date: e.target.value ? new Date(e.target.value) : new Date(),
                });
              }
            }}
            placeholder="Write the date of order"
            // eslint-disable-next-line react/jsx-no-comment-textnodes
          />
          <TextField
            className="searchField"
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
          />
          <TextField
            className="searchField"
            name="remarks"
            value={search?.remarks ?? ""}
            onChange={(e) => setSearch({ ...search, remarks: e.target.value })}
            placeholder="Search by remarks of order"
          />
          <TextField
            className="searchField"
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
          />
          <TextField
            className="searchField"
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
              navigate({ pathname: "/HomeView " });
            }}
          >
            <Icon color="action">
              <ArrowBack />
            </Icon>
            Back
          </Button>
        </div>
      </div>
      <OrderSearchView orders={orders}></OrderSearchView>
    </Container>
  );
};

export default OrderSearchForm;
