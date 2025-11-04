/* ========== DADOS INICIAIS (simulados) ========== */
let locaisData = [
  { id: 1, nome: "Hospital Central", endereco: "Rua X, 124", categoria: "Hospital", status: "Ativo" },
  { id: 2, nome: "Escola Modelo", endereco: "Rua X, 320", categoria: "Escola", status: "Inativo" },
  { id: 3, nome: "Delegacia Norte", endereco: "Rua das Flores, 55", categoria: "Delegacia", status: "Ativo" }
];

let denunciasData = [
  { id: 124, datetime: "12/09/2025 14:30", tipo: "Violência", status: "Aberta", detalhes: "Relato A" },
  { id: 125, datetime: "25/09/2025 16:30", tipo: "Assédio", status: "Encaminhada", detalhes: "Relato B" },
  { id: 126, datetime: "03/10/2025 09:45", tipo: "Abandono", status: "Aberta", detalhes: "Relato C" }
];

let usuariosData = [
  { id: 1, nome: "Ana Silva", email: "ana@exemplo.com", papel: "Admin", status: "Ativo" },
  { id: 2, nome: "João Souza", email: "joao@exemplo.com", papel: "Usuário", status: "Suspenso" }
];

/* ========== UTILIDADES ========== */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const toEl = html => { const tmp = document.createElement('div'); tmp.innerHTML = html.trim(); return tmp.firstChild; };

