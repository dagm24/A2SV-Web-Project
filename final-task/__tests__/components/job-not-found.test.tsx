import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";

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

// Mock job not found component
const JobNotFound = () => {
  const router = useRouter();
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
      <p className="text-gray-600 mb-6">
        The job you're looking for doesn't exist or has been removed.
      </p>
      <button
        onClick={() => router.push("/dashboard")}
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        Back to Jobs
      </button>
    </div>
  );
};

describe("Job Not Found Component", () => {
  it("renders job not found message", () => {
    render(<JobNotFound />);

    expect(screen.getByText("Job Not Found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "The job you're looking for doesn't exist or has been removed."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Back to Jobs")).toBeInTheDocument();
  });

  it("navigates back to dashboard when back button is clicked", () => {
    render(<JobNotFound />);
    const backButton = screen.getByText("Back to Jobs");
    fireEvent.click(backButton);
    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });
});
