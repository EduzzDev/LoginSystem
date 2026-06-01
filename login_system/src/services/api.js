const BASE_URL =
  import.meta.env.VITE_API_URL || "https://loginsystem-d86j.onrender.com";

export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) {
    throw result;
  }
  return result;
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const result = await res.json();

  if (!res.ok) {
    throw result;
  }
  return result;
};

export async function checkAuth() {
  const response = await fetch(`${BASE_URL}/dashboard`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Não autorizado");
  }

  return await response.json();
}
