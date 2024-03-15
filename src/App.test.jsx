import React, { render, screen } from "@testing-library/react";
import App from "./App.jsx";

test("renders learn react link", async () => {
  render(<App />);
  const linkElement = screen.getByText(/A simple React Todo List App/i);
  const addNewButton = await screen.findByTestId("add-new-button");

  expect(linkElement).toBeInTheDocument();
  expect(addNewButton).toBeInTheDocument();
});


git config --global user.email "you@example.com"
git config --global user.name "Your Name"
