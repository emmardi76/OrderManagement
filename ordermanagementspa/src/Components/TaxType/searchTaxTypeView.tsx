import { TaxType } from "../../Models/TaxType";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Button, Icon, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DeleteTaxType, UpdateTaxType } from "../Services/taxTypeServices";
import { Add } from "@mui/icons-material";

interface SearchTaxTypeViewProps {
  taxTypes: TaxType[];
}

const SearchTaxTypeView = ({
  taxTypes,
}: SearchTaxTypeViewProps): JSX.Element => {
  const columns: GridColDef<any>[] = [
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
      //disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClickEdit = () => {
          const currentRow = params.row;
          return UpdateTaxType(currentRow);
          // alert(JSON.stringify(currentRow, null, 4));
        };

        const onClickDelete = () => {
          const currentRow = params.row;
          return (
            //alert(JSON.stringify(currentRow, null, 4)),
            DeleteTaxType(currentRow.id)
          );
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

  const navigate = useNavigate();

  return (
    <>
      <br></br>
      <h2>Results of the search</h2>
      &nbsp;
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate({ pathname: "/TaxType/taxTypeForm/" });
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
    </>
  );
};

export default SearchTaxTypeView;
