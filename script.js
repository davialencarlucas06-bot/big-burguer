let pedido = [];

let total = 0;

let pagamentoSelecionado = "";


/* =========================
   NÚMERO DO WHATSAPP
========================= */

const numeroWhatsApp = "5531983927759";


/* =========================
   ENTRAR NO CARDÁPIO
========================= */

function entrarNoCardapio() {

  document
    .getElementById("cardapio")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* =========================
   INÍCIO
========================= */

function voltarInicio() {

  document
    .getElementById("inicio")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* =========================
   CATEGORIAS
========================= */

function irPara(id) {

  const elemento =
    document.getElementById(id);


  if (!elemento) return;


  elemento.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });


  document
    .querySelectorAll(".categoria")
    .forEach(botao => {

      botao.classList.remove("ativa");

    });

}


/* =========================
   PESQUISA
========================= */

function abrirPesquisa() {

  document
    .getElementById("pesquisa")
    .classList.remove("escondida");

  document
    .getElementById("campoBusca")
    .focus();

}


function fecharPesquisa() {

  document
    .getElementById("pesquisa")
    .classList.add("escondida");

  document
    .getElementById("campoBusca")
    .value = "";

  pesquisarProdutos();

}


function pesquisarProdutos() {

  const busca =
    document
      .getElementById("campoBusca")
      .value
      .toLowerCase()
      .trim();


  document
    .querySelectorAll(".produto")
    .forEach(produto => {

      const nome =
        (
          produto.dataset.nome ||
          produto.innerText
        )
        .toLowerCase();


      if (
        busca === "" ||
        nome.includes(busca)
      ) {

        produto.style.display = "";

      } else {

        produto.style.display = "none";

      }

    });

}


/* =========================
   PROMOÇÕES
========================= */

function mostrarPromocoes() {

  const promocoes =
    document.getElementById("promocoes");


  promocoes.classList.remove("escondida");


  setTimeout(() => {

    promocoes.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  },100);

}


function fecharPromocoes() {

  document
    .getElementById("promocoes")
    .classList.add("escondida");

}


/* =========================
   FAVORITOS
========================= */

function favoritar(botao,nome) {

  botao.classList.toggle("favoritado");


  if (botao.classList.contains("favoritado")) {

    botao.innerText = "♥";

    salvarFavorito(nome);

  } else {

    botao.innerText = "♡";

  }

}


function salvarFavorito(nome) {

  let favoritos =
    JSON.parse(
      localStorage.getItem("favoritosBurger")
    ) || [];


  if (!favoritos.includes(nome)) {

    favoritos.push(nome);

  }


  localStorage.setItem(
    "favoritosBurger",
    JSON.stringify(favoritos)
  );

}


/* =========================
   ADICIONAR
========================= */

function adicionar(nome,preco) {

  const existente =
    pedido.find(
      item => item.nome === nome
    );


  if (existente) {

    existente.quantidade++;

  } else {

    pedido.push({

      nome: nome,

      preco: preco,

      quantidade: 1

    });

  }


  calcularTotal();

  atualizarPedido();

  abrirCarrinho();

}


/* =========================
   TOTAL
========================= */

function calcularTotal() {

  total =
    pedido.reduce(
      (soma,item) => {

        return soma +
          item.preco * item.quantidade;

      },
      0
    );

}


/* =========================
   ATUALIZAR CARRINHO
========================= */

function atualizarPedido() {

  const lista =
    document.getElementById(
      "listaPedido"
    );


  const contador =
    document.getElementById(
      "contador"
    );


  const totalElemento =
    document.getElementById(
      "total"
    );


  lista.innerHTML = "";


  const quantidadeTotal =
    pedido.reduce(
      (soma,item) =>
        soma + item.quantidade,
      0
    );


  contador.innerText =
    quantidadeTotal;


  if (pedido.length === 0) {

    lista.innerHTML =
      '<p class="vazio">Seu carrinho está vazio.</p>';

    totalElemento.innerText =
      "0,00";

    return;

  }


  pedido.forEach(
    (item,index) => {

      const div =
        document.createElement(
          "div"
        );


      div.className =
        "item-pedido";


      div.innerHTML = `

        <div class="item-info">

          <strong>
            ${item.nome}
          </strong>

          <small>
            R$ ${formatarPreco(item.preco)}
            cada
          </small>

        </div>


        <div class="controles">

          <button
            onclick="diminuir(${index})"
          >
            −
          </button>


          <span class="quantidade">
            ${item.quantidade}
          </span>


          <button
            onclick="aumentar(${index})"
          >
            +
          </button>

        </div>

      `;


      lista.appendChild(div);

    }
  );


  totalElemento.innerText =
    formatarPreco(total);

}


