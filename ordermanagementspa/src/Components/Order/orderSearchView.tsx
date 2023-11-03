import { useEffect, useState } from "react";
import { Order } from "../../Models/Order";
import { Button, Icon, Stack } from "@mui/material";
import { deleteOrder, getOrder } from "../Services/orderServices";
import { Add } from "@mui/icons-material";
import {
  GridColDef,
  DataGrid,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import OrderFormDialog from "./orderFormDialog";
import { OrderList } from "../../Models/OrderList";

interface OrderSearchViewProps {
  orders: OrderList[];
  handleSearch: () => Promise<void>;
}

const defaultOrder: Order = {
  id: 0,
  customerId: 0,
  customerAddressId: 0,
  date: new Date(),
  orderNumber: "",
  remarks: "",
  totalWithoutTaxes: 0,
  total: 0,
  totalTaxes: 0,
};

const currencyFormatter = (params: GridValueFormatterParams<number>) => {
  if (params.value == null) {
    return "";
  } else {
    return params.value.toLocaleString() + " €";
  }
};

const dateFormatter = (params: GridValueFormatterParams<Date>) => {
  if (params.value == null) {
    return "";
  } else {
    const date: Date = new Date(params.value);
    const formattedValue = date.toLocaleDateString();
    return formattedValue;
  }
};

const OrderSearchView = ({
  orders,
  handleSearch,
}: OrderSearchViewProps): JSX.Element => {
  const [currentOrder, setCurrentOrder] = useState<OrderList>();
  const [editOrder, setEditOrder] = useState<Order>();

  const columns: GridColDef<OrderList>[] = [
    { field: `orderNumber`, headerName: `Order`, width: 100 },
    { field: `customerName`, headerName: `Customer`, width: 400 },
    {
      field: `date`,
      headerName: `Date`,
      width: 150,
      valueFormatter: dateFormatter,
    },
    {
      field: `totalWithoutTaxes`,
      headerName: `Tax Base`,
      width: 100,
      valueFormatter: currencyFormatter,
    },
    {
      field: `totalTaxes`,
      headerName: `Taxes`,
      width: 100,
      valueFormatter: currencyFormatter,
    },
    {
      field: `total`,
      headerName: `Total`,
      width: 100,
      valueFormatter: currencyFormatter,
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      width: 180,

      renderCell: (params) => {
        const onClickEdit = () => {
          const currentRow = params.row;
          setCurrentOrder(currentRow);
        };

        const onClickDelete = async () => {
          const currentRow = params.row;
          await deleteOrder(currentRow.id);
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

  const [openOrderForm, setOpenOrderForm] = useState(false);

  useEffect(() => {
    if (currentOrder) {
      getOrder(currentOrder.id).then((result) => {
        setEditOrder(result.data);
      });
    }
  }, [currentOrder, setOpenOrderForm]);

  useEffect(() => {
    if (editOrder) {
      setOpenOrderForm(true);
    }
  }, [editOrder]);

  const handleClose = () => {
    setOpenOrderForm(false);
    setCurrentOrder(undefined);
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
          setEditOrder({ ...defaultOrder });
          setOpenOrderForm(true);
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
        order={editOrder ?? defaultOrder}
        open={openOrderForm}
        onClose={handleClose}
      ></OrderFormDialog>
    </div>
  );
};

export default OrderSearchView;
