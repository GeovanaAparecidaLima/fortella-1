// Captura o formulário
const form = document.getElementById("loginForm");
const btnCadastrar = document.getElementById("btnCadastrar");

// Evento de login
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Impede o reload da página

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (email === "" || senha === "") {
    alert("Por favor, preencha todos os campos!");
  } else {
    alert("Login realizado com sucesso!");
    // Aqui você pode redirecionar para outra página
    // window.location.href = "dashboard.html";
  }
});

// Evento de cadastro
btnCadastrar.addEventListener("click", function() {
  alert("Você será redirecionado para a tela de cadastro!");
  // Exemplo de redirecionamento
  // window.location.href = "cadastro.html";
});
