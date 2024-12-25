import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders the User Management app", () => {
    render(<App />);
    expect(screen.getByText("User Management")).toBeInTheDocument();
    expect(screen.getByText("Add User")).toBeInTheDocument();
  });

  it("adds a new user to the top of the list", async () => {
    render(<App />);
    fireEvent.click(screen.getByText("Add User"));

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@example.com" } });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getAllByText("John Doe")[0]).toBeInTheDocument(); 
    });
  });

  it("updates an existing user", async () => {
    render(<App />);
    fireEvent.click(screen.getAllByText("Edit")[0]); r

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Jane Doe" } });
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    });
  });

  it("deletes a user", async () => {
    render(<App />);
    fireEvent.click(screen.getAllByText("Delete")[0]);

    fireEvent.click(screen.getByText("Yes"));

    await waitFor(() => {
      expect(screen.queryByText("First User's Name")).not.toBeInTheDocument();
    });
  });
});
