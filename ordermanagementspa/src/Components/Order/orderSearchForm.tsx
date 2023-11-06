import React, { useEffect, useState } from "react";
import { OrderQuery } from "../../Models/OrderQuery";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../Services/orderServices";
import { Button, Container, Icon, TextField } from "@mui/material";
import { ArrowBack, Close, Search } from "@mui/icons-material";
import OrderSearchView from "./orderSearchView";
import { dateToAnsiDate } from "../../Utils/utils";
import { OrderList } from "../../Models/OrderList";

const OrderSearchForm = (): JSX.Element => {
  const [search, setSearch] = useState<OrderQuery | undefined>();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<OrderList[]>([]);

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
      <span className="searchFormTitle">Order</span>
      <div className="searchFields">
        <div className="searchFieldPanel">
          <TextField
            className="searchField"
            type="text"
            name="customerName"
            value={search?.customerName ?? ""}
            onChange={(e) => {
              setSearch({
                ...search,
                customerName: e.target.value,
              });
            }}
            placeholder="Search by customer name of order"
          />
          <TextField
            className="searchField"
            name="date"
            type="Date"
            value={dateToAnsiDate(search?.date)}
            onChange={(e) => {
              if (e) {
                setSearch({
                  ...search,
                  date: e.target.value
                    ? new Date(e.target.value).toDateString()
                    : new Date().toDateString(),
                });
              }
            }}
            placeholder="search by date of order"
            // eslint-disable-next-line react/jsx-no-comment-textnodes
          />
          <TextField
            className="searchField"
            name="orderNumber"
            type="text"
            value={search?.orderNumber ?? ""}
            onChange={(e) => {
              setSearch({
                ...search,
                orderNumber: e.target.value,
              });
            }}
            placeholder="Search by order number"
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
                  total: undefined,
                });
              } else {
                setSearch({
                  ...search,
                  total: parseFloat(e.target.value),
                });
              }
            }}
            placeholder="Search by total of order"
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
      <OrderSearchView
        handleSearch={handleSearch}
        orders={orders}
      ></OrderSearchView>
    </Container>
  );
};

export default OrderSearchForm;
