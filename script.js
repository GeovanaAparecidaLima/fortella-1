document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.querySelector('.login-button');
    const forgotLink = document.querySelector('.forgot-link');
    const registerLink = document.querySelector('.register-text');

    // Validação de email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validação de senha
    function isValidPassword(password) {
        return password.length >= 6;
    }

    // Feedback visual para inputs
    function addInputFeedback(input, isValid) {
        if (isValid) {
            input.style.borderLeft = '4px solid #4CAF50';
            input.style.background = '#f0fff0';
        } else {
            input.style.borderLeft = '4px solid #f44336';
            input.style.background = '#fff5f5';
        }
    }

    // Remover feedback visual
    function removeInputFeedback(input) {
        input.style.borderLeft = 'none';
        input.style.background = '#f8f8f8';
    }

    // Validação em tempo real do email
    emailInput.addEventListener('input', function() {
        const email = this.value.trim();
        if (email.length > 0) {
            addInputFeedback(this, isValidEmail(email));
        } else {
            removeInputFeedback(this);
        }
    });

    // Validação em tempo real da senha
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        if (password.length > 0) {
            addInputFeedback(this, isValidPassword(password));
        } else {
            removeInputFeedback(this);
        }
    });

    // Remover feedback quando o input perde o foco
    emailInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            removeInputFeedback(this);
        }
    });
    passwordInput.addEventListener('blur', function() {
        if (this.value === '') {
            removeInputFeedback(this);
        }
    });

    // Efeito de loading no botão
    function showLoading() {
        loginButton.innerHTML = '<span style="display: inline-block; animation: spin 1s linear infinite;">⟳</span> Entrando...';
        loginButton.disabled = true;
        loginButton.style.opacity = '0.7';
    }
    function hideLoading() {
        loginButton.innerHTML = 'Entrar';
        loginButton.disabled = false;
        loginButton.style.opacity = '1';
    }

    // Submissão do formulário
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validações
        let isFormValid = true;
        if (!email) {
            addInputFeedback(emailInput, false);
            isFormValid = false;
        } else if (!isValidEmail(email)) {
            addInputFeedback(emailInput, false);
            isFormValid = false;
        }
        if (!password) {
            addInputFeedback(passwordInput, false);
            isFormValid = false;
        } else if (!isValidPassword(password)) {
            addInputFeedback(passwordInput, false);
            isFormValid = false;
        }
        if (!isFormValid) {

            // Shake animation para erro
            loginForm.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                loginForm.style.animation = '';
            }, 500);
            return;
        }

        // Simular login
        showLoading();
        setTimeout(() => {
            hideLoading();

            // Simular sucesso/erro
            const loginSuccess = Math.random() > 0.3; // 70% chance de sucesso
            if (loginSuccess) {

                // Feedback de sucesso
                loginButton.innerHTML = '✓ Sucesso!';
                loginButton.style.background = '#4CAF50';
                setTimeout(() => {
                    alert('Login realizado com sucesso!\\nRedirecionando...');

                    // Aqui você redirecionaria para a página principal

                    // window.location.href = '/dashboard';

                }, 1000);

            } else {

                // Feedback de erro

                loginButton.innerHTML = '✗ Erro no login';

                loginButton.style.background = '#f44336';

                setTimeout(() => {

                    loginButton.innerHTML = 'Entrar';

                    loginButton.style.background = '#c85a7a';

                    alert('Email ou senha incorretos.\\nTente novamente.');

                }, 2000);

            }

        }, 2000);

    });

    // Funcionalidade dos links

    forgotLink.addEventListener('click', function(e) {

        e.preventDefault();

        alert('Funcionalidade de recuperação de senha será implementada em breve.');

    });

    registerLink.addEventListener('click', function(e) {

        e.preventDefault();

        alert('Funcionalidade de cadastro será implementada em breve.');

    });

    // Efeitos de hover aprimorados

    loginButton.addEventListener('mouseenter', function() {

        if (!this.disabled) {

            this.style.transform = 'translateY(-2px)';

            this.style.boxShadow = '0 8px 25px rgba(200, 90, 122, 0.4)';

        }

    });

    loginButton.addEventListener('mouseleave', function() {

        if (!this.disabled) {

            this.style.transform = 'translateY(0)';

            this.style.boxShadow = 'none';

        }

    });

    // Animação de entrada dos elementos

    setTimeout(() => {

        document.querySelector('.logo-section').style.opacity = '1';

        document.querySelector('.logo-section').style.transform = 'translateY(0)';

    }, 200);

    setTimeout(() => {

        document.querySelector('.login-form').style.opacity = '1';

        document.querySelector('.login-form').style.transform = 'translateY(0)';

    }, 400);

});

