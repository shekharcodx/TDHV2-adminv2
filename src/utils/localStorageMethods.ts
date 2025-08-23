import Cookies from "js-cookie";

const setItem = (key: string, value: string | number): void => {
  localStorage.setItem(key, String(value));
};

const setObjectInLocalStorage = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = <T>(key: string): T | null => {
  const val = localStorage.getItem(key);
  return val ? (JSON.parse(val) as T) : null;
};

const getSingleItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

const setToken = (token: string): void => {
  Cookies.set("token", token, { expires: 1 });
};

const getToken = (): string | null => {
  return Cookies.get("token") || null;
};

const removeToken = () => {
  Cookies.remove("token");
};

const setUser = (user: string): void => {
  Cookies.set("user", user, { expires: 1 });
};

const getUser = (): string | null => {
  return Cookies.get("user") || null;
};

const removeUser = () => {
  Cookies.remove("user");
};

const setUserRole = (role: number): void => {
  Cookies.set("role", role.toString(), { expires: 1 });
};

const getUserRole = (): number | null => {
  const role = Cookies.get("role");
  return role ? parseInt(role, 10) : null;
};

const removeUserRole = () => {
  Cookies.remove("k_role");
};

export {
  setItem,
  getItem,
  getSingleItem,
  setObjectInLocalStorage,
  removeItem,
  setToken,
  getToken,
  setUser,
  getUser,
  removeUser,
  removeToken,
  setUserRole,
  getUserRole,
  removeUserRole,
};
