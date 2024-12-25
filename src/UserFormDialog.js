import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

const UserFormDialog = ({ open, onClose, onSubmit, user, existingUsers }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");

  useEffect(() => {
    if (user) {
      setFormData(user); 
    } else if (open) {
      setFormData({ name: "", email: "" });
    }
  }, [user, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email") {
      validateEmail(value);
    }
    if (name === "name") {
      validateName(value);
    }
  };

  const handleSubmit = () => {
    const isNameValid = validateName(formData.name);
    const isEmailValid = validateEmail(formData.email);

    if (isNameValid && isEmailValid && !isEmailDuplicate(formData.email) && !isNameDuplicate(formData.name)) {
      onSubmit(formData);
      onClose();
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailError(!isValid);
    setEmailErrorMsg(isValid ? "" : "Enter a valid email address.");
    return isValid;
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const isValid = nameRegex.test(name);
    setNameError(!isValid);
    setNameErrorMsg(isValid ? "" : "Name must only contain alphabets.");
    return isValid;
  };

  const isEmailDuplicate = (email) => {
    const duplicate = existingUsers.some(
      (existingUser) => existingUser.email === email && (!user || existingUser.email !== user.email)
    );
    if (duplicate) {
      setEmailError(true);
      setEmailErrorMsg("This email is already in use.");
    }
    return duplicate;
  };

  const isNameDuplicate = (name) => {
    const duplicate = existingUsers.some(
      (existingUser) => existingUser.name === name && (!user || existingUser.name !== user.name)
    );
    if (duplicate) {
      setNameError(true);
      setNameErrorMsg("This name is already in use.");
    }
    return duplicate;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{user ? "Edit User" : "Add User"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={nameError}
          helperText={nameErrorMsg}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={emailError}
          helperText={emailErrorMsg}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormDialog;
