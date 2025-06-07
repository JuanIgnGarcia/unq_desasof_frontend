import { useState, useEffect, KeyboardEvent } from "react";
import API, { handleApiError } from "../services/API";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [insUsername, setInsUsername] = useState<string>("");
  const [insPassword, setInsPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }, []);

  const handleEnter = (
    event: KeyboardEvent<HTMLInputElement | HTMLButtonElement>
  ): void => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = (): void => {
    API.login({
      username: insUsername,
      password: insPassword,
    })
      .then((res) => {
        if (!res) return;

        toast.success("Logeado exitosamente");

        const token = res.data.token;
        const id = res.data.id;

        localStorage.setItem("token", token);
        localStorage.setItem("id", id);

        navigate("/");
      })
      .catch((error) => {
        toast.error(handleApiError(error));
      });
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
        fontFamily: "Arial, sans-serif",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "3rem",
          borderRadius: "15px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            fontSize: "2rem",
          }}
        >
          Iniciar Sesión
        </h1>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
            Username
          </label>
          <input
            required
            type="text"
            value={insUsername}
            onChange={(e) => setInsUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              marginTop: "0.5rem",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
            Contraseña
          </label>
          <div style={{ display: "flex", marginTop: "0.5rem" }}>
            <input
              required
              type={showPassword ? "text" : "password"}
              value={insPassword}
              onChange={(e) => setInsPassword(e.target.value)}
              onKeyDown={handleEnter}
              style={{
                flex: 1,
                padding: "0.75rem",
                fontSize: "1rem",
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
                border: "1px solid #ccc",
                borderRight: "none",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                padding: "0.75rem 1rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderLeft: "none",
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
                background: "#e0e0e0",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            className="button-66"
            role="button"
            onClick={handleLogin}
            onKeyDown={handleEnter}
          >
            Ingresar
          </button>
        </div>
        <span>
          No tenes una cuenta? <a href="/register">Regístrate</a>{" "}
        </span>
      </div>
    </main>
  );
};

export default Login;
