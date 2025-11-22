// Verificação de login
if (sessionStorage.getItem("logado") !== "true") {
  window.location.href = "login.html";
}

// Botão de logout
function logout() {
  sessionStorage.removeItem("logado");
  window.location.href = "login.html";
}

const tabela = document.querySelector("#tabelaClientes tbody");
let clientes = [];

document.getElementById("formCliente").addEventListener("submit", async function(e) {
  e.preventDefault();

  const cliente = {
    id: document.getElementById("formCliente").dataset.id,
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    plano: document.getElementById("plano").value,
    valor: parseFloat(document.getElementById("valor").value),
    vencimento: document.getElementById("vencimento").value
  };

  // Validação de campos
  if (!validarCampos(cliente)) return;

  if (cliente.id) {
    await fetch(`/api/clientes/${cliente.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente)
    });
  } else {
    await fetch("/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente)
    });
  }

  limparFormulario();
  carregarClientes();
});

function validarCampos(cliente) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const planosValidos = ["Bronze", "Prata", "Ouro"];
  const vencimento = new Date(cliente.vencimento);
  const hoje = new Date();

  if (!cliente.nome.trim()) {
    alert("Nome é obrigatório.");
    return false;
  }
  if (!emailRegex.test(cliente.email)) {
    alert("E-mail inválido.");
    return false;
  }
  if (!planosValidos.includes(cliente.plano)) {
    alert("Plano deve ser Bronze, Prata ou Ouro.");
    return false;
  }
  if (isNaN(cliente.valor) || cliente.valor <= 0) {
    alert("Valor deve ser um número positivo.");
    return false;
  }
  //if (vencimento < hoje) {
    //alert("Vencimento deve ser uma data futura.");
    //return false;
  //}

  return true;
}

function preencherFormulario(cliente) {
  document.getElementById("nome").value = cliente.nome;
  document.getElementById("email").value = cliente.email;
  document.getElementById("plano").value = cliente.plano;
  document.getElementById("valor").value = cliente.valor;
  document.getElementById("vencimento").value = cliente.vencimento;
  document.getElementById("formCliente").dataset.id = cliente.id;
}

function limparFormulario() {
  document.getElementById("formCliente").reset();
  delete document.getElementById("formCliente").dataset.id;
}

async function carregarClientes() {
  const res = await fetch("/api/clientes");
  clientes = await res.json();
  tabela.innerHTML = "";
  const hoje = new Date();

  clientes.forEach(cliente => {
    const venc = new Date(cliente.vencimento);
    const diasAtraso = Math.floor((hoje - venc) / (1000 * 60 * 60 * 24));
    const status = diasAtraso > 0 ? "Inadimplente" : "Em dia";
    let notificacao = "";

    if (diasAtraso > 0 && diasAtraso <= 3) {
  notificacao = "Aviso amigável";
} else if (diasAtraso > 3 && diasAtraso <= 10) {
  notificacao = "Lembrete formal";
} else if (diasAtraso > 10) {
  notificacao = "Notificação final";
}

    const linha = document.createElement("tr");
    if (status === "Inadimplente") linha.classList.add("inadimplente");

    linha.innerHTML = `
      <td>${cliente.nome}</td>
      <td>${cliente.email}</td>
      <td>${cliente.plano}</td>
      <td>R$ ${cliente.valor}</td>
      <td>${venc.toLocaleDateString()}</td>
      <td>${status}</td>
      <td>${notificacao}</td>
      <td>
        <button onclick="editarCliente(${cliente.id})">Editar</button>
        <button onclick="excluirCliente(${cliente.id})">Excluir</button>
      </td>
    `;
    tabela.appendChild(linha);
  });
}

function editarCliente(id) {
  const cliente = clientes.find(c => c.id === id);
  if (cliente) {
    preencherFormulario(cliente);
    document.getElementById("formCliente").dataset.id = cliente.id;
  }
}

async function excluirCliente(id) {
  if (confirm("Deseja realmente excluir este cliente?")) {
    await fetch(`/api/clientes/${id}`, { method: "DELETE" });
    carregarClientes();
  }
}

carregarClientes();