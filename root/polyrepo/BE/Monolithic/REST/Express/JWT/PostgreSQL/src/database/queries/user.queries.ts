export const createUserQuery =
  "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";
export const getUserInfoQuery = "SELECT * FROM users WHERE email = $1";
export const checkIfEmailExists = "SELECT u FROM users u WHERE u.user_email = $1";

