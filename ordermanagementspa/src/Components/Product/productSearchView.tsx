import React, { useEffect, useState } from "react";
import { Product } from "../../Models/Product";
import { deleteProduct } from "../Services/productServices";
import { Stack, Button, Icon } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Add } from "@mui/icons-material";
import ProductFormDialog from "./productFormDialog";

interface ProductSearchViewProps {
  products: Product[];
}

let defaultProduct: Product = {
  id: 0,
  name: "",
  description: "",
  taxTypeId: 0,
  unitPrice: 0,
};

const ProductSearchView = ({
  products,
}: ProductSearchViewProps): JSX.Element => {
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const columns: GridColDef<Product>[] = [
    {
      field: `id`,
      headerName: `ID`,
      width: 70,
    },
    { field: `name`, headerName: `NAME`, width: 200 },
    { field: `description`, headerName: `DESCRIPTION`, width: 200 },
    { field: `taxTypeId`, headerName: `TAXTYPEID`, width: 160 },
    { field: `unitPrice`, headerName: `UNITPRICE`, width: 160 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 180,

      renderCell: (params) => {
        const onClickEdit = () => {
          const currentRow = params.row;
          setCurrentProduct(currentRow);
        };

        const onClickDelete = () => {
          const currentRow = params.row;
          return deleteProduct(currentRow.id);
        };

        return (
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="success"
              size="small"
              onClick={onClickEdit}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={onClickDelete}
            >
              Delete
            </Button>
          </Stack>
        );
      },
    },
  ];

  const [openProductForm, setOpenProductForm] = useState(false);

  useEffect(() => {
    if (currentProduct) {
      setOpenProductForm(true);
    }
  }, [currentProduct, setOpenProductForm]);

  const handleClose = () => {
    setOpenProductForm(false);
    setCurrentProduct(undefined);
  };

  return (
    <>
      <br></br>
      <h2>Results of the search</h2>
      &nbsp;
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setCurrentProduct(defaultProduct);
        }}
      >
        <Icon color="action">
          <Add />
        </Icon>
        Add
      </Button>
      <DataGrid
        rows={products}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      ></DataGrid>
      <ProductFormDialog
        product={currentProduct ?? defaultProduct}
        open={openProductForm}
        onClose={handleClose}
      ></ProductFormDialog>
    </>
  );
};

export default ProductSearchView;
