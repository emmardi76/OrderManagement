import React, { useEffect, useState } from "react";
import { InvoiceList } from "../../Models/InvoiceList";
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { Invoice } from "../../Models/Invoice";
import { deleteInvoice, getInvoice } from "../Services/invoiceServices";
import { Button, Icon, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";
import InvoiceFormDialog from "./invoiceFormDialog";

interface InvoiceSearchViewProps {
  invoices: InvoiceList[];
  handleSearch: () => Promise<void>;
}

const defaultInvoice: Invoice = {
  id: 0,
  invoiceNumber: "",
  customerId: 0,
  customerAddressId: 0,
  customerName: "",
  date: new Date(),
  remarks: "",
  dueDate: new Date(),
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

const InvoiceSearchView = ({
  invoices,
  handleSearch,
}: InvoiceSearchViewProps): JSX.Element => {
  const [currentInvoice, setCurrentInvoice] = useState<InvoiceList>();
  const [editInvoice, setEditInvoice] = useState<Invoice>();

  const columns: GridColDef<InvoiceList>[] = [
    { field: `invoiceNumber`, headerName: `Invoice`, width: 100 },
    { field: `customerName`, headerName: `Customer`, width: 400 },
    {
      field: `date`,
      headerName: `Date`,
      width: 150,
      valueFormatter: dateFormatter,
    },
    {
      field: `dueDate`,
      headerName: `DueDate`,
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
          setCurrentInvoice(currentRow);
        };

        const onClickDelete = async () => {
          const currentRow = params.row;
          await deleteInvoice(currentRow.id);
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

  const [openInvoiceForm, setOpenInvoiceForm] = useState(false);

  useEffect(() => {
    if (currentInvoice) {
      getInvoice(currentInvoice.id).then((result) => {
        setEditInvoice(result.data);
      });
    }
  }, [currentInvoice, setOpenInvoiceForm]);

  useEffect(() => {
    if (editInvoice) {
      setOpenInvoiceForm(true);
    }
  }, [editInvoice]);

  const handleClose = () => {
    setOpenInvoiceForm(false);
    setCurrentInvoice(undefined);
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
          setEditInvoice({ ...defaultInvoice });
          setOpenInvoiceForm(true);
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
        rows={invoices}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      ></DataGrid>

      <InvoiceFormDialog
        invoice={editInvoice ?? defaultInvoice}
        open={openInvoiceForm}
        onClose={handleClose}
      ></InvoiceFormDialog>
    </div>
  );
};

export default InvoiceSearchView;
