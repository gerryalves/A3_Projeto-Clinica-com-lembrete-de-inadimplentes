document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  if (usuario === "admin" && senha === "clinicaVida2025") {
    sessionStorage.setItem("logado", "true");
    window.location.href = "index.html";
  } else {
    alert("Usuário ou senha inválidos");
  }
});