const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("input[name='email']").value;
  const password = document.querySelector("input[name='password']").value;

  const res = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (data.error) {
    alert(data.error);
    return;
  }

  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
    alert("Login successful");
    window.location.href = "/";
  }
});
