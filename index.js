// Encontrar o botão na página
const button = document.querySelector("button");
const inputNome = document.querySelector('[name="nome"]');
const inputTipo = document.querySelector('[name="tipo"]');
const inputEmail = document.querySelector('[name="email"]');
const inputSenha = document.querySelector('[name="senha"]');

// Adicionar escuta do evento de 'click'
button.addEventListener("click", function () {
  const novoUsuario = {
    nome: inputNome.value,
    tipo: inputTipo.value,
    email: inputEmail.value,
    senha: inputSenha.value,
  };

  console.log(novoUsuario);
  criarUsuario(novoUsuario);
});

function criarUsuario(dadoUsuario) {
  fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify(dadoUsuario),
  }).then(function (resposta) {
    resposta.json().then(function (data) {
      console.log(data);
    });
  });
}

function lerUsuarios() {
  fetch("http://localhost:3000/users", {
    method: "GET",
  }).then(function (resposta) {
    resposta.json().then(function (data) {
      for (const usuario of data) {
        criarHTML(usuario);
      }
    });
  });
}

function criarHTML(usuario) {
  const divResultado = document.querySelector(".resultado");
  const divCriada = document.createElement("div");
  divCriada.classList.add("bloco");
  divCriada.innerHTML = `
    <h1>${usuario.nome}</h1>
    <h2>${usuario.tipo}</h2>
    <span>${usuario.email}</span>
    <br />
    <span>${usuario.senha}</span>
  `;
  divResultado.append(divCriada);
}

lerUsuarios();
