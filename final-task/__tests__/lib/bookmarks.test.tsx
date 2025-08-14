import { renderHook, act } from "@testing-library/react";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});
import { useBookmarks } from "@/lib/bookmarks";
import { useAuth } from "@/lib/auth";

// Mock the auth hook
jest.mock("@/lib/auth");

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// Mock fetch
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

// Mock useAuth.getState
(useAuth as any).getState = () => ({
  user: {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    role: "user",
    accessToken: "mock-token",
    refreshToken: "mock-refresh-token",
  },
});

describe("useBookmarks Hook", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: {
        id: "1",
        name: "Test User",
        email: "test@example.com",
        role: "user",
        accessToken: "mock-token",
        refreshToken: "mock-refresh-token",
      },
      isLoading: false,
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
      setLoading: jest.fn(),
    });

    mockFetch.mockClear();
  });

  it("fetches bookmarks successfully", async () => {
    const mockBookmarks = {
      data: [
        {
          eventID: "1",
          title: "Software Engineer",
          opType: "Full-time",
          orgName: "Tech Corp",
          logoUrl: "/logo.png",
          location: ["San Francisco"],
          description: "Great job opportunity",
          categories: ["IT"],
          dateBookmarked: "2023-01-01",
        },
      ],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockBookmarks,
    } as Response);

    const { result } = renderHook(() => useBookmarks());

    await act(async () => {
      await result.current.fetchBookmarks();
    });

    expect(result.current.bookmarkedJobs).toEqual(mockBookmarks.data);
    expect(result.current.isLoading).toBe(false);
  });

  it("toggles bookmark successfully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    const { result } = renderHook(() => useBookmarks());

    // Ensure job is not already bookmarked
    result.current.bookmarkedJobs = [];

    let toggleResult: boolean | undefined;

    await act(async () => {
      toggleResult = await result.current.toggleBookmark("1");
    });

    expect(toggleResult).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://akil-backend.onrender.com/bookmarks/1",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer mock-token",
        }),
      })
    );
  });

  it("removes bookmark successfully", async () => {
    // Set initial state with a bookmarked job
    const { result } = renderHook(() => useBookmarks());

    act(() => {
      result.current.bookmarkedJobs = [
        {
          eventID: "1",
          title: "Software Engineer",
          opType: "Full-time",
          orgName: "Tech Corp",
          logoUrl: "/logo.png",
          location: ["San Francisco"],
          description: "Great job opportunity",
          categories: ["IT"],
          dateBookmarked: "2023-01-01",
        },
      ];
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    let toggleResult: boolean | undefined;

    await act(async () => {
      toggleResult = await result.current.toggleBookmark("1");
    });

    expect(toggleResult).toBe(false);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://akil-backend.onrender.com/bookmarks/1",
      expect.objectContaining({
        method: "DELETE",
      })
    );
  });

  it("checks if job is bookmarked correctly", () => {
    const { result } = renderHook(() => useBookmarks());

    act(() => {
      result.current.bookmarkedJobs = [
        {
          eventID: "1",
          title: "Software Engineer",
          opType: "Full-time",
          orgName: "Tech Corp",
          logoUrl: "/logo.png",
          location: ["San Francisco"],
          description: "Great job opportunity",
          categories: ["IT"],
          dateBookmarked: "2023-01-01",
        },
      ];
    });

    expect(result.current.isBookmarked("1")).toBe(true);
    expect(result.current.isBookmarked("2")).toBe(false);
  });
});
