import React, { useEffect, useState } from "react";
import { InvoiceLine } from "../../Models/InvoiceLine";
import { deleteInvoiceLine } from "../Services/invoiceLineServices";
import { Button, Icon, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import InvoiceLineFormDialog from "./invoiceLineFormDialog";

interface InvoiceLineSearchViewProps {
  invoiceId: number;
  invoiceLines: InvoiceLine[];
  onClose?: () => void;
}

const InvoiceLineSearchView = ({
  invoiceId,
  invoiceLines,
  onClose,
}: InvoiceLineSearchViewProps): JSX.Element => {
  const [currentInvoiceLine, setCurrentInvoiceLine] = useState<InvoiceLine>();

  const columns: GridColDef<InvoiceLine>[] = [
    { field: `name`, headerName: `Product Name`, width: 200 },
    { field: `quantity`, headerName: `Quantity`, width: 100 },
    { field: `taxPercentage`, headerName: `Tax Percentage`, width: 130 },
    { field: `unitPrice`, headerName: `UnitPrice`, width: 80 },
    {
      field: `totalWithoutTaxes`,
      headerName: `Tax Base`,
      width: 150,
    },
    { field: `totalTaxes`, headerName: `Taxes`, width: 100 },
    { field: `total`, headerName: `Total`, width: 100 },
    {
      field: "action",
      headerName: "",
      sortable: false,
      width: 180,

      renderCell: (params) => {
        const onClickEdit = () => {
          const currentRow = params.row;
          setCurrentInvoiceLine(currentRow);
        };

        const onClickDelete = () => {
          const currentRow = params.row;
          onClose && onClose();
          deleteInvoiceLine(currentRow.id).then((result) => {
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

  let defaultInvoiceLine: InvoiceLine = {
    id: 0,
    invoiceId: invoiceId,
    productId: 0,
    name: "",
    quantity: 1,
    taxTypeId: 0,
    taxPercentage: 0,
    unitPrice: 0,
    totalWithoutTaxes: 0,
    total: 0,
    totalTaxes: 0,
  };

  const [openInvoiceLineForm, setOpenInvoiceLineForm] = useState(false);

  useEffect(() => {
    if (currentInvoiceLine) {
      setOpenInvoiceLineForm(true);
    }
  }, [currentInvoiceLine, setOpenInvoiceLineForm]);

  const handleClose = () => {
    setOpenInvoiceLineForm(false);
    setCurrentInvoiceLine(undefined);
    onClose && onClose();
  };

  return (
    <div className="searchView">
      <span className="searchViewTitle">Invoice Lines</span>

      <Button
        className="searchViewAddButton"
        variant="contained"
        color="primary"
        onClick={() => {
          setCurrentInvoiceLine(defaultInvoiceLine);
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
        rows={invoiceLines}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      ></DataGrid>

      <InvoiceLineFormDialog
        invoiceLine={currentInvoiceLine ?? defaultInvoiceLine}
        open={openInvoiceLineForm}
        onClose={handleClose}
      ></InvoiceLineFormDialog>
    </div>
  );
};

export default InvoiceLineSearchView;
