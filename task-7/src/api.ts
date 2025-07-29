import type { OpportunityType } from "./types";

const BASE_URL = "https://akil-backend.onrender.com";

export async function fetchOpportunities(): Promise<OpportunityType[]> {
  try {
    const response = await fetch(`${BASE_URL}/opportunities/search`);
    if (!response.ok) {
      throw new Error("Failed to fetch opportunities");
    }
    const result = await response.json();
    // API returns { success, message, data: [...] }
    return Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchOpportunityById(id: string): Promise<OpportunityType | null> {
  try {
    const response = await fetch(`${BASE_URL}/opportunities/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch opportunity");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
