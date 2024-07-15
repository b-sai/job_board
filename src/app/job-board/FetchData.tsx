import axios, { AxiosError } from "axios";

export async function fetchData(url: string, queryParams: any): Promise<any> {
  try {
    const response = await axios.post("/api/fetchJobs", { url, queryParams });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || error.message);
    } else if (error instanceof Error) {
      console.error("Error fetching data:", error.message);
      throw error;
    } else {
      console.error("An unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function fetchLocations(url: string): Promise<any> {
  try {
    const response = await axios.post("/api/fetchJobs", {
      url,
      queryParams: {},
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || error.message);
    } else if (error instanceof Error) {
      console.error("Error fetching data:", error.message);
      throw error;
    } else {
      console.error("An unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

