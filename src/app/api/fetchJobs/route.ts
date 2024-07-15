import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url, queryParams } = await request.json();

    if (!process.env.API) {
      throw new Error("API_URL is not defined in environment variables");
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const fullUrl = `${process.env.API}${url}?${queryString}`;

    console.log("Attempting to fetch from:", fullUrl);

    const response = await fetch(fullUrl, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(
        `API response was not ok: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error in fetchJobs API route:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error fetching data", error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
