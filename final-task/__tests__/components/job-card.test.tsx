import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { JobCard } from "@/components/jobs/job-card";
import { useBookmarks } from "@/lib/bookmarks";
import type { Job } from "@/types/job";

// Mock the bookmarks hook
jest.mock("@/lib/bookmarks");
jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

const mockJob: Job = {
  id: "1",
  title: "Software Engineer",
  description:
    "We are looking for a talented software engineer to join our team.",
  responsibilities: ["Write clean code", "Collaborate with team"],
  ideal_candidate: {
    age: "25-35",
    gender: "Any",
    traits: ["Team player", "Problem solver"],
  },
  when_where: "Remote work available",
  about: {
    posted_on: "2023-01-01",
    deadline: "2023-02-01",
    location: "San Francisco, CA",
    start_date: "2023-02-15",
    end_date: "2023-08-15",
    categories: ["IT", "Development"],
    required_skills: ["JavaScript", "React", "Node.js"],
  },
  company: "Tech Corp",
  image: "/logo.png",
};

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  useParams: () => ({ id: "1" }),
  usePathname: () => "/dashboard",
}));
const mockUseBookmarks = useBookmarks as jest.MockedFunction<
  typeof useBookmarks
>;

describe("JobCard Component", () => {
  beforeEach(() => {
    mockUseBookmarks.mockReturnValue({
      bookmarkedJobs: [],
      isLoading: false,
      fetchBookmarks: jest.fn(),
      toggleBookmark: jest.fn().mockResolvedValue(true),
      isBookmarked: jest.fn().mockReturnValue(false),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders job card with correct information", () => {
    render(<JobCard job={mockJob} />);

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText(/Tech Corp/i)).toBeInTheDocument();
    expect(screen.getByText("San Francisco, CA")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We are looking for a talented software engineer to join our team."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("IT")).toBeInTheDocument();
    expect(screen.getByText("Development")).toBeInTheDocument();
  });

  it("displays bookmark button", () => {
    render(<JobCard job={mockJob} />);

    const bookmarkButton = screen.getByRole("button");
    expect(bookmarkButton).toBeInTheDocument();
  });

  it("handles bookmark toggle correctly", async () => {
    const mockToggleBookmark = jest.fn().mockResolvedValue(true);
    mockUseBookmarks.mockReturnValue({
      bookmarkedJobs: [],
      isLoading: false,
      fetchBookmarks: jest.fn(),
      toggleBookmark: mockToggleBookmark,
      isBookmarked: jest.fn().mockReturnValue(false),
    });

    render(<JobCard job={mockJob} />);

    const bookmarkButton = screen.getByRole("button");
    await userEvent.click(bookmarkButton);

    await waitFor(() => {
      expect(mockToggleBookmark).toHaveBeenCalledWith("1");
    });
  });

  it("shows bookmarked state when job is bookmarked", () => {
    mockUseBookmarks.mockReturnValue({
      bookmarkedJobs: [],
      isLoading: false,
      fetchBookmarks: jest.fn(),
      toggleBookmark: jest.fn(),
      isBookmarked: jest.fn().mockReturnValue(true),
    });

    render(<JobCard job={mockJob} />);

    const bookmarkIcon = screen.getByRole("button").querySelector("svg");
    expect(bookmarkIcon).toHaveClass("fill-current", "text-blue-600");
  });

  it("navigates to job detail when card is clicked", async () => {
    render(<JobCard job={mockJob} />);
    const card = screen.getByTestId("job-card");
    await userEvent.click(card);
    expect(mockPush).toHaveBeenCalledWith("/job/1");
  });
});
