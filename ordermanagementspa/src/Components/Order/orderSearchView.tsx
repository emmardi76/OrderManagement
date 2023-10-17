import { useEffect, useState } from "react";
import { Order } from "../../Models/Order";
import { Box, Button, Icon, Stack } from "@mui/material";
import { deleteOrder } from "../Services/orderServices";
import { Add } from "@mui/icons-material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import OrderFormDialog from "./orderFormDialog";

interface OrderSearchViewProps {
  orders: Order[];
}

let defaultOrder: Order = {
  id: 0,
  customerId: 0,
  customerAddressId: 0,
  date: new Date(),
  orderNumber: 0,
  remarks: "",
  totalWithoutTaxes: 0,
  total: 0,
  totalTaxes: 0,
};

const OrderSearchView = ({ orders }: OrderSearchViewProps): JSX.Element => {
  const [currentOrder, setCurrentOrder] = useState<Order>();
  const columns: GridColDef<Order>[] = [
    {
      field: `id`,
      headerName: `ID`,
      width: 70,
    },
    { field: `customerId`, headerName: `CUSTOMERID`, width: 20 },
    { field: `customerAddressId`, headerName: `CUSTOMERADDRESSID`, width: 20 },
    { field: `date`, headerName: `DATE`, width: 150 },
    { field: `ordernumber`, headerName: `ORDERNUMBER`, width: 20 },
    { field: `remarks`, headerName: `REMARKS`, width: 500 },
    { field: `totalWithoutTaxes`, headerName: `TOTALWITHOUTTAXES`, width: 20 },
    { field: `total`, headerName: `TOTAL`, width: 20 },
    { field: `totaltaxes`, headerName: `TOTALTAXES`, width: 20 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 180,

      renderCell: (params) => {
        const onClickEdit = () => {
          const currentRow = params.row;
          setCurrentOrder(currentRow);
        };

        const onClickDelete = () => {
          const currentRow = params.row;
          return deleteOrder(currentRow.id);
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

  const [openOrderForm, setOpenOrderForm] = useState(false);

  useEffect(() => {
    if (currentOrder) {
      setOpenOrderForm(true);
    }
  }, [currentOrder, setOpenOrderForm]);

  const handleClose = () => {
    setOpenOrderForm(false);
    setCurrentOrder(undefined);
  };

  return (
    <div className="searchView">
      <span className="searchViewTitle">Results of the search</span>
      <Button
        className="searchViewAddButton"
        variant="contained"
        color="primary"
        onClick={() => {
          setCurrentOrder(defaultOrder);
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
        rows={orders}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      ></DataGrid>

      <OrderFormDialog
        order={currentOrder ?? defaultOrder}
        open={openOrderForm}
        onClose={handleClose}
      ></OrderFormDialog>
    </div>
  );
};

export default OrderSearchView;
