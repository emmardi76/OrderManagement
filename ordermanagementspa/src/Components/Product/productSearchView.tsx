import React, { useEffect, useState } from "react";
import { Product } from "../../Models/Product";
import { deleteProduct } from "../Services/productServices";
import { Stack, Button, Icon } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Add } from "@mui/icons-material";
import ProductFormDialog from "./productFormDialog";

interface ProductSearchViewProps {
  products: Product[];
  onSelect?: (product: Product) => void;
  handleSearch: () => Promise<void>;
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
  onSelect,
  handleSearch,
}: ProductSearchViewProps): JSX.Element => {
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const columns: GridColDef<Product>[] = [
    { field: `name`, headerName: `Name`, width: 200 },
    { field: `description`, headerName: `Description`, width: 200 },
    { field: `taxPercentage`, headerName: `TaxPercentage`, width: 160 },
    { field: `unitPrice`, headerName: `UnitPrice`, width: 160 },
    {
      field: "action",
      headerName: "",
      sortable: false,
      width: 180,

      renderCell: (params) => {
        const onClickEdit = () => {
          const currentRow = params.row;
          setCurrentProduct(currentRow);
        };

        const onClickDelete = async () => {
          const currentRow = params.row;
          await deleteProduct(currentRow.id);
          handleSearch();
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
    handleSearch();
  };

  return (
    <div className="searchView">
      <span className="searchViewTitle">Results of the search</span>
      <Button
        className="searchViewAddButton"
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
      <div className="cleanFix"></div>

      <DataGrid
        className="searchViewDataGrid"
        rows={products}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          if (newRowSelectionModel.length > 0) {
            const id = newRowSelectionModel[0];
            const selectedRowData = products.filter(
              (product) => product.id.toString() === id.toString()
            );
            onSelect && onSelect(selectedRowData[0]);
          }
        }}
      ></DataGrid>

      <ProductFormDialog
        product={currentProduct ?? defaultProduct}
        open={openProductForm}
        onClose={handleClose}
      ></ProductFormDialog>
    </div>
  );
};

export default ProductSearchView;
