import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import DashboardToolBar from "../DashboardToolBar";

describe("DashboardToolBar", () => {
  it("renders the title and default label", () => {
    render(<DashboardToolBar title="Documents" />);

    expect(screen.getByText("Documents")).toBeInTheDocument();
    expect(screen.getByText("Document")).toBeInTheDocument(); // Label
  });

  it("does not render label if label.condition is false", () => {
    render(<DashboardToolBar title="Test" label={{ condition: false }} />);
    expect(screen.queryByText("Document")).not.toBeInTheDocument();
  });

  it("renders Filter button with badge", () => {
    render(<DashboardToolBar title="Test" />);
    expect(screen.getByLabelText("filter")).toBeInTheDocument();
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  it("renders SearchBox if ShowSearch.condition is true", () => {
    render(<DashboardToolBar title="Test" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument(); // Assuming input inside SearchBox
  });

  it("does not render SearchBox if ShowSearch.condition is false", () => {
    render(
      <DashboardToolBar title="Test" ShowSearch={{ condition: false }} />
    );
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("renders primary and secondary buttons", () => {
    render(<DashboardToolBar title="Test" />);
    expect(screen.getByText("Primary")).toBeInTheDocument();
    expect(screen.getByText("Secondary")).toBeInTheDocument();
  });

  it("renders refresh, close, and more option icons", () => {
    render(<DashboardToolBar title="Test" />);
    expect(screen.getByTestId("refresh-icon")).toBeInTheDocument();
    expect(screen.getByTestId("close-icon")).toBeInTheDocument();
    expect(screen.getByTestId("more-option-icon")).toBeInTheDocument();
  });

  it("hides refresh icon if refresh.condition is false", () => {
    render(
      <DashboardToolBar
        title="Test"
        refresh={{ condition: false }}
      />
    );
    expect(screen.queryByTestId("refresh-icon")).not.toBeInTheDocument();
  });
});