  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import { Container, Button } from "@mui/material";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import UserTable from "./UserTable";
  import UserFormDialog from "./UserFormDialog";
  import ConfirmDialog from "./ConfirmDialog";

  const App = () => {
    const [users, setUsers] = useState([]);
    const [openFormDialog, setOpenFormDialog] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);

    useEffect(() => {
      fetchUsers();
    }, []);

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const handleOpenFormDialog = (user = null) => {
      setCurrentUser(user);
      setOpenFormDialog(true);
    };

    const handleCloseFormDialog = () => {
      setOpenFormDialog(false);
    };

    const handleOpenConfirmDialog = (id) => {
      setDeleteUserId(id);
      setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
      setOpenConfirmDialog(false);
      setDeleteUserId(null);
    };

    const handleDeleteUser = async () => {
      try {
        await axios.delete(`http://localhost:3001/users/${deleteUserId}`);
        setUsers(users.filter((user) => user.id !== deleteUserId));
        toast.success("User deleted successfully!");
        handleCloseConfirmDialog();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };

    const handleFormSubmit = async (formData) => {
      try {
        if (currentUser) {
          await axios.patch(`http://localhost:3001/users/${currentUser.id}`, formData);
          setUsers(
            users.map((user) =>
              user.id === currentUser.id ? { ...user, ...formData } : user
            )
          );
        } else {
          // Add user
          const response = await axios.post("http://localhost:3001/users", formData);
          setUsers([response.data, ...users]);  // Add the new user at the top
          toast.success("User added successfully!");
        }
        handleCloseFormDialog();
      } catch (error) {
        console.error("Error saving user:", error);
      }
    };

    return (
      <Container>
        <h1>Users</h1>
        <Button variant="contained" color="primary" onClick={() => handleOpenFormDialog()}>
          Add User
        </Button>
        <UserTable users={users} onEdit={handleOpenFormDialog} onDelete={handleOpenConfirmDialog} />
        <UserFormDialog
          open={openFormDialog}
          onClose={handleCloseFormDialog}
          onSubmit={handleFormSubmit}
          user={currentUser}
          existingUsers={users}
        />
        <ConfirmDialog
          open={openConfirmDialog}
          onClose={handleCloseConfirmDialog}
          onConfirm={handleDeleteUser}
          user={users?.find((user) => user.id === deleteUserId)}
        />
        <ToastContainer />
      </Container>
    );
  };

  export default App;