/* ========== RENDERIZAÇÃO TABELAS ========== */
function renderLocais() {
  const tbody = $("#tabelaLocais tbody");
  tbody.innerHTML = "";
  locaisData.forEach(l => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${l.nome}</td>
      <td>${l.endereco}</td>
      <td>${l.categoria}</td>
      <td><span class="badge ${l.status === 'Ativo' ? 'ativo' : 'inativo'}">${l.status}</span></td>
      <td class="acoes">
        <button class="icon-btn editar-local" data-id="${l.id}" title="Editar"><i class="fa-solid fa-pen"></i></button>
        <button class="icon-btn deletar-local" data-id="${l.id}" title="Excluir"><i class="fa-solid fa-trash"></i></button>
        <button class="icon-btn toggle-status-local" data-id="${l.id}" title="Alternar status"><i class="fa-solid fa-toggle-on"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderDenuncias() {
  const tbody = $("#tabelaDenuncias tbody");
  tbody.innerHTML = "";
  denunciasData.forEach(d => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="checkbox" class="selectDenuncia" data-id="${d.id}"></td>
      <td>#${d.id}</td>
      <td>${d.datetime}</td>
      <td>${d.tipo}</td>
      <td><span class="badge ${d.status.toLowerCase().includes('encamin') ? 'encaminhada' : 'aberta'}">${d.status}</span></td>
      <td class="acoes">
        <button class="icon-btn editar-denuncia" data-id="${d.id}" title="Editar"><i class="fa-solid fa-pen"></i></button>
        <button class="icon-btn deletar-denuncia" data-id="${d.id}" title="Excluir"><i class="fa-solid fa-trash"></i></button>
        <button class="icon-btn encaminhar-denuncia" data-id="${d.id}" title="Encaminhar"><i class="fa-solid fa-paper-plane"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderUsuarios() {
  const tbody = $("#tabelaUsuarios tbody");
  tbody.innerHTML = "";
  usuariosData.forEach(u => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${u.nome}</td>
      <td>${u.email}</td>
      <td>${u.papel}</td>
      <td><span class="badge ${u.status === 'Ativo' ? 'ativo' : 'inativo'}">${u.status}</span></td>
      <td class="acoes">
        <button class="icon-btn editar-usuario" data-id="${u.id}" title="Editar"><i class="fa-solid fa-pen"></i></button>
        <button class="icon-btn deletar-usuario" data-id="${u.id}" title="Excluir"><i class="fa-solid fa-trash"></i></button>
        <button class="icon-btn toggle-status-usuario" data-id="${u.id}" title="Alternar status"><i class="fa-solid fa-user-slash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

/* ========== FILTRAGEM E BUSCA ========== */
function applyFilters() {
  // LOCAIS
  const qLoc = $("#searchLocais").value.toLowerCase();
  const cat = $("#filtroCategoria").value;
  const st = $("#filtroStatus").value;
  $("#tabelaLocais tbody").querySelectorAll("tr").forEach((tr, idx) => {
    const l = locaisData[idx];
    const okQ = !qLoc || l.nome.toLowerCase().includes(qLoc) || l.endereco.toLowerCase().includes(qLoc);
    const okCat = !cat || l.categoria === cat;
    const okSt = !st || l.status === st;
    tr.style.display = (okQ && okCat && okSt) ? "" : "none";
  });

  // DENÚNCIAS
  const qDen = $("#searchDenuncias").value.toLowerCase();
  const filtroStatusDen = $("#filtroStatusDen").value;
  $("#tabelaDenuncias tbody").querySelectorAll("tr").forEach((tr, idx) => {
    const d = denunciasData[idx];
    const combined = (`#${d.id} ${d.tipo} ${d.status} ${d.datetime} ${d.detalhes||''}`).toLowerCase();
    const okQ = !qDen || combined.includes(qDen);
    const okSt = !filtroStatusDen || d.status === filtroStatusDen;
    tr.style.display = (okQ && okSt) ? "" : "none";
  });

  // USUÁRIOS
  const qUsr = $("#searchUsuarios").value.toLowerCase();
  const papel = $("#filtroPapel").value;
  $("#tabelaUsuarios tbody").querySelectorAll("tr").forEach((tr, idx) => {
    const u = usuariosData[idx];
    const okQ = !qUsr || u.nome.toLowerCase().includes(qUsr) || u.email.toLowerCase().includes(qUsr);
    const okP = !papel || u.papel === papel;
    tr.style.display = (okQ && okP) ? "" : "none";
  });
}

/* ========== EVENTOS GLOBAIS E CONTROLES ========== */
function setupEventListeners() {
  // abas
  $$(".tab").forEach(btn => btn.addEventListener("click", e => {
    $$(".tab").forEach(t=>t.classList.remove("active"));
    btn.classList.add("active");
    const name = btn.dataset.tab;
    $$(".tab-panel").forEach(p => p.removeAttribute("data-visible"));
    $("#" + name).setAttribute("data-visible", "");
  }));

  // filtros e buscas
  $("#searchLocais").addEventListener("input", applyFilters);
  $("#filtroCategoria").addEventListener("change", applyFilters);
  $("#filtroStatus").addEventListener("change", applyFilters);

  $("#searchDenuncias").addEventListener("input", applyFilters);
  $("#filtroStatusDen").addEventListener("change", applyFilters);
  $("#searchUsuarios").addEventListener("input", applyFilters);
  $("#filtroPapel")?.addEventListener("change", applyFilters);

  // atualizar (simulação)
  $("#atualizarLocais").addEventListener("click", async () => {
    const btn = $("#atualizarLocais");
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-rotate fa-spin"></i> Atualizando...';
    await new Promise(r => setTimeout(r, 700));
    btn.innerHTML = '<i class="fa-solid fa-rotate"></i> Atualizar';
    btn.disabled = false;
    renderLocais();
    applyFilters();
  });
  $("#atualizarDenuncias").addEventListener("click", async () => {
    const btn = $("#atualizarDenuncias");
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-rotate fa-spin"></i> Atualizando...';
    await new Promise(r => setTimeout(r, 700));
    btn.innerHTML = '<i class="fa-solid fa-rotate"></i> Atualizar';
    btn.disabled = false;
    renderDenuncias();
    applyFilters();
  });

  // abrir modais
  $("#abrirModalLocal").addEventListener("click", () => abrirModalLocal());
  $("#abrirModalDenuncia").addEventListener("click", () => abrirModalDenuncia());
  $("#abrirModalUsuario").addEventListener("click", () => abrirModalUsuario());

  // delegação para ações nas tabelas (editar/excluir/toggle)
  document.addEventListener("click", (e) => {
    const el = e.target.closest("button, .icon-btn");
    if (!el) return;

    // LOCAIS
    if (el.matches(".editar-local")) {
      const id = +el.dataset.id; abrirModalLocal(id);
    }
    if (el.matches(".deletar-local")) {
      const id = +el.dataset.id; if (confirm("Excluir local?")) { locaisData = locaisData.filter(x=>x.id!==id); renderLocais(); applyFilters(); }
    }
    if (el.matches(".toggle-status-local")) {
      const id = +el.dataset.id;
      const it = locaisData.find(x=>x.id===id); if (it) { it.status = it.status === "Ativo" ? "Inativo" : "Ativo"; renderLocais(); applyFilters(); }
    }

    // DENÚNCIAS
    if (el.matches(".editar-denuncia")) { const id=+el.dataset.id; abrirModalDenuncia(id); }
    if (el.matches(".deletar-denuncia")) { const id=+el.dataset.id; if(confirm("Excluir denúncia?")){ denunciasData = denunciasData.filter(x=>x.id!==id); renderDenuncias(); applyFilters(); } }

    if (el.matches(".encaminhar-denuncia")) {
      // individual encaminhar: abrir modal que redireciona pra página de encaminhamento
      const id=+el.dataset.id;
      const d=denunciasData.find(x=>x.id===id);
      if(d) abrirModalEncaminhar([d]);
    }

    // USUÁRIOS
    if (el.matches(".editar-usuario")) { const id=+el.dataset.id; abrirModalUsuario(id); }
    if (el.matches(".deletar-usuario")) { const id=+el.dataset.id; if(confirm("Excluir usuário?")){ usuariosData = usuariosData.filter(x=>x.id!==id); renderUsuarios(); applyFilters(); } }
    if (el.matches(".toggle-status-usuario")) { const id=+el.dataset.id; const u=usuariosData.find(x=>x.id===id); if(u){ u.status = u.status === 'Ativo' ? 'Suspenso' : 'Ativo'; renderUsuarios(); applyFilters(); } }
  });

  // export CSV denúncias
  $("#exportarDenuncias").addEventListener("click", exportarDenuncias);

  // modal fechar
  $("#modalClose").addEventListener("click", fecharModal);
  $("#modal").addEventListener("click", e => { if (e.target === $("#modal")) fecharModal(); });

  // seleção múltipla / encaminhar selecionadas
  $("#checkAllDen").addEventListener("change", (e) => {
    document.querySelectorAll(".selectDenuncia").forEach(chk => chk.checked = e.target.checked);
  });

  $("#btnEncaminharSelecionadas").addEventListener("click", () => {
    const selecionadas = [...document.querySelectorAll(".selectDenuncia:checked")].map(chk => {
      return denunciasData.find(d => d.id == chk.dataset.id);
    }).filter(Boolean);

    if (selecionadas.length === 0) return alert("Nenhuma denúncia selecionada.");
    abrirModalEncaminhar(selecionadas);
  });
}

/* ========== MODAIS: LOCAIS ========== */
function abrirModalLocal(id) {
  const isEdit = !!id;
  const obj = locaisData.find(x=>x.id===id) || { nome:'', endereco:'', categoria:'', status:'Ativo' };
  const body = `
    <div>
      <div class="form-row"><label>Nome</label><input id="m_nome" class="input" value="${escapeHtml(obj.nome)}"></div>
      <div class="form-row"><label>Endereço</label><input id="m_endereco" class="input" value="${escapeHtml(obj.endereco)}"></div>
      <div class="form-row" style="display:flex; gap:8px;">
        <div style="flex:1">
          <label>Categoria</label>
          <select id="m_categoria" class="form-control">
            <option ${obj.categoria===''?'selected':''} value="">Selecione...</option>
            <option ${obj.categoria==='Hospital'?'selected':''}>Hospital</option>
            <option ${obj.categoria==='Escola'?'selected':''}>Escola</option>
            <option ${obj.categoria==='Delegacia'?'selected':''}>Delegacia</option>
            <option ${obj.categoria==='Farmácia'?'selected':''}>Farmácia</option>
          </select>
        </div>
        <div style="width:140px">
          <label>Status</label>
          <select id="m_status" class="form-control">
            <option ${obj.status==='Ativo'?'selected':''}>Ativo</option>
            <option ${obj.status==='Inativo'?'selected':''}>Inativo</option>
          </select>
        </div>
      </div>
    </div>
  `;
  const footer = `
    <button class="btn light" id="cancelModal">Cancelar</button>
    <button class="btn primary" id="saveLocal">${isEdit ? 'Salvar' : 'Cadastrar'}</button>
  `;
  abrirModalInterno(isEdit ? "Editar Local" : "Cadastrar Local", body, footer);

  $("#cancelModal").addEventListener("click", fecharModal);
  $("#saveLocal").addEventListener("click", () => {
    const nome = $("#m_nome").value.trim();
    const endereco = $("#m_endereco").value.trim();
    const categoria = $("#m_categoria").value;
    const status = $("#m_status").value;
    if (!nome || !endereco) return alert("Preencha nome e endereço.");
    if (isEdit) {
      const it = locaisData.find(x=>x.id===id);
      Object.assign(it, { nome, endereco, categoria, status });
    } else {
      const novo = { id: (Date.now()%100000), nome, endereco, categoria, status };
      locaisData.unshift(novo);
    }
    renderLocais(); applyFilters(); fecharModal();
  });
}

/* ========== MODAIS: DENÚNCIAS ========== */
function abrirModalDenuncia(id) {
  const isEdit = !!id;
  const obj = denunciasData.find(x=>x.id===id) || { id: (Math.floor(100+Math.random()*900)), datetime:'', tipo:'', status:'Aberta', detalhes:'' };
  const body = `
    <div>
      <div class="form-row"><label>Número</label><input id="md_num" class="input" value="${obj.id}" ${isEdit?'disabled':''}></div>
      <div class="form-row"><label>Data/Hora</label><input id="md_dt" class="input" value="${escapeHtml(obj.datetime)}" placeholder="dd/mm/aaaa hh:mm"></div>
      <div class="form-row"><label>Tipo</label>
        <select id="md_tipo" class="form-control">
          <option ${obj.tipo===''?'selected':''} value="">Selecione...</option>
          <option ${obj.tipo==='Violência'?'selected':''}>Violência</option>
          <option ${obj.tipo==='Assédio'?'selected':''}>Assédio</option>
          <option ${obj.tipo==='Furto'?'selected':''}>Furto</option>
        </select>
      </div>
      <div class="form-row"><label>Status</label>
        <select id="md_status" class="form-control">
          <option ${obj.status==='Aberta'?'selected':''}>Aberta</option>
          <option ${obj.status==='Encaminhada'?'selected':''}>Encaminhada</option>
          <option ${obj.status==='Fechada'?'selected':''}>Fechada</option>
        </select>
      </div>
      <div class="form-row"><label>Detalhes</label><textarea id="md_detalhes">${escapeHtml(obj.detalhes||'')}</textarea></div>
    </div>
  `;
  const footer = `<button class="btn light" id="cancelModal">Cancelar</button><button class="btn primary" id="saveDen">Salvar</button>`;
  abrirModalInterno(isEdit ? "Editar Denúncia" : "Nova Denúncia", body, footer);

  $("#cancelModal").addEventListener("click", fecharModal);
  $("#saveDen").addEventListener("click", () => {
    const idnum = parseInt($("#md_num").value);
    const datetime = $("#md_dt").value.trim();
    const tipo = $("#md_tipo").value;
    const status = $("#md_status").value;
    const detalhes = $("#md_detalhes").value.trim();
    if (!idnum || !datetime || !tipo) return alert("Preencha número, data/hora e tipo.");
    if (isEdit) {
      const it = denunciasData.find(x=>x.id===id);
      Object.assign(it, { id: idnum, datetime, tipo, status, detalhes });
    } else {
      denunciasData.unshift({ id: idnum, datetime, tipo, status, detalhes });
    }
    renderDenuncias(); applyFilters(); fecharModal();
  });
}

/* ========== MODAIS: USUÁRIOS ========== */
function abrirModalUsuario(id) {
  const isEdit = !!id;
  const obj = usuariosData.find(x=>x.id===id) || { nome:'', email:'', papel:'Usuário', status:'Ativo' };
  const body = `
    <div>
      <div class="form-row"><label>Nome</label><input id="mu_nome" class="input" value="${escapeHtml(obj.nome)}"></div>
      <div class="form-row"><label>E-mail</label><input id="mu_email" class="input" value="${escapeHtml(obj.email)}"></div>
      <div class="form-row" style="display:flex; gap:8px;">
        <div style="flex:1">
          <label>Papel</label>
          <select id="mu_papel" class="form-control">
            <option ${obj.papel==='Admin'?'selected':''}>Admin</option>
            <option ${obj.papel==='Moderador'?'selected':''}>Moderador</option>
            <option ${obj.papel==='Usuário'?'selected':''}>Usuário</option>
          </select>
        </div>
        <div style="width:140px">
          <label>Status</label>
          <select id="mu_status" class="form-control">
            <option ${obj.status==='Ativo'?'selected':''}>Ativo</option>
            <option ${obj.status==='Suspenso'?'selected':''}>Suspenso</option>
          </select>
        </div>
      </div>
    </div>
  `;
  const footer = `<button class="btn light" id="cancelModal">Cancelar</button><button class="btn primary" id="saveUsr">${isEdit?'Salvar':'Criar'}</button>`;
  abrirModalInterno(isEdit ? "Editar Usuário" : "Novo Usuário", body, footer);

  $("#cancelModal").addEventListener("click", fecharModal);
  $("#saveUsr").addEventListener("click", () => {
    const nome = $("#mu_nome").value.trim();
    const email = $("#mu_email").value.trim();
    const papel = $("#mu_papel").value;
    const status = $("#mu_status").value;
    if (!nome || !email) return alert("Preencha nome e e-mail.");
    if (isEdit) {
      const it = usuariosData.find(x=>x.id===id); Object.assign(it,{nome,email,papel,status});
    } else {
      usuariosData.unshift({ id: (Date.now()%100000), nome, email, papel, status });
    }
    renderUsuarios(); applyFilters(); fecharModal();
  });
}

/* ========== MODAL GENERICO HELPERS ========== */
function abrirModalInterno(title, bodyHTML, footerHTML) {
  $("#modalTitle").textContent = title;
  $("#modalBody").innerHTML = bodyHTML;
  $("#modalFooter").innerHTML = footerHTML;
  $("#modal").classList.remove("hidden");
}

function fecharModal() {
  $("#modal").classList.add("hidden");
  $("#modalBody").innerHTML = "";
  $("#modalFooter").innerHTML = "";
}

/* ========== EXPORTAR DENÚNCIAS ========== */
function exportarDenuncias() {
  const rows = denunciasData.map(d => [d.id, d.datetime, d.tipo, d.status, (d.detalhes||"")]);
  const csv = [["ID","Data/Hora","Tipo","Status","Detalhes"], ...rows].map(r => r.map(cell=>`"${String(cell).replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `denuncias_export_${new Date().toISOString().slice(0,10)}.csv`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

/* ========== AUXILIARES ========== */
function escapeHtml(str='') { return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[s]); }

/* ========== NOVA FUNÇÃO: ABRIR MODAL E REDIRECIONAR PARA encaminhar_denuncia.html ========== */
function abrirModalEncaminhar(listaDenuncias){
  // cria o select de órgãos
  const body = `
    <p>Encaminhar ${listaDenuncias.length>1 ? `${listaDenuncias.length} denúncias` : `denúncia #${listaDenuncias[0].id}`} para o poder público:</p>
    <div class="form-row">
      <label>Selecione o órgão público:</label>
      <select id="orgaoSelect" class="form-control">
        <option value="">Selecione...</option>
        <option>Polícia Civil</option>
        <option>Polícia Militar</option>
        <option>Conselho Tutelar</option>
        <option>Secretaria de Segurança</option>
        <option>Ministério Público</option>
      </select>
    </div>
    <div class="form-row">
      <label>Observação (opcional)</label>
      <textarea id="obsEncaminhamento" placeholder="Observações..." class="input"></textarea>
    </div>
  `;
  const footer = `
    <button class="btn light" id="cancelarEnvio">Cancelar</button>
    <button class="btn primary" id="confirmarEnvio">Encaminhar</button>
  `;
  abrirModalInterno("Encaminhar denúncia(s)", body, footer);

  $("#cancelarEnvio").addEventListener("click", fecharModal);

  // Ao confirmar, redirecionamos para encaminhar_denuncia.html com query params (ids e orgao)
  $("#confirmarEnvio").addEventListener("click", () => {
    const orgao = $("#orgaoSelect").value;
    const obs = encodeURIComponent($("#obsEncaminhamento").value || "");
    if (!orgao) return alert("Selecione um órgão público.");
    // atualizar status localmente
    listaDenuncias.forEach(d => d.status = `Encaminhada para ${orgao}`);
    renderDenuncias();
    applyFilters();
    fecharModal();

    // construir query string com IDs e órgão
    const ids = listaDenuncias.map(d => d.id).join(',');
    const qs = `?ids=${encodeURIComponent(ids)}&orgao=${encodeURIComponent(orgao)}&obs=${obs}`;
    // redireciona para a página de encaminhamento (simulada)
    window.location.href = `encaminhar_denuncia.html${qs}`;
  });
}

/* ========== INICIALIZAÇÃO ========== */
function init() {
  renderLocais(); renderDenuncias(); renderUsuarios();
  setupEventListeners();
  applyFilters();
}

init();

