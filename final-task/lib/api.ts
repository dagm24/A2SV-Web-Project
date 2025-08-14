const API_BASE_URL = "https://akil-backend.onrender.com";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  requireAuth = false
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  // Use a plain object for headers so we can add Authorization safely
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (requireAuth && typeof window !== "undefined") {
    const authData = localStorage.getItem("auth-storage");
    if (authData) {
      const { state } = JSON.parse(authData);
      if (state?.user?.accessToken) {
        headers["Authorization"] = `Bearer ${state.user.accessToken}`;
      }
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Request failed" }));
    throw new ApiError(
      response.status,
      errorData.message || `HTTP ${response.status}`
    );
  }

  return response.json();
}
