import axios from "axios";

async function fetchData(url: string, queryParams: any): Promise<any> {
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API + url + "?" + queryString
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default fetchData;
