function loginUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem("user");
}

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}
