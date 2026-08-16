let pedido = [];
let total = 0;
let pagamentoSelecionado = "";


/* =========================
   ENTRAR NO CARDÁPIO
========================= */

function entrarNoCardapio() {
  document.getElementById("cardapio").scrollIntoView({
    behavior: "smooth"
  });
}


/* =========================
   PROMOÇÕES
========================= */

function mostrarPromocoes() {
  const promocoes = document.getElementById("promocoes");

  promocoes.classList.remove("escondida");

  setTimeout(() => {
    promocoes.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 100);
}


function fecharPromocoes() {
  document
    .getElementById("promocoes")
    .classList.add("escondida");
}


/* =========================
   ADICIONAR PRODUTO
========================= */

function adicionar(nome, preco) {

  pedido.push({
    nome: nome,
    preco: preco
  });

  total += preco;

  atualizarPedido();

  abrirCarrinho();
}


/* =========================
   ATUALIZAR CARRINHO
========================= */

function atualizarPedido() {

  const lista = document.getElementById("listaPedido");
  const totalElemento = document.getElementById("total");
  const contador = document.getElementById("contador");

  lista.innerHTML = "";

  contador.innerText = pedido.length;


  if (pedido.length === 0) {

    lista.innerHTML =
      '<p class="vazio">Seu carrinho está vazio.</p>';

    totalElemento.innerText = "0,00";

    return;
  }


  pedido.forEach((item, index) => {

    const div = document.createElement("div");

    div.className = "item-pedido";

    div.innerHTML = `
      <span>${item.nome}</span>

      <span>
        R$ ${formatarPreco(item.preco)}

        <button onclick="remover(${index})">
          ❌
        </button>
      </span>
    `;

    lista.appendChild(div);
  });


  totalElemento.innerText = formatarPreco(total);
}


/* =========================
   REMOVER PRODUTO
========================= */

function remover(index) {

  total -= pedido[index].preco;

  pedido.splice(index, 1);

  atualizarPedido();
}


/* =========================
   CARRINHO
========================= */

function abrirCarrinho() {

  document
    .getElementById("carrinho")
    .classList.add("aberto");
}


function fecharCarrinho() {

  document
    .getElementById("carrinho")
    .classList.remove("aberto");
}


/* =========================
   ABRIR FINALIZAÇÃO
========================= */

function abrirFinalizacao() {

  if (pedido.length === 0) {

    alert("Seu carrinho está vazio!");

    return;
  }


  document.getElementById("totalFinal").innerText =
    formatarPreco(total);


  document
    .getElementById("finalizacao")
    .classList.add("aberto");
}


/* =========================
   FECHAR FINALIZAÇÃO
========================= */

function fecharFinalizacao() {

  document
    .getElementById("finalizacao")
    .classList.remove("aberto");
}


/* =========================
   FORMA DE PAGAMENTO
========================= */

function selecionarPagamento(pagamento, botao) {

  pagamentoSelecionado = pagamento;


  // Remove seleção dos outros botões
  document
    .querySelectorAll(".pagamento")
    .forEach(function(elemento) {

      elemento.classList.remove("selecionado");

    });


  // Marca o botão escolhido
  botao.classList.add("selecionado");


  // Mostra troco somente para dinheiro
  const trocoArea =
    document.getElementById("trocoArea");


  if (pagamento === "Dinheiro") {

    trocoArea.classList.remove("escondida");

  } else {

    trocoArea.classList.add("escondida");

  }
}


/* =========================
   ENVIAR PEDIDO PARA WHATSAPP
========================= */

function enviarWhatsApp() {

  if (pedido.length === 0) {

    alert("Seu pedido está vazio!");

    return;
  }


  const nome =
    document
      .getElementById("nomeCliente")
      .value
      .trim();


  const endereco =
    document
      .getElementById("endereco")
      .value
      .trim();


  // Verifica nome
  if (nome === "") {

    alert("Digite seu nome.");

    return;
  }


  // Verifica endereço
  if (endereco === "") {

    alert("Digite seu endereço ou ponto de referência.");

    return;
  }


  // Verifica pagamento
  if (pagamentoSelecionado === "") {

    alert("Selecione uma forma de pagamento.");

    return;
  }


  const troco =
    document
      .getElementById("troco")
      .value;


  let mensagem =
    "🍔 *NOVO PEDIDO - ALENCAR BURGER*%0A%0A";


  mensagem +=
    `👤 *Nome:* ${nome}%0A`;


  mensagem +=
    `📍 *Endereço:* ${endereco}%0A%0A`;


  mensagem +=
    "🛒 *PEDIDO:*%0A";


  pedido.forEach(function(item) {

    mensagem +=
      `• ${item.nome} - R$ ${formatarPreco(item.preco)}%0A`;

  });


  mensagem +=
    `%0A💰 *TOTAL: R$ ${formatarPreco(total)}*%0A`;


  mensagem +=
    `💳 *FORMA DE PAGAMENTO: ${pagamentoSelecionado}*%0A`;


  // Se for dinheiro, mostra o troco
  if (
    pagamentoSelecionado === "Dinheiro" &&
    troco !== ""
  ) {

    mensagem +=
      `💵 *Troco para: R$ ${troco}*%0A`;
  }


  /*
  ==================================
  COLOQUE O WHATSAPP AQUI
  ==================================

  Exemplo:

  5531999999999

  Não coloque:
  +55
  espaços
  parênteses
  hífens
  */

  const numero =
    "5531999999999";


  const url =
    `https://wa.me/${numero}?text=${mensagem}`;


  window.open(url, "_blank");
}


/* =========================
   FORMATAÇÃO DE PREÇO
========================= */

function formatarPreco(valor) {

  return valor
    .toFixed(2)
    .replace(".", ",");
}