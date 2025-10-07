function enviarDenuncia() {

    let descricao = document.getElementById("descricao").value;
  
    if (descricao.trim() === "") {
  
      alert("Por favor, descreva o ocorrido antes de enviar.");
  
      return;
  
    }
  
    document.getElementById("tela1").style.display = "none";
  
    document.getElementById("tela2").style.display = "flex";
  
  }
  
  function mostrarInformacoes() {
  
    document.getElementById("tela2").style.display = "none";
  
    document.getElementById("tela3").style.display = "flex";
  
  }
   
