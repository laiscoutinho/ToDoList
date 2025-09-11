const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/auth";

export async function loginUser(email, password) {
  try {
    const { getAuth, signInWithEmailAndPassword } = await import("firebase/auth");
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao fazer login");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}

export async function registerUser(email, password) {
  try {
    const { getAuth, createUserWithEmailAndPassword } = await import("firebase/auth");
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();

    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao criar conta");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}