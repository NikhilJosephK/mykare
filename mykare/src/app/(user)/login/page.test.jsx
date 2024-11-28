import { render, screen } from "@testing-library/react";
import { PageTypeContext } from "@context";
import Login from "./page";
import "@testing-library/jest-dom";

// Mock the Form component
jest.mock("../../../components/form", () => ({
  Form: ({ title }) => <div>{title}</div>,
}));

describe("Login Component", () => {
  it("renders the Login form with the correct title", () => {
    render(
      <PageTypeContext.Provider value={{ pageType: "valid" }}>
        <Login />
      </PageTypeContext.Provider>
    );

    // Check if the Form component is rendered with the correct title
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("displays 'Invalid Credentials!' when pageType is 'invalid'", () => {
    render(
      <PageTypeContext.Provider value={{ pageType: "invalid" }}>
        <Login />
      </PageTypeContext.Provider>
    );

    // Check if the error message is displayed
    expect(screen.getByText("Invalid Credentials!")).toBeInTheDocument();
  });

  it("does not display 'Invalid Credentials!' when pageType is not 'invalid'", () => {
    render(
      <PageTypeContext.Provider value={{ pageType: "valid" }}>
        <Login />
      </PageTypeContext.Provider>
    );

    // Check if the error message is not displayed
    expect(screen.queryByText("Invalid Credentials!")).not.toBeInTheDocument();
  });
});
