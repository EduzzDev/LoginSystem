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
export async function logout() {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  const result = await res.json();

  if (!res.ok) {
    throw result;
  }
  return result;
}

export async function getUserProfile() {
  const res = await fetch(`${BASE_URL}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const result = await res.json();
  if (!res.ok) {
    throw result;
  }
  return result;
}

export async function updateUserProfile(formData) {
  const res = await fetch(`${BASE_URL}/user/update-profile`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(
      result.message || result.error || "Erro ao atualizar perfil.",
    );
  }
  return result;
}

export async function sendLinkEmail(data) {
  const res = await fetch(`${BASE_URL}/user/send-link`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  })
  const result = await res.json();

  if (!res.ok) {
    throw result;
  }
  return result;
}

export async function forgotPassword(data) {
  const res = await fetch(`${BASE_URL}/user/forgot`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  const result = await res.json();

  if (!res.ok) {
    throw result;
  }
  return result;
}
