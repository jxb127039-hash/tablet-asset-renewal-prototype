import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "./App";

describe("cart experience", () => {
  beforeEach(() => localStorage.clear());

  it("separates today's payable from the future loss", () => {
    render(<MemoryRouter initialEntries={["/cart"]}><App /></MemoryRouter>);
    expect(screen.getByText("尚未应用旧机抵扣")).toBeInTheDocument();
    expect(screen.getByText("90天预计少值仅用于时机比较，不计入今天优惠。")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "选择资产并测算" })).toBeInTheDocument();
  });
});
