import axios, { AxiosRequestConfig, Method, AxiosResponse } from "axios";

const getToken = (): string => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : "";
};

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] = "application/json";

const request = async (
  type: Method,
  path: string,
  body?: Record<string, any>
): Promise<AxiosResponse<any>> => {
  const config: AxiosRequestConfig = {
    url: path,
    method: type,
    data: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    withCredentials: true,
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (error: any) {
    if (error.response?.status === 403) {
      window.history.replaceState(null, "", "/login");
      window.location.href = "/login";
    }
    throw error;
  }
};

export const handleApiError = (error: any): string => {
  if (error.response) {
    const status = error.response.status;
    if (status >= 400 && status < 500) {
      return "Error del cliente.";
    } else if (status >= 500) {
      return "Error del servidor. Consulte al administrador.";
    } else {
      return "Error inesperado.";
    }
  } else if (error.request) {
    return "No se pudo conectar con el servidor.";
  } else {
    return "Error desconocido.";
  }
};

const API = {
  login: (body: LoginRegisterBody) => request("post", "/user/login", body),
  register: (body: LoginRegisterBody) => request("post", "/user/buyer", body),
  registerAdmin: (body: LoginRegisterBody) =>
    request("post", "/user/admin", body),
  top5User: () => request("get", "/user/top5/users"),
  Top5Shopped: () => request("get", "/user/top5/shopped"),
  Top5Favorites: () => request("get", "/user/top5/favorites"),
  users: () => request("get", "/user/all"),
  shoppeds: () => request("get", "/shopped/all"),
  favorites: () => request("get", "/favorites/all"),
  search_product: (query: string) =>
    request("get", `/ml/search?query=${encodeURIComponent(query)}`),
};

// Types
interface LoginRegisterBody {
  username: string;
  password: string;
}

export default API;
