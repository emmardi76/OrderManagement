import { Box, Button, Icon, Stack } from "@mui/material";
import { CustomerAddress } from "../../Models/CustomerAddress";
import { deleteCustomerAddress } from "../Services/customerAddressServices";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CustomerAddressFormDialog from "./customerAddressFormDialog";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";

interface CustomerAddressSearchViewProps {
  customerId: number;
  customerAddresses: CustomerAddress[];
  onClose?: () => void;
}

const CustomerAddressSearchView = ({
  customerId,
  customerAddresses,
  onClose,
}: CustomerAddressSearchViewProps): JSX.Element => {
  const [currentCustomerAddress, setCurrentCustomerAddress] =
    useState<CustomerAddress>();
  const columns: GridColDef<CustomerAddress>[] = [
    {
      field: `id`,
      headerName: `ID`,
      width: 70,
    },
    { field: `customerId`, headerName: `CUSTOMERID`, width: 5 },
    { field: `description`, headerName: `DESCRIPTION`, width: 300 },
    { field: `street`, headerName: `STREET`, width: 500 },
    { field: `streetNumber`, headerName: `STREETNUMBER`, width: 15 },
    { field: `door`, headerName: `DOOR`, width: 10 },
    { field: `zipCode`, headerName: `ZIPCODE`, width: 20 },
    { field: `city`, headerName: `CITY`, width: 300 },
    { field: `country`, headerName: `COUNTRY`, width: 300 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 180,

      renderCell: (params) => {
        const onClickEdit = () => {
          const currentRow = params.row;
          setCurrentCustomerAddress(currentRow);
        };

        const onClickDelete = () => {
          const currentRow = params.row;
          onClose && onClose();
          deleteCustomerAddress(currentRow).then((result) => {
            if (result.status === 200) {
              onClose && onClose();
            } else {
              console.log("result", result);
              alert(result.data);
            }
          });
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

  let defaultCustomerAddress: CustomerAddress = {
    id: 0,
    customerId: customerId, //use the customerId of the father
    description: "",
    street: "",
    streetNumber: "",
    door: "",
    zipCode: "",
    city: "",
    country: "",
  };

  const [openCustomerAddressForm, setOpenCustomerAddressForm] = useState(false);

  useEffect(() => {
    if (currentCustomerAddress) {
      setOpenCustomerAddressForm(true);
    }
  }, [currentCustomerAddress, setOpenCustomerAddressForm]);

  const handleClose = () => {
    setOpenCustomerAddressForm(false);
    setCurrentCustomerAddress(undefined);
    onClose && onClose();
  };

  return (
    <>
      <br></br>
      <h2>Results of the search customer addresses</h2>
      &nbsp;
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setCurrentCustomerAddress(defaultCustomerAddress);
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
          rows={customerAddresses}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        ></DataGrid>
      </Box>
      <CustomerAddressFormDialog
        customerAddress={currentCustomerAddress ?? defaultCustomerAddress}
        open={openCustomerAddressForm}
        onClose={handleClose}
      ></CustomerAddressFormDialog>
    </>
  );
};

export default CustomerAddressSearchView;
