let pedido = [];
let total = 0;

function irParaCardapio() {
  document.getElementById("cardapio").scrollIntoView({
    behavior: "smooth"
  });
}

function adicionar(nome, preco) {

  pedido.push({
    nome: nome,
    preco: preco
  });

  total += preco;

  atualizarPedido();
}

function atualizarPedido() {

  const lista = document.getElementById("listaPedido");
  const totalElemento = document.getElementById("total");

  lista.innerHTML = "";

  if (pedido.length === 0) {
    lista.innerHTML = "<p>Nenhum item adicionado.</p>";
    totalElemento.innerText = "0,00";
    return;
  }

  pedido.forEach((item, index) => {

    const div = document.createElement("div");

    div.className = "item-pedido";

    div.innerHTML = `
      <span>${item.nome}</span>
      <span>
        R$ ${item.preco.toFixed(2).replace(".", ",")}
        <button onclick="remover(${index})">❌</button>
      </span>
    `;

    lista.appendChild(div);
  });

  totalElemento.innerText =
    total.toFixed(2).replace(".", ",");
}

function remover(index) {

  total -= pedido[index].preco;

  pedido.splice(index, 1);

  atualizarPedido();
}

function finalizarPedido() {

  if (pedido.length === 0) {
    alert("Adicione algum produto ao pedido primeiro!");
    return;
  }

  let mensagem = "🍔 *NOVO PEDIDO - ALENCAR BURGER*%0A%0A";

  pedido.forEach((item) => {
    mensagem += `• ${item.nome} - R$ ${item.preco.toFixed(2).replace(".", ",")}%0A`;
  });

  mensagem += `%0A💰 *TOTAL: R$ ${total.toFixed(2).replace(".", ",")}*`;

  /*
    TROQUE O NÚMERO ABAIXO PELO WHATSAPP
    DA HAMBURGUERIA.
    
    Exemplo:
    5531999999999
  */

  const numero = "5531999999999";

  const url = `https://wa.me/${numero}?text=${mensagem}`;

  window.open(url, "_blank");
}