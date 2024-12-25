import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserTable from "./UserTable";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

describe("UserTable Component", () => {
  it("renders a table with user data", () => {
    render(<UserTable users={mockUsers} onEdit={jest.fn()} onDelete={jest.fn()} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    const mockEdit = jest.fn();
    render(<UserTable users={mockUsers} onEdit={mockEdit} onDelete={jest.fn()} />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(mockEdit).toHaveBeenCalledWith(mockUsers[0]);
  });

  it("calls onDelete when delete button is clicked", () => {
    const mockDelete = jest.fn();
    render(<UserTable users={mockUsers} onEdit={jest.fn()} onDelete={mockDelete} />);

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(mockDelete).toHaveBeenCalledWith(mockUsers[0].id);
  });
});
