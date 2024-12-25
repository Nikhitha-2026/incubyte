import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserFormDialog from "./UserFormDialog";

describe("UserFormDialog Component", () => {
  it("renders correctly for adding a new user", () => {
    render(<UserFormDialog open={true} onClose={jest.fn()} onSubmit={jest.fn()} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("renders user data for editing", () => {
    const mockUser = { name: "John Doe", email: "john@example.com" };
    render(<UserFormDialog open={true} user={mockUser} onClose={jest.fn()} onSubmit={jest.fn()} />);

    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();
  });

  it("validates email field", () => {
    render(<UserFormDialog open={true} onClose={jest.fn()} onSubmit={jest.fn()} />);

    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "invalid-email" } });
    fireEvent.click(screen.getByText("Save"));

    expect(screen.getByText("Please enter a valid email.")).toBeInTheDocument();
  });

  it("calls onSubmit with correct data", () => {
    const mockSubmit = jest.fn();
    render(<UserFormDialog open={true} onClose={jest.fn()} onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@example.com" } });
    fireEvent.click(screen.getByText("Save"));

    expect(mockSubmit).toHaveBeenCalledWith({ name: "John Doe", email: "john@example.com" });
  });
});