// CSS adicional para animações via JavaScript

const style = document.createElement('style');

style.textContent = `

    @keyframes spin {

        0% { transform: rotate(0deg); }

        100% { transform: rotate(360deg); }

    }

    @keyframes shake {

        0%, 100% { transform: translateX(0); }

        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }

        20%, 40%, 60%, 80% { transform: translateX(5px); }

    }

    .logo-section {

        opacity: 0;

        transform: translateY(-20px);

        transition: all 0.6s ease-out;

    }

    .login-form {

        opacity: 0;

        transform: translateY(20px);

        transition: all 0.6s ease-out;

    }

`;

document.head.appendChild(style);
 
// ========== LOGIN ==========
const formLogin = document.getElementById("loginForm");
const btnCadastrar = document.getElementById("btnCadastrar");

if (formLogin) {
  formLogin.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (email === "" || senha === "") {
      alert("Por favor, preencha todos os campos!");
    } else {
      alert("Login realizado com sucesso!");
      // window.location.href = "dashboard.html";
    }
  });
}

if (btnCadastrar) {
  btnCadastrar.addEventListener("click", function() {
    window.location.href = "cadastro.html";
  });
}

// ========== CADASTRO ==========
const formCadastro = document.getElementById("cadastroForm");

if (formCadastro) {
  formCadastro.addEventListener("submit", function(event) {
    event.preventDefault();

    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    alert("Cadastro realizado com sucesso!");
    window.location.href = "index.html"; // volta para o login
  });
}

// ========== MÁSCARA DE TELEFONE ==========
const telefoneInput = document.getElementById("telefone");

if (telefoneInput) {
  telefoneInput.addEventListener("input", function(e) {
    let valor = e.target.value.replace(/\D/g, ""); // remove tudo que não for número

    if (valor.length > 11) valor = valor.slice(0, 11); // limita a 11 dígitos

    if (valor.length > 6) {
      e.target.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
    } else if (valor.length > 2) {
      e.target.value = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    } else {
      e.target.value = valor;
    }
  });
}

/* chat bot */
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const sendSound = document.getElementById("sendSound");
const receiveSound = document.getElementById("receiveSound");
const statusText = document.getElementById("status");

function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.innerHTML = `<p>${text}</p><span class="time">${getTime()}</span>`;
  msg.appendChild(bubble);

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;

  if (sender === "bot") receiveSound.play();
  else sendSound.play();
}

sendBtn.addEventListener("click", () => {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  const typingDiv = showTyping();
  setTimeout(() => botReply(text, typingDiv), 1500);
});

userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendBtn.click();
});

function showTyping() {
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("typing");
  typingDiv.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div>`;
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  return typingDiv;
}

function botReply(userText, typingDiv) {
  typingDiv.remove();
  statusText.innerText = "Digitando...";

  let response = "Desculpe, não entendi. Pode explicar melhor?";
  userText = userText.toLowerCase();

  if (userText.includes("ajuda")) response = "Claro! Você pode me contar o que aconteceu?";
  else if (userText.includes("roub") || userText.includes("assalto")) response = "Sinto muito 😢. Deseja que eu envie um alerta para seus contatos de emergência?";
  else if (userText.includes("sim")) response = "🚨 Alerta enviado! Mantenha-se em local seguro até a ajuda chegar.";
  else if (userText.includes("não")) response = "Tudo bem, estou aqui se precisar de algo mais.";
  else if (userText.includes("obrigad")) response = "De nada 💛. Estarei sempre aqui para ajudar!";

  setTimeout(() => {
    addMessage(response, "bot");
    statusText.innerText = "Online";
  }, 800);
}

/*Chatbot */
const chatbox = document.getElementById("chat-box");
const userinput = document.getElementById("userInput");
const sendbtn = document.getElementById("sendBtn");
const sendSound = document.getElementById("sendSound");
const receiveSound = document.getElementById("receiveSound");
const statusText = document.getElementById("status");

function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.innerHTML = `<p>${text}</p><span class="time">${getTime()}</span>`;
  msg.appendChild(bubble);

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;

  if (sender === "bot") receiveSound.play();
  else sendSound.play();
}

// Enviar mensagem
sendBtn.addEventListener("click", () => {
  const text = userInput.value.trim();
  if (text === "") return;

  addMessage(text, "user");
  userInput.value = "";

  showTyping();
  setTimeout(() => botReply(text), 2000);
});

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

// “Digitando...” animação
function showTyping() {
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("typing");
  typingDiv.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div>`;
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  return typingDiv;
}

