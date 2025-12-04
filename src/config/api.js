const API_URL = "https://api-partytime-back.onrender.com/api";

// Função auxiliar para obter headers com token
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Função auxiliar para fazer requisições autenticadas
export const fetchWithAuth = async (url, options = {}) => {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  // Se retornar 401, token expirou ou é inválido
  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return response;
};

export const api = {
  getParties: async () => {
    const res = await fetchWithAuth("/parties");
    return res.json();
  },

  deleteParty: async (id) => {
    await fetchWithAuth(`/parties/${id}`, {
      method: "DELETE",
    });
  },
};

export default API_URL;
