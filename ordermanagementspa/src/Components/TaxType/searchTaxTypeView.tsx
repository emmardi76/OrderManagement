import { TaxType } from "../../Models/TaxType";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Button, Icon, Stack } from "@mui/material";
import { deleteTaxType } from "../Services/taxTypeServices";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import TaxTypeFormDialog from "./taxTypeFormDialog";

interface SearchTaxTypeViewProps {
  taxTypes: TaxType[];
}

let defaultTaxType: TaxType = {
  id: 0,
  name: "",
  taxPercentage: 0,
};

const SearchTaxTypeView = ({
  taxTypes,
}: SearchTaxTypeViewProps): JSX.Element => {
  const [currentTaxType, setCurrentTaxType] = useState<TaxType>();
  const columns: GridColDef<TaxType>[] = [
    {
      field: `id`,
      headerName: `ID`,
      width: 70,
    },
    { field: `name`, headerName: `NAME`, width: 130 },
    { field: `taxPercentage`, headerName: `TAXPERCENTAGE`, width: 130 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 180,

      renderCell: (params) => {
        const onClickEdit = () => {
          const currentRow = params.row;
          setCurrentTaxType(currentRow);
        };

        const onClickDelete = () => {
          const currentRow = params.row;
          return deleteTaxType(currentRow.id);
        };

        // eslint-disable-next-line react-hooks/rules-of-hooks

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

  const [openTaxTypeForm, setOpenTaxTypeForm] = useState(false);

  useEffect(() => {
    if (currentTaxType) {
      setOpenTaxTypeForm(true);
    }
  }, [currentTaxType, setOpenTaxTypeForm]);

  const handleClose = () => {
    setOpenTaxTypeForm(false);
    setCurrentTaxType(undefined);
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
          setCurrentTaxType(defaultTaxType);
        }}
      >
        <Icon color="action">
          <Add />
        </Icon>
        Add
      </Button>
      <DataGrid
        rows={taxTypes}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      ></DataGrid>
      <TaxTypeFormDialog
        taxType={currentTaxType ?? defaultTaxType}
        open={openTaxTypeForm}
        onClose={handleClose}
      ></TaxTypeFormDialog>
    </>
  );
};

export default SearchTaxTypeView;
