import { Close, Search, ArrowBack } from "@mui/icons-material";
import { Button, Container, Icon, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTaxes } from "../Services/taxTypeServices";
import { TaxType } from "../../Models/TaxType";
import SearchTaxTypeView from "./searchTaxTypeView";
import { TaxTypeQuery } from "../../Models/TaxTypeQuery";

export const TaxTypeSearchForm = (): JSX.Element => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [search, setSearch] = useState<TaxTypeQuery | undefined>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const [taxTypes, setTaxTypes] = useState<TaxType[]>([]);

  const handleSearch = async () => {
    const { data: taxtypes } = await getTaxes(search);
    setTaxTypes(taxtypes);
  };

  return (
    <Container>
      <nav>
        <TextField
          name="name"
          value={search?.name ?? ""}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
          placeholder="Search by taxType name"
          style={{ width: 300 }}
        />
        <TextField
          name="taxPercentage"
          type="number"
          value={search?.taxPercentage ?? ""}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (isNaN(value)) {
              setSearch({
                ...search,
                taxPercentage: undefined,
              });
            } else {
              setSearch({
                ...search,
                taxPercentage: parseFloat(e.target.value),
              });
            }
          }}
          placeholder="Search by tax percentage"
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
            // navigate({ pathname: `/taxType/searchTaxTypeView/${search}` });
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
      <SearchTaxTypeView taxTypes={taxTypes}></SearchTaxTypeView>
    </Container>
  );
};
