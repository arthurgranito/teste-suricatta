import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import axios from "axios";
import "@testing-library/jest-dom";
import React from "react";

jest.mock("axios");

describe("App component", () => {
  it("deve exibir tarefas da API", async () => {
    const mockTasks = [
      { _id: "1", task: "Tarefa 1", description: "Desc 1", checked: false },
      { _id: "2", task: "Tarefa 2", description: "Desc 2", checked: true },
    ];

    axios.get.mockResolvedValueOnce({ data: mockTasks });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Tarefa 1")).toBeInTheDocument();
      expect(screen.getByText("Tarefa 2")).toBeInTheDocument();
    });

    const allTab = screen.getByText(/All \(\d+\)/);
    expect(allTab).toHaveTextContent("All (2)");
  });
});
