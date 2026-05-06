function loginUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem("user");
}

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

// ✅ NAVBAR UPDATE
function updateNavbar() {
  const user = getUser();

  const userInfo = document.getElementById("userInfo");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!user) {
    if (userInfo) userInfo.innerText = "";
    if (logoutBtn) logoutBtn.style.display = "none";
    return;
  }

  if (userInfo) userInfo.innerText = "👤 " + user.username;
  if (logoutBtn) logoutBtn.style.display = "inline";

  logoutBtn.onclick = () => {
    logoutUser();
    location.reload();
  };
}

document.addEventListener("DOMContentLoaded", updateNavbar);
