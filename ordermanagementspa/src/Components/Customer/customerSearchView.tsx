import React, { useEffect, useState } from "react";
import { Customer } from "../../Models/Customer";
import { deleteCustomer } from "../Services/customerServices";
import { Stack, Button, Icon, Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CustomerFormDialog from "./customerFormDialog";

interface CustomerSearchViewProps {
  customers: Customer[];
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
}: CustomerSearchViewProps): JSX.Element => {
  const [currentCustomer, setCurrentCustomer] = useState<Customer>();
  const columns: GridColDef<Customer>[] = [
    {
      field: `id`,
      headerName: `ID`,
      width: 70,
    },
    { field: `firstName`, headerName: `FIRSTNAME`, width: 200 },
    { field: `lastName`, headerName: `LASTNAME`, width: 200 },
    { field: `email`, headerName: `EMAIL`, width: 200 },
    { field: `phoneNumber`, headerName: `PHONENUMBER`, width: 200 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 180,

      renderCell: (params) => {
        const onClickEdit = () => {
          const currentRow = params.row;
          setCurrentCustomer(currentRow);
        };

        const onClickDelete = () => {
          const currentRow = params.row;
          return deleteCustomer(currentRow.id);
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
          setCurrentCustomer(defaultCustomer);
        }}
      >
        <Icon color="action">
          <Add />
        </Icon>
        Add
      </Button>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          autoHeight
          rows={customers}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        ></DataGrid>
      </Box>
      <CustomerFormDialog
        customer={currentCustomer ?? defaultCustomer}
        open={openCustomerForm}
        onClose={handleClose}
      ></CustomerFormDialog>
    </>
  );
};

export default CustomerSearchView;
