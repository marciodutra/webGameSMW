const telefoneInput = document.getElementById("telefone");
telefoneInput.addEventListener("input", function (event) {
  const telefone = event.target.value.replace(/\D/g, "").substring(0, 11);
  const formattedTelefone = telefone
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{4,5})(\d)/, "$1-$2");
  event.target.value = formattedTelefone;
});

document
  .querySelector(".formulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    document.querySelector("#mensagem").innerHTML =
      '<img src="/images/thanks.png" style="max-width: 350px;"> <br> <span style="text-align: center; display: block;">Mensagem Enviada com Sucesso!</span>';
    document.querySelector("#mensagem").style.display = "block";
    sucessoemail = document.querySelector(".sendmessage");
    sucessoemail.play();
    document.querySelector("#container-contato .titulo").style.display = "none";
    document.querySelector(
      "#container-contato .contato-formulario"
    ).style.display = "none";
  });

function enviarMensagem() {
  var nome = document.getElementById("nome").value;
  var sobrenome = document.getElementById("sobrenome").value;
  var email = document.getElementById("email").value;
  var telefone = document.getElementById("telefone").value;
  var checkbox = document.getElementById("checkbox").checked;

  if (
    nome === "" ||
    sobrenome === "" ||
    email === "" ||
    telefone === "" ||
    !checkbox
  ) {
    return;
  }
  var dados =
    "Nome: " +
    nome +
    "\nSobrenome: " +
    sobrenome +
    "\nE-mail: " +
    email +
    "\nTelefone: " +
    telefone +
    "\n\n" +
    "SE INSCREVA-SE NO CANAL OFICIAL DO YOUTUBE E DEIXE SEU LIKE.\n HTTPS://WWW.YOUTUBE.COM/@JOHNNYPEFFEROFICIAL \n\n";
  var link = document.createElement("a");
  link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(dados);
  link.download = "obrigado.txt";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("selectstart", (event) => event.preventDefault());
document.addEventListener("dragstart", (event) => event.preventDefault());
