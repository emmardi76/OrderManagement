import React, { useState } from "react";
import { Close, Search, ArrowBack } from "@mui/icons-material";
import { Button, Container, Icon, TextField } from "@mui/material";
import { ProductQuery } from "../../Models/ProductQuery";
import { getProducts } from "../Services/productServices";
import { Product } from "../../Models/Product";
import { useNavigate } from "react-router-dom";
import ProductSearchView from "./productSearchView";

export const ProductSearchForm = (): JSX.Element => {
  const [search, setSearch] = useState<ProductQuery | undefined>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);

  const handleSearch = async () => {
    const { data: products } = await getProducts(search);
    setProducts(products);
  };

  return (
    <Container>
      <nav>
        <TextField
          name="name"
          value={search?.name ?? ""}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
          placeholder="Search by product name"
          style={{ width: 300 }}
        />
        <TextField
          name="description"
          value={search?.description ?? ""}
          onChange={(e) =>
            setSearch({ ...search, description: e.target.value })
          }
          placeholder="Search by product description"
          style={{ width: 300 }}
        />
        <TextField
          name="unitPrice"
          type="number"
          value={search?.unitPrice ?? ""}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (isNaN(value)) {
              setSearch({
                ...search,
                unitPrice: undefined,
              });
            } else {
              setSearch({
                ...search,
                unitPrice: parseFloat(e.target.value),
              });
            }
          }}
          placeholder="Search by product unitPrice"
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
      <ProductSearchView products={products}></ProductSearchView>
    </Container>
  );
};
