import { render } from "@testing-library/react";
import Admin from "./page";

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

// Mock window and localStorage before tests
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Add a mock for window.undefined check
Object.defineProperty(global, "window", {
  value: {
    localStorage: localStorageMock,
  },
});

describe("Admin Component", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it("renders Admin Panel header", () => {
    const { getByText } = render(<Admin />);
    expect(getByText("Admin Panel")).toBeInTheDocument();
  });

  it("renders no user details when localStorage is empty", () => {
    const { container } = render(<Admin />);
    const userCards = container.querySelectorAll(".border.border-red-400");
    expect(userCards.length).toBe(0);
  });

  it("renders user details from localStorage", () => {
    const mockUserDetails = {
      "mk-user": JSON.stringify([
        { email: "test@example.com", password: "password123" },
        { email: "another@example.com", password: "pass456" },
      ]),
    };

    localStorageMock.getItem.mockImplementation(
      (key) => mockUserDetails[key] || null
    );

    const { getByText } = render(<Admin />);

    expect(getByText(/test@example.com/)).toBeInTheDocument();
    expect(getByText(/another@example.com/)).toBeInTheDocument();
  });
});
