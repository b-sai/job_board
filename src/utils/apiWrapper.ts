"use server";

import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;
const API_SECRET = process.env.API_SECRET;

export async function apiWrapper(
  endpoint: string,
  method: string = "GET",
  body?: FormData | string,
  headers?: HeadersInit
) {
  if (!API_URL || !API_SECRET) {
    throw new Error(
      "API_URL or API_SECRET is not defined in environment variables"
    );
  }
  const url = `${API_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_SECRET}`,
    ...headers,
  });

  const options: RequestInit = {
    method,
    headers: defaultHeaders,
  };

  if (body) {
    if (body instanceof FormData) {
      options.body = body;
      // Remove Content-Type header for FormData
      (options.headers as Headers).delete("Content-Type");
    } else {
      options.body = body;
    }
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        JSON.stringify({
          status: response.status,
          statusText: response.statusText,
          data: errorData,
        })
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
