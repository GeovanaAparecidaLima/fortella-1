const telaLista = document.getElementById('tela-lista');
const telaNovo = document.getElementById('tela-novo');
const btnAdicionar = document.getElementById('btnAdicionar');
const formContato = document.getElementById('formContato');
const listaContatos = document.getElementById('listaContatos');

let contatos = [];

btnAdicionar.addEventListener('click', () => {
  telaLista.classList.remove('ativa');
  telaNovo.classList.add('ativa');
});

formContato.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const sobrenome = document.getElementById('sobrenome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const celular = document.getElementById('celular').value.trim();

  if (nome && telefone) {
    contatos.push({ nome, sobrenome, telefone, celular });
    atualizarLista();
    formContato.reset();
    telaNovo.classList.remove('ativa');
    telaLista.classList.add('ativa');
  }
});

function atualizarLista() {
  listaContatos.innerHTML = '';
  contatos.forEach((c, i) => {
    const div = document.createElement('div');
    div.classList.add('contato');
    div.innerHTML = `
      <span><strong>${c.nome} ${c.sobrenome}</strong></span>
      <span>${c.telefone}</span>
      <button onclick="removerContato(${i})">Remover ></button>
    `;
    listaContatos.appendChild(div);
  });
}

function removerContato(i) {
  contatos.splice(i, 1);
  atualizarLista();
}
