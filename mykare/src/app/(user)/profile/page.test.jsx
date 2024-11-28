import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import Profile from "./page";

// Mock the cookies function
jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Profile Component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders the Profile component and displays the username when cookie is present", async () => {
    // Mock the cookies function to return a valid session cookie
    const mockCookieValue = JSON.stringify({ email: "testuser@example.com" });
    const mockGet = jest.fn().mockReturnValue({ value: mockCookieValue });
    cookies.mockReturnValue({ get: mockGet });

    // Mock the useRouter hook
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    // Render the component
    render(<Profile />);

    // Wait for the username to appear
    await waitFor(() => {
      const username = screen.getByText(/Welcome/i);
      expect(username).toHaveTextContent("Welcome testuser");
    });

    // Assert the cookie was accessed
    expect(mockGet).toHaveBeenCalledWith("session");
  });

  it("triggers router.push on button click", async () => {
    // Mock the cookies function to return a valid session cookie
    const mockCookieValue = JSON.stringify({ email: "testuser@example.com" });
    const mockGet = jest.fn().mockReturnValue({ value: mockCookieValue });
    cookies.mockReturnValue({ get: mockGet });

    // Mock the useRouter hook
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    // Render the component
    render(<Profile />);

    // Find the button and simulate a click
    const button = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(button);

    // Verify that router.push was called with "/login"
    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("renders the Profile component with default email when no cookie is present", async () => {
    // Mock the cookies function to return undefined
    const mockGet = jest.fn().mockReturnValue(undefined);
    cookies.mockReturnValue({ get: mockGet });

    // Mock the useRouter hook
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    // Render the component
    render(<Profile />);

    // Wait for the default username to appear
    await waitFor(() => {
      const username = screen.getByText(/Welcome/i);
      expect(username).toHaveTextContent("Welcome user");
    });

    // Assert the cookie was accessed
    expect(mockGet).toHaveBeenCalledWith("session");
  });
});
