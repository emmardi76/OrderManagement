import React, { useEffect, useState } from "react";
import { OrderLine } from "../../Models/OrderLine";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Icon, Stack } from "@mui/material";
import { deleteOrderLine } from "../Services/orderLineServices";
import { Add } from "@mui/icons-material";
import OrderLineFormDialog from "./orderLineFormDialog";

interface OrderLineSearchViewProps {
  orderId: number;
  orderLines: OrderLine[];
  onClose?: () => void;
}
const OrderLineSearchView = ({
  orderId,
  orderLines,
  onClose,
}: OrderLineSearchViewProps): JSX.Element => {
  const [currentOrderLine, setCurrentOrderLine] = useState<OrderLine>();
  useState<OrderLine>();

  const columns: GridColDef<OrderLine>[] = [
    {
      field: `id`,
      headerName: `ID`,
      width: 70,
    },
    { field: `orderId`, headerName: `ORDERID`, width: 20 },
    { field: `productId`, headerName: `PRODUCTID`, width: 20 },
    { field: `name`, headerName: `NAME`, width: 500 },
    { field: `quantity`, headerName: `QUANTITY`, width: 20 },
    { field: `taxTypeId`, headerName: `TAXTYPEID`, width: 20 },
    { field: `taxPercentage`, headerName: `TAXPERCENTAGE`, width: 20 },
    { field: `unitPrice`, headerName: `UNITPRICE`, width: 20 },
    { field: `totalWithoutTaxes`, headerName: `TOTALWITHOUTTAXES`, width: 20 },
    { field: `total`, headerName: `TOTAL`, width: 20 },
    { field: `totalTaxes`, headerName: `TOTALTAXES`, width: 20 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 180,

      renderCell: (params) => {
        const onClickEdit = () => {
          const currentRow = params.row;
          setCurrentOrderLine(currentRow);
        };

        const onClickDelete = () => {
          const currentRow = params.row;
          onClose && onClose();
          deleteOrderLine(currentRow.id).then((result) => {
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

  let defaultOrderLine: OrderLine = {
    id: 0,
    orderId: orderId,
    productId: 0,
    name: "",
    quantity: 0,
    taxTypeId: 0,
    taxPercentage: 0,
    unitPrice: 0,
    totalWithoutTaxes: 0,
    total: 0,
    totalTaxes: 0,
  };

  const [openOrderLineForm, setOpenOrderLineForm] = useState(false);

  useEffect(() => {
    if (currentOrderLine) {
      setOpenOrderLineForm(true);
    }
  }, [currentOrderLine, setOpenOrderLineForm]);

  const handleClose = () => {
    setOpenOrderLineForm(false);
    setCurrentOrderLine(undefined);
    onClose && onClose();
  };

  return (
    <>
      <br></br>
      <h2>Results of the search order Line</h2>
      &nbsp;
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setCurrentOrderLine(defaultOrderLine);
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
          rows={orderLines}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        ></DataGrid>
      </Box>
      <OrderLineFormDialog
        orderLine={currentOrderLine ?? defaultOrderLine}
        open={openOrderLineForm}
        onClose={handleClose}
      ></OrderLineFormDialog>
    </>
  );
};

export default OrderLineSearchView;
