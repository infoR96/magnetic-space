"use client";

import React, { useState } from "react";

// Puedes eliminar esta interfaz si no usas props
// interface RegisterFormProps {}

const RegisterForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Resetea los mensajes de error o éxito
    setMessage(null);
    setPasswordError(null);

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    const user = { name, email, password };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setMessage("User created successfully!");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Something went wrong.");
      }
    } catch {
      setMessage("Failed to create user."); // Eliminado el error no usado
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Register</h2>

        {message && <p style={styles.message}>{message}</p>}

        <div style={styles.inputContainer}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
          {passwordError && <p style={styles.error}>{passwordError}</p>}
        </div>

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

// Estilos en línea
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f0f0",
  },
  form: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "300px",
    textAlign: "center" as const, // Eliminado 'as "center"' para usar as const directo
  },
  heading: {
    marginBottom: "1rem",
    fontSize: "1.5rem",
    color: "#333",
  },
  inputContainer: {
    marginBottom: "1rem",
    textAlign: "left" as const, // Eliminado 'as "left"'
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "1rem",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#0070f3",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
  },
  message: {
    marginBottom: "1rem",
    fontSize: "1rem",
    color: "green",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
  },
};

export default RegisterForm;
