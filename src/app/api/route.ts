const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiWrapper(
  endpoint: string,
  method: string = "GET",
  body?: FormData | Record<string, any>
) {
  const url = `${API_URL}${endpoint}`;

  const headers: HeadersInit = new Headers();

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    if (body instanceof FormData) {
      options.body = body;
    } else {
      headers.set("Content-Type", "application/json");
      options.body = JSON.stringify(body);
    }
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
