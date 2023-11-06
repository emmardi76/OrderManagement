import React, { useEffect, useState } from "react";
import { User } from "../../Models/User";
import UserFormDialog from "./userFormDialog";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import { deleteUser } from "../Services/userServices";

interface UserSearchViewProps {
  users: User[];
  handleSearch: () => Promise<void>;
}

let defaultUser: User = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const UserSearchView = ({
  users,
  handleSearch,
}: UserSearchViewProps): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User>();
  const columns: GridColDef<User>[] = [
    { field: `firstName`, headerName: `First Name`, width: 200 },
    { field: `lastName`, headerName: `Last Name`, width: 200 },
    { field: `email`, headerName: `Email`, width: 200 },
    { field: `phoneNumber`, headerName: `Phone Number`, width: 200 },
    {
      field: "action",
      headerName: "",
      sortable: false,
      width: 180,

      renderCell: (params) => {
        const onClickEdit = () => {
          const currentRow = params.row;
          setCurrentUser(currentRow);
        };

        const onClickDelete = () => {
          const currentRow = params.row;
          return deleteUser(currentRow.id);
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

  const [openUserForm, setOpenUserForm] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setOpenUserForm(true);
    }
  }, [currentUser, setOpenUserForm]);

  const handleClose = () => {
    setOpenUserForm(false);
    setCurrentUser(undefined);
    handleSearch();
  };

  return (
    <div className="searchView">
      <span className="searchViewTitle">Results of the search</span>

      <div className="cleanFix"></div>

      <DataGrid
        className="searchViewDataGrid"
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      ></DataGrid>

      <UserFormDialog
        user={currentUser ?? defaultUser}
        open={openUserForm}
        onClose={handleClose}
      ></UserFormDialog>
    </div>
  );
};

export default UserSearchView;
