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
    { field: `description`, headerName: `Description`, width: 125 },
    { field: `street`, headerName: `Street`, width: 200 },
    { field: `streetNumber`, headerName: `Number`, width: 84 },
    { field: `door`, headerName: `Door`, width: 64 },
    { field: `zipCode`, headerName: `Zip`, width: 64 },
    { field: `city`, headerName: `City`, width: 100 },
    { field: `country`, headerName: `Country`, width: 100 },
    {
      field: "action",
      headerName: "",
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
    <div className="searchView">
      <span className="searchViewTitle">
        Results of the search customer addresses
      </span>
      <Button
        className="searchViewAddButton"
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
      <div className="cleanFix"></div>

      <DataGrid
        className="searchViewDataGrid"
        rows={customerAddresses}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      ></DataGrid>

      <CustomerAddressFormDialog
        customerAddress={currentCustomerAddress ?? defaultCustomerAddress}
        open={openCustomerAddressForm}
        onClose={handleClose}
      ></CustomerAddressFormDialog>
    </div>
  );
};

export default CustomerAddressSearchView;
