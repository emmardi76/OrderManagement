import React, { useEffect, useState } from "react";
import { Customer } from "../../Models/Customer";
import { deleteCustomer } from "../Services/customerServices";
import { Stack, Button, Icon } from "@mui/material";
import { Add } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CustomerFormDialog from "./customerFormDialog";

interface CustomerSearchViewProps {
  customers: Customer[];
  onSelect?: (customer: Customer) => void;
  handleSearch: () => Promise<void>;
}

let defaultCustomer: Customer = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const CustomerSearchView = ({
  customers,
  onSelect,
  handleSearch,
}: CustomerSearchViewProps): JSX.Element => {
  const [currentCustomer, setCurrentCustomer] = useState<Customer>();
  const columns: GridColDef<Customer>[] = [
    { field: `firstName`, headerName: `First Name`, width: 200 },
    { field: `lastName`, headerName: `Last Name`, width: 200 },
    { field: `email`, headerName: `Email`, width: 200 },
    { field: `phoneNumber`, headerName: `Phone Number`, width: 200 },
    {
      field: "action",
      headerName: "",
      sortable: false,
      width: 180,

      renderCell: (params) => {
        const onClickEdit = () => {
          const currentRow = params.row;
          setCurrentCustomer(currentRow);
        };

        const onClickDelete = async () => {
          const currentRow = params.row;
          await deleteCustomer(currentRow.id);
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

  const [openCustomerForm, setOpenCustomerForm] = useState(false);

  useEffect(() => {
    if (currentCustomer) {
      setOpenCustomerForm(true);
    }
  }, [currentCustomer, setOpenCustomerForm]);

  const handleClose = () => {
    setOpenCustomerForm(false);
    setCurrentCustomer(undefined);
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
          setCurrentCustomer(defaultCustomer);
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
        rows={customers}
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
            const selectedRowData = customers.filter(
              (customer) => customer.id.toString() === id.toString()
            );
            onSelect && onSelect(selectedRowData[0]);
          }
        }}
      ></DataGrid>

      <CustomerFormDialog
        customer={currentCustomer ?? defaultCustomer}
        open={openCustomerForm}
        onClose={handleClose}
      ></CustomerFormDialog>
    </div>
  );
};

export default CustomerSearchView;
