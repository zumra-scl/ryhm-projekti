const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = form.querySelector("input[name='username']").value;
  const email = form.querySelector("input[name='email']").value;
  const password = form.querySelector("input[name='password']").value;

  const res = await fetch("http://localhost:3000/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();

  alert(data.message || data.error);
});
