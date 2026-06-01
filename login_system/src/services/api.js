export const registerUser = async (data) => {
  const res = await fetch("https://loginsystem-d86j.onrender.com/register", {
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
  const res = await fetch("https://loginsystem-d86j.onrender.com/login", {
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
  const response = await fetch(
    "https://loginsystem-d86j.onrender.com/dashboard",
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Não autorizado");
  }

  return await response.json();
}
