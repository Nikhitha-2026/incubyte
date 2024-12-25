import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users && users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Button variant="contained" color="primary" onClick={() => onEdit(user)} style={{margin:"0px 10px"}}>
                Edit
              </Button>
              <Button variant="contained" color="secondary" onClick={() => onDelete(user.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
