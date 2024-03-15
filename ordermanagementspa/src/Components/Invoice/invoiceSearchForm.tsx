import React, { useEffect, useState } from "react";
import { InvoiceQuery } from "../../Models/InvoiceQuery";
import { useNavigate } from "react-router-dom";
import { InvoiceList } from "../../Models/InvoiceList";
import { getInvoices } from "../Services/invoiceServices";
import { Button, Container, Icon, TextField } from "@mui/material";
import { dateToAnsiDate } from "../../Utils/utils";
import { ArrowBack, Close, Search } from "@mui/icons-material";
import InvoiceSearchView from "./invoiceSearchView";

const InvoiceSearchForm = (): JSX.Element => {
  const [search, setSearch] = useState<InvoiceQuery | undefined>();
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState<InvoiceList[]>([]);

  const handleSearch = async () => {
    const { data: invoices } = await getInvoices(search);
    setInvoices(invoices);
  };

  // Initial search.
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <span className="seachFormTitle">Invoice Search Form</span>
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
            name="invoiceNumber"
            type="text"
            value={search?.invoiceNumber ?? ""}
            onChange={(e) => {
              setSearch({
                ...search,
                invoiceNumber: e.target.value,
              });
            }}
            placeholder="Search by invoice number"
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
            placeholder="Search by total of invoice"
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
      <InvoiceSearchView handleSearch={handleSearch} invoices={invoices} />
    </Container>
  );
};

export default InvoiceSearchForm;
