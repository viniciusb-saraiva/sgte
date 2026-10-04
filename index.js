const API_URL = "http://localhost:3000/users";

// Encontrar o botão na página
const button = document.querySelector("button");
const inputNome = document.querySelector('[name="nome"]');
const inputTipo = document.querySelector('[name="tipo"]');
const inputEmail = document.querySelector('[name="email"]');
const inputSenha = document.querySelector('[name="senha"]');
const divResultado = document.querySelector(".resultado");

let usuarioEditando = null;

// Adicionar escuta do evento de 'click'
button.addEventListener("click", function () {
  const novoUsuario = {
    nome: inputNome.value,
    tipo: inputTipo.value,
    email: inputEmail.value,
    senha: inputSenha.value,
  };

  if (usuarioEditando) {
    atualizarUsuario(usuarioEditando, novoUsuario);
  } else {
    criarUsuario(novoUsuario);
  }
});

// POST
function criarUsuario(dadoUsuario) {
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadoUsuario),
  }).then(function (resposta) {
    resposta.json().then(function (data) {
      console.log(data);
      limparFormulario();
      lerUsuarios();
    });
  });
}

// GET
function lerUsuarios() {
  fetch(API_URL, {
    method: "GET",
  }).then(function (resposta) {
    resposta.json().then(function (data) {
      divResultado.innerHTML = "";
      for (const usuario of data) {
        criarHTML(usuario);
      }
    });
  });
}

function criarHTML(usuario) {
  const divCriada = document.createElement("div");
  divCriada.classList.add("bloco");
  divCriada.innerHTML = `
    <h1>${usuario.nome}</h1>
    <h2>${usuario.tipo}</h2>
    <span>${usuario.email}</span>
    <br />
    <span>${usuario.senha}</span>
    <br /><br />
    <button class="btn-atualizar">Atualizar</button>
    <button class="btn-deletar">Deletar</button>
  `;
  const btnAtualizar = divCriada.querySelector(".btn-atualizar");
  const btnDeletar = divCriada.querySelector(".btn-deletar");

  btnAtualizar.addEventListener("click", function () {
    preencherFormulario(usuario);
  });

  btnDeletar.addEventListener("click", function () {
    deletarUsuario(usuario.id);
  });

  divResultado.append(divCriada);
}

// DELETE
function deletarUsuario(id) {
  fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error("Erro ao deletar usuário");
      }

      return resposta.json();
    })
    .then(function () {
      console.log("Usuário deletado!");

      lerUsuarios();
    })
    .catch(function (erro) {
      console.error(erro);
    });
}

// Coloca os dados do usuário no formulário
function preencherFormulario(usuario) {
  inputNome.value = usuario.nome;
  inputTipo.value = usuario.tipo;
  inputEmail.value = usuario.email;
  inputSenha.value = usuario.senha;

  usuarioEditando = usuario.id;

  button.textContent = "Atualizar usuário";
}

// PUT
function atualizarUsuario(id, dadoUsuario) {
  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      ...dadoUsuario,
    }),
  })
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error("Erro ao atualizar usuário");
      }

      return resposta.json();
    })
    .then(function (data) {
      console.log("Usuário atualizado:", data);

      usuarioEditando = null;

      limparFormulario();
      lerUsuarios();
    })
    .catch(function (erro) {
      console.error(erro);
    });
}

// Limpar formulário
function limparFormulario() {
  inputNome.value = "";
  inputTipo.value = "1";
  inputEmail.value = "";
  inputSenha.value = "";

  button.textContent = "Criar usuário";
}

// Carregar usuários quando a página abrir
document.addEventListener("DOMContentLoaded", () => {
  lerUsuarios();
});
