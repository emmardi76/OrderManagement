import React, { useEffect, useState } from "react";
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
            name="name"
            value={search?.name ?? ""}
            onChange={(e) => setSearch({ ...search, name: e.target.value })}
            placeholder="Search by product name"
          />
          <TextField
            className="searchField"
            name="description"
            value={search?.description ?? ""}
            onChange={(e) =>
              setSearch({ ...search, description: e.target.value })
            }
            placeholder="Search by product description"
          />
          <TextField
            className="searchField"
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
      <ProductSearchView products={products}></ProductSearchView>
    </Container>
  );
};