// Lógica do chatbot
function botReply(userText) {
  document.querySelector(".typing")?.remove();
  statusText.innerText = "Digitando...";

  let response = "Desculpe, não entendi. Pode explicar melhor?";
  userText = userText.toLowerCase();

  if (userText.includes("ajuda")) {
    response = "Claro! Você pode me contar o que aconteceu?";
  } else if (userText.includes("roub")) {
    response = "Sinto muito 😢. Deseja que eu envie um alerta para seus contatos de emergência?";
  } else if (userText.includes("sim")) {
    response = "🚨 Alerta enviado! Mantenha-se em local seguro até a ajuda chegar.";
  } else if (userText.includes("não")) {
    response = "Tudo bem, estou aqui se precisar de algo mais.";
  } else if (userText.includes("obrigad")) {
    response = "De nada 💛. Estarei sempre aqui para ajudar!";
  }

  setTimeout(() => {
    addMessage(response, "bot");
    statusText.innerText = "Online";
  }, 1500);
}

/*tela coração*/
// DOM elements
const imageGrid = document.getElementById('imageGrid');
const modal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');
const menuBtn = document.getElementById('profileBtn');
const sidebar = document.getElementById('sidebar'); // in case sidebar exists
const backBtn = document.getElementById('backBtn');
const themeInfo = document.getElementById('themeInfo');

// ensure variables exist when user customized files
if (!imageGrid) throw new Error('Elemento imageGrid não encontrado (verifique id).');

// Open modal when clicking image (delegation)
imageGrid.addEventListener('click', (e) => {
  const img = e.target.closest('img.grid-img');
  if (!img) return;
  openModal(img);
});

imageGrid.addEventListener('keydown', (e) => {
  // allow Enter/Space to open when focused
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('img.grid-img')) {
    e.preventDefault();
    openModal(e.target);
  }
});

function openModal(img){
  modal.setAttribute('aria-hidden','false');
  modalImg.src = img.src;
  modalImg.alt = img.alt || '';
  modalCaption.textContent = img.alt || '';
  document.body.style.overflow = 'hidden';
  modalImg.focus?.();
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  modalImg.src = '';
  modalCaption.textContent = '';
  document.body.style.overflow = '';
}

// modal close handlers
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// Back button example
backBtn?.addEventListener('click', () => { window.history.back(); });

// Optional sidebar toggle (if implemented)
if (menuBtn && sidebar){
  menuBtn.addEventListener('click', (e) => {
    const isOpen = sidebar.style.right === '0px';
    sidebar.style.right = isOpen ? '-230px' : '0px';
  });
  // click outside to close
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) sidebar.style.right = '-230px';
  });
}

// Theme detection info (using prefers-color-scheme)
const darkQuery = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
function updateThemeInfo(){
  const mode = darkQuery.matches ? 'Escuro' : 'Claro';
  if (themeInfo) themeInfo.textContent = `Tema: ${mode}`;
}
updateThemeInfo();
darkQuery.addEventListener?.('change', updateThemeInfo);

// make header padding adapt if header height changes (robust)
(function syncHeaderPadding(){
  const header = document.getElementById('appHeader');
  function setPadding(){
    const h = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--header-height', `${h}px`);
    document.body.style.paddingTop = `calc(${h}px + 18px)`;
  }
  setPadding();
  window.addEventListener('resize', setPadding);
})();
// Garantir que o modal esteja fechado ao carregar
window.addEventListener("DOMContentLoaded", () => {
  modal.setAttribute("aria-hidden", "true");
  modal.style.display = "none";
});
