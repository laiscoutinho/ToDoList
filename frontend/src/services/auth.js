const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const loginUser = async (email, password) => {
  console.log("Login:", email, password);
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })  
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Erro no login');
  }

  return data;  
};

export const registerUser = async (email, password) => {
  console.log("Cadastro:", email, password);
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }) 
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Erro ao criar conta');
  }

  return data; 
};

export const handleLogout = (navigate) => {
  localStorage.removeItem('idToken');
  navigate('/login');
};
