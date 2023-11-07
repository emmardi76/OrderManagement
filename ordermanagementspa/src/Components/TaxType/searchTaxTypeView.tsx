import { TaxType } from "../../Models/TaxType";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Icon, Stack } from "@mui/material";
import { deleteTax } from "../Services/taxTypeServices";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import TaxTypeFormDialog from "./taxTypeFormDialog";

interface SearchTaxTypeViewProps {
  taxTypes: TaxType[];
  onCLose?: () => void;
  handleSearch: () => Promise<void>;
}

let defaultTaxType: TaxType = {
  id: 0,
  name: "",
  taxPercentage: 0,
};

const SearchTaxTypeView = ({
  taxTypes,
  onCLose,
  handleSearch,
}: SearchTaxTypeViewProps): JSX.Element => {
  const [currentTaxType, setCurrentTaxType] = useState<TaxType>();
  const columns: GridColDef<TaxType>[] = [
    { field: `name`, headerName: `Name`, width: 130 },
    { field: `taxPercentage`, headerName: `TaxPercentage`, width: 130 },
    {
      field: "action",
      headerName: "",
      sortable: false,
      width: 180,

      renderCell: (params) => {
        const onClickEdit = () => {
          const currentRow = params.row;
          setCurrentTaxType(currentRow);
        };

        const onClickDelete = () => {
          const currentRow = params.row;
          onCLose && onCLose();
          return deleteTax(currentRow.id).then((result) => {
            if (result.status === 200) {
              onCLose && onCLose();
            } else {
              alert(result.data);
            }
            handleSearch();
          });
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
    onCLose && onCLose();
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
          setCurrentTaxType(defaultTaxType);
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
    </div>
  );
};

export default SearchTaxTypeView;
