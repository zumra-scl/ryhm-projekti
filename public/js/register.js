const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); 

  const username = form.querySelector("input[name='username']").value;
  const email = form.querySelector("input[name='email']").value;
  const password = form.querySelector("input[name='password']").value;

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  const res = await fetch("http://localhost:3000/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();

  if (data.error) {
    alert(data.error);
    return;
  }

  alert("Account created successfully");
  window.location.href = "login.html";
});