/* =========================
   AUMENTAR
========================= */

function aumentar(index) {

  pedido[index].quantidade++;

  calcularTotal();

  atualizarPedido();

}


/* =========================
   DIMINUIR
========================= */

function diminuir(index) {

  pedido[index].quantidade--;


  if (
    pedido[index].quantidade <= 0
  ) {

    pedido.splice(index,1);

  }


  calcularTotal();

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
   FINALIZAÇÃO
========================= */

function abrirFinalizacao() {

  if (pedido.length === 0) {

    alert(
      "Adicione algum produto ao pedido primeiro!"
    );

    return;

  }


  document
    .getElementById("totalFinal")
    .innerText =
    formatarPreco(total);


  document
    .getElementById("finalizacao")
    .classList.add("aberto");

}


function fecharFinalizacao() {

  document
    .getElementById("finalizacao")
    .classList.remove("aberto");

}


/* =========================
   PAGAMENTO
========================= */

function selecionarPagamento(
  pagamento,
  botao
) {

  pagamentoSelecionado =
    pagamento;


  document
    .querySelectorAll(".pagamento")
    .forEach(elemento => {

      elemento.classList.remove(
        "selecionado"
      );

    });


  botao.classList.add(
    "selecionado"
  );


  const trocoArea =
    document.getElementById(
      "trocoArea"
    );


  if (
    pagamento === "Dinheiro"
  ) {

    trocoArea.classList.remove(
      "escondida"
    );

  } else {

    trocoArea.classList.add(
      "escondida"
    );

  }

}


/* =========================
   WHATSAPP
========================= */

function enviarWhatsApp() {

  if (pedido.length === 0) {

    alert(
      "Seu pedido está vazio!"
    );

    return;

  }


  const nome =
    document
      .getElementById(
        "nomeCliente"
      )
      .value
      .trim();


  const endereco =
    document
      .getElementById(
        "endereco"
      )
      .value
      .trim();


  if (nome === "") {

    alert(
      "Digite seu nome."
    );

    return;

  }


  if (endereco === "") {

    alert(
      "Digite seu endereço ou ponto de referência."
    );

    return;

  }


  if (
    pagamentoSelecionado === ""
  ) {

    alert(
      "Selecione uma forma de pagamento."
    );

    return;

  }


  const troco =
    document
      .getElementById(
        "troco"
      )
      .value;


  let mensagem =
    "🍔 *NOVO PEDIDO - ALENCAR BURGER*%0A%0A";


  mensagem +=
    `👤 *Nome:* ${nome}%0A`;


  mensagem +=
    `📍 *Endereço:* ${endereco}%0A%0A`;


  mensagem +=
    "🛒 *PEDIDO:*%0A";


  pedido.forEach(item => {

    const subtotal =
      item.preco *
      item.quantidade;


    mensagem +=
      `• ${item.quantidade}x ${item.nome} - R$ ${formatarPreco(subtotal)}%0A`;

  });


  mensagem +=
    `%0A💰 *TOTAL: R$ ${formatarPreco(total)}*%0A`;


  mensagem +=
    `💳 *PAGAMENTO: ${pagamentoSelecionado}*%0A`;


  if (
    pagamentoSelecionado ===
      "Dinheiro" &&
    troco !== ""
  ) {

    mensagem +=
      `💵 *Troco para: R$ ${troco}*%0A`;

  }


  mensagem +=
    "%0AObrigado! 🍔";


  const url =
    `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;


  window.open(
    url,
    "_blank"
  );

}


/* =========================
   PREÇO
========================= */

function formatarPreco(valor) {

  return valor
    .toFixed(2)
    .replace(".",",");

}


/* =========================
   FECHAR MODAL CLICANDO FORA
========================= */

document.addEventListener(
  "click",
  function(event) {

    const modal =
      document.getElementById(
        "finalizacao"
      );


    if (
      event.target === modal
    ) {

      fecharFinalizacao();

    }

  }
);


/* =========================
   ATALHO ESC
========================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "Escape"
    ) {

      fecharFinalizacao();

      fecharCarrinho();

    }

  }
);


/* =========================
   INICIAR
========================= */

atualizarPedido();