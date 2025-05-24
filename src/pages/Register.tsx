import { useState, KeyboardEvent, ChangeEvent } from "react";
import API, { handleApiError } from "../services/API";
import "../App.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [newUsername, setUsername] = useState<string>("");
  const [newPassword, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [samePassword, setSamePassword] = useState(true);

  // Estados para mostrar/ocultar passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setSamePassword(pwd === confirmPassword);
  };

  const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const confPwd = e.target.value;
    setConfirmPassword(confPwd);
    setSamePassword(confPwd === newPassword);
  };

  const handleEnter = (
    event: KeyboardEvent<HTMLInputElement | HTMLButtonElement>
  ) => {
    if (event.key === "Enter") {
      handleRegister();
    }
  };

  const handleRegister = () => {
    if (!samePassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    API.register({
      username: newUsername,
      password: newPassword,
    })
      .then((res) => {
        toast.success("Registrado exitosamente");

        const token = res.data.token;
        localStorage.setItem("token", token);

        navigate("/");
      })
      .catch((res) => {
        toast.error(handleApiError(res));
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
        className="register-box"
        style={{
          background: "white",
          padding: "3rem",
          borderRadius: "15px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <div>
          <h1
            className="header"
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              fontSize: "2rem",
            }}
          >
            Registrarse
          </h1>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
            Username{" "}
          </label>
          <input
            required
            type="text"
            className="input"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            value={newUsername}
            onChange={(e) => setUsername(e.target.value)}
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
              value={newPassword}
              onChange={handleChangePassword}
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

        <div style={{ marginBottom: "2rem" }}>
          <label style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
            Confirmar Contraseña
          </label>
          <div style={{ display: "flex", marginTop: "0.5rem" }}>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
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
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          {!samePassword && (
            <span style={{ color: "red", fontSize: "13px" }}>
              * Las contraseñas no coinciden
            </span>
          )}
        </div>

        <div className="register-button" style={{ textAlign: "center" }}>
          <button
            className="button-66"
            role="button"
            onClick={handleRegister}
            onKeyDown={handleEnter}
          >
            Registrar
          </button>
        </div>

        <hr style={{ margin: "20px 0" }} />
        <div style={{ textAlign: "center" }}>
          Ya tenés una cuenta? <a href="/login">Iniciá sesión</a>
        </div>
      </div>
    </main>
  );
};

export default Register;
