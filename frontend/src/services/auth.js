const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Erro ao fazer login")
    }
    return await response.json()  
  } catch (err) {
    throw err
  }
}

export async function registerUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Erro ao criar conta")
    }
    return await response.json()  
  } catch (err) {
    throw err
  }
}
