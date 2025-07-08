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
  }, []);

  const handleEnter = (event: KeyboardEvent<HTMLInputElement | HTMLButtonElement>): void => {
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

        localStorage.setItem("token", token);

        navigate("/");
      })
      .catch((error) => {
        toast.error(handleApiError(error));
      });
  };

  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-white p-8">
      <div id="login-card" className="bg-gray-200 p-12 rounded-xl shadow-2xl shadow-gray-500 w-full max-w-xl space-y-8">
        <h1 className="text-center text-4xl">Iniciar Sesión</h1>

        <div id="username-input-section">
          <label className="font-bold text-lg block mb-2">Username</label>
          <input
            placeholder="Ingresá tu usuario"
            required
            type="text"
            value={insUsername}
            onChange={(e) => setInsUsername(e.target.value)}
            className="bg-white w-full p-3 text-base rounded-lg border-gray-400 border"
          />
        </div>

        <div id="password-input-section">
          <label className="font-bold text-lg block mb-2">Contraseña</label>
          <div className="flex">
            <input
              placeholder="Ingresá tu contraseña"
              required
              type={showPassword ? "text" : "password"}
              value={insPassword}
              onChange={(e) => setInsPassword(e.target.value)}
              onKeyDown={handleEnter}
              className="bg-white flex-1 p-3 text-base rounded-l-lg border-gray-400 border border-r-0"
            />
            <button
              type="button"
              id="show-password-button"
              onClick={() => setShowPassword(!showPassword)}
              className="bg-gray-300 px-4 py-3 text-base border border-gray-400 border-l-0 rounded-r-lg cursor-pointer font-bold"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div>
          <button className="button-66" role="button" onClick={handleLogin} onKeyDown={handleEnter}>
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
