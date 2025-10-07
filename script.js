function mudarTela(id) {
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    document.getElementById(id).classList.add('ativa');
  }
  
  function voltarInicio() {
    mudarTela('tela-denuncias');
  }
  