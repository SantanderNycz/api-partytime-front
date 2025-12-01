const API_BASE_URL = "http://localhost:3000/api"

export const api = {
  // Parties
  getParties: async () => {
    const response = await fetch(`${API_BASE_URL}/parties`)
    return response.json()
  },

  getParty: async (id) => {
    const response = await fetch(`${API_BASE_URL}/parties/${id}`)
    return response.json()
  },

  createParty: async (data) => {
    const response = await fetch(`${API_BASE_URL}/parties`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  updateParty: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/parties/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  deleteParty: async (id) => {
    const response = await fetch(`${API_BASE_URL}/parties/${id}`, {
      method: "DELETE",
    })
    return response.json()
  },

  // Services
  getServices: async () => {
    const response = await fetch(`${API_BASE_URL}/services`)
    return response.json()
  },

  getService: async (id) => {
    const response = await fetch(`${API_BASE_URL}/services/${id}`)
    return response.json()
  },

  createService: async (data) => {
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  updateService: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  deleteService: async (id) => {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: "DELETE",
    })
    return response.json()
  },
}
