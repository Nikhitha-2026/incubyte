import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmDialog from "./ConfirmDialog";

describe("ConfirmDialog Component", () => {
  it("renders the confirmation dialog with correct user name", () => {
    render(<ConfirmDialog open={true} onClose={jest.fn()} onConfirm={jest.fn()} user={{ name: "John Doe" }} />);

    expect(screen.getByText("Do you want to delete John Doe?")).toBeInTheDocument();
  });

  it("calls onConfirm when Yes is clicked", () => {
    const mockConfirm = jest.fn();
    render(<ConfirmDialog open={true} onClose={jest.fn()} onConfirm={mockConfirm} user={{ name: "John Doe" }} />);

    fireEvent.click(screen.getByText("Yes"));
    expect(mockConfirm).toHaveBeenCalled();
  });

  it("calls onClose when No is clicked", () => {
    const mockClose = jest.fn();
    render(<ConfirmDialog open={true} onClose={mockClose} onConfirm={jest.fn()} user={{ name: "John Doe" }} />);

    fireEvent.click(screen.getByText("No"));
    expect(mockClose).toHaveBeenCalled();
  });
});
