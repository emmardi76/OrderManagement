import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Models/User";
import { UserQuery } from "../../Models/UserQuery";
import { getUsers } from "../Services/userServices";
import { Button, Container, Icon, TextField } from "@mui/material";
import { ArrowBack, Close, Search } from "@mui/icons-material";
import UserSearchView from "./userSearchView";

export const UserSearchForm = (): JSX.Element => {
  const [search, setSearch] = useState<UserQuery | undefined>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);

  const handleSearch = async () => {
    const { data: users } = await getUsers(search);
    setUsers(users);
  };

  //Initial search
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <span className="searchFormTitle">User Search Form</span>
      <div className="searchFields">
        <div className="searchFieldPanel">
          <TextField
            className="searchField"
            name="firstName"
            value={search?.firstName ?? ""}
            onChange={(e) =>
              setSearch({ ...search, firstName: e.target.value })
            }
            placeholder="Search by user first name"
          />
          <TextField
            className="searchField"
            name="lastName"
            value={search?.lastName ?? ""}
            onChange={(e) => setSearch({ ...search, lastName: e.target.value })}
            placeholder="Search by user last name"
          />
          <TextField
            className="searchField"
            name="email"
            value={search?.email ?? ""}
            onChange={(e) => setSearch({ ...search, email: e.target.value })}
            placeholder="Search by user email"
          />
          <TextField
            className="searchField"
            name="phoneNumber"
            value={search?.phoneNumber ?? ""}
            onChange={(e) =>
              setSearch({ ...search, phoneNumber: e.target.value })
            }
            placeholder="Search by user phonenumber"
          />
        </div>
        <div className="searchButtonsPanel">
          <Button
            className="searchButton"
            variant="contained"
            onClick={() => {
              handleSearch();
            }}
          >
            <Icon color="action">
              <Search />
            </Icon>
            Search
          </Button>
          <Button
            className="searchButton"
            variant="contained"
            onClick={() => setSearch({})}
            style={{ cursor: "pointer" }}
          >
            <Icon
              color="action"
              onClick={() => setSearch({})}
              style={{ cursor: "pointer" }}
            >
              <Close />
            </Icon>
            Clean
          </Button>
          <Button
            className="searchButton"
            variant="contained"
            onClick={() => {
              navigate({ pathname: "/HomeView " });
            }}
          >
            <Icon color="action">
              <ArrowBack />
            </Icon>
            Back
          </Button>
        </div>
      </div>
      <UserSearchView
        users={users}
        handleSearch={handleSearch}
      ></UserSearchView>
    </Container>
  );
};
