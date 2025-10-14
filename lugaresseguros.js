function abrirTela(idTela) {
    // esconde todas as telas
    document.querySelectorAll(".tela").forEach(t => t.classList.add("escondido"));
    // mostra a tela escolhida
    document.getElementById(idTela).classList.remove("escondido");
  }
  
  function abrirTela(idTela) {
    // esconde todas as telas
    document.querySelectorAll(".tela").forEach(t => t.classList.add("escondido"));
    // mostra a tela escolhida
    document.getElementById(idTela).classList.remove("escondido");
  }
  
  // Ação do botão "Sair"
  document.addEventListener("DOMContentLoaded", () => {
    const btnSair = document.querySelector(".btn-sair");
    
    if (btnSair) {
      btnSair.addEventListener("click", () => {
        alert("Você saiu da conta!");
        // Aqui você pode redirecionar para login, se quiser:
        // abrirTela('tela-config');  // volta pro início
        // ou window.location.href = "login.html"; // redireciona para outra página
      });
    }
  });
  