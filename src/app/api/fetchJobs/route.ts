import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url, queryParams } = await request.json();

    const queryString = new URLSearchParams();

    for (const key in queryParams) {
      if (Array.isArray(queryParams[key])) {
        queryParams[key].forEach((value: string) =>
          queryString.append(key, value)
        );
      } else {
        queryString.append(key, queryParams[key]);
      }
    }

    // Construct the full URL with the query string
    const fullUrl = `${process.env.API}${url}?${queryString.toString()}`;

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
  } catch (error) {
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
