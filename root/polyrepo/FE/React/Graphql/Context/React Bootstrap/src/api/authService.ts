

const logout = () => {
  localStorage.clear();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") as string);
};

const authService = {
  logout,
  getCurrentUser,
};

export default authService;