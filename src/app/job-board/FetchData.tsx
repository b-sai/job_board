import axios, { AxiosError } from "axios";

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

export async function upsertJobs({
  resume,
  userId,
  file_type,
}: {
  resume: any;
  userId: string;
  file_type: string;
}) {
  const formData = new FormData();
  formData.append("resume", resume);
  formData.append("user_id", userId);
  formData.append("file_type", file_type);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${baseUrl}upsert_user/`, {
    method: "POST",
    body: formData,
  });
  return response.json();
}
