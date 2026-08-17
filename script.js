let pedido = [];

let total = 0;

let pagamentoSelecionado = "";

const numeroWhatsApp = "5531983927759";


/* =========================
   CAPA
========================= */

function entrarNoCardapio() {

  document
    .getElementById("cardapio")
    .scrollIntoView({
      behavior: "smooth"
    });

}


function voltarInicio() {

  document
    .getElementById("inicio")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* =========================
   NAVEGAÇÃO
========================= */

function irPara(id) {

  const elemento =
    document.getElementById(id);

  if (!elemento) return;

  elemento.scrollIntoView({
    behavior: "smooth",
    block: "start"
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
        ).toLowerCase();


      produto.style.display =
        busca === "" ||
        nome.includes(busca)
          ? ""
          : "none";

    });

}


/* =========================
   PROMOÇÕES
========================= */

function mostrarPromocoes() {

  const secao =
    document.getElementById("promocoes");

  secao.classList.remove("escondida");

  setTimeout(() => {

    secao.scrollIntoView({
      behavior: "smooth"
    });

  }, 100);

}


function fecharPromocoes() {

  document
    .getElementById("promocoes")
    .classList.add("escondida");

}


/* =========================
   FAVORITOS
========================= */

function favoritar(botao) {

  botao.classList.toggle(
    "favoritado"
  );


  if (
    botao.classList.contains(
      "favoritado"
    )
  ) {

    botao.innerText = "♥";

  } else {

    botao.innerText = "♡";

  }

}


/* =========================
   CARRINHO
========================= */

function adicionar(nome, preco) {

  const existente =
    pedido.find(
      item => item.nome === nome
    );


  if (existente) {

    existente.quantidade++;

  } else {

    pedido.push({
      nome,
      preco,
      quantidade: 1
    });

  }


  calcularTotal();

  atualizarPedido();

  abrirCarrinho();

}


function aumentar(index) {

  pedido[index].quantidade++;

  calcularTotal();

  atualizarPedido();

}


function diminuir(index) {

  pedido[index].quantidade--;


  if (
    pedido[index].quantidade <= 0
  ) {

    pedido.splice(index, 1);

  }


  calcularTotal();

  atualizarPedido();

}


function calcularTotal() {

  total =
    pedido.reduce(
      (soma, item) =>
        soma +
        item.preco *
        item.quantidade,
      0
    );

}


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


  const quantidade =
    pedido.reduce(
      (soma, item) =>
        soma + item.quantidade,
      0
    );


  contador.innerText =
    quantidade;


  if (pedido.length === 0) {

    lista.innerHTML =
      `<p class="vazio">
        Seu carrinho está vazio.
      </p>`;

    totalElemento.innerText =
      "0,00";

    return;

  }


  pedido.forEach(
    (item, index) => {

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

          <span>
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
      "Adicione algum produto ao carrinho primeiro!"
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
    .forEach(item => {

      item.classList.remove(
        "selecionado"
      );

    });


  botao.classList.add(
    "selecionado"
  );


  const troco =
    document.getElementById(
      "trocoArea"
    );


  if (
    pagamento === "Dinheiro"
  ) {

    troco.classList.remove(
      "escondida"
    );

  } else {

    troco.classList.add(
      "escondida"
    );

  }

}


/* =========================
   WHATSAPP
========================= */

function abrirSuporte() {

  const mensagem =
    encodeURIComponent(
      "Olá! Preciso de ajuda com o Alencar Burger. 🆘"
    );


  const url =
    `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;


  window.open(
    url,
    "_blank"
  );

}


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


  if (!nome) {

    alert(
      "Digite seu nome."
    );

    return;

  }


  if (!endereco) {

    alert(
      "Digite seu endereço."
    );

    return;

  }


  if (!pagamentoSelecionado) {

    alert(
      "Selecione a forma de pagamento."
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
    `👤 *Nome:* ${encodeURIComponent(nome)}%0A`;


  mensagem +=
    `📍 *Endereço:* ${encodeURIComponent(endereco)}%0A%0A`;


  mensagem +=
    "🛒 *PEDIDO:*%0A";


  pedido.forEach(item => {

    const subtotal =
      item.preco *
      item.quantidade;


    mensagem +=
      `• ${item.quantidade}x ${encodeURIComponent(item.nome)} - R$ ${formatarPreco(subtotal)}%0A`;

  });


  mensagem +=
    `%0A💰 *TOTAL: R$ ${formatarPreco(total)}*%0A`;


  mensagem +=
    `💳 *PAGAMENTO: ${pagamentoSelecionado}*%0A`;


  if (
    pagamentoSelecionado === "Dinheiro" &&
    troco
  ) {

    mensagem +=
      `💵 *Troco para: R$ ${encodeURIComponent(troco)}*%0A`;

  }


  mensagem +=
    "%0AObrigado! 🍔";


  const url =
    `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;


  window.open(
    url,
    "_blank"
  );


  /*
    Salva localmente que o pedido
    foi enviado.
  */

  localStorage.setItem(
    "pedidoEnviado",
    "true"
  );


  fecharFinalizacao();

  fecharCarrinho();


  /*
    Abre acompanhamento
    depois do envio.
  */

  setTimeout(() => {

    abrirAcompanhamento();

  }, 500);

}


/* =========================
   ACOMPANHAMENTO
========================= */

function abrirAcompanhamento() {

  document
    .getElementById(
      "acompanhamento"
    )
    .classList.add("aberto");

}


function fecharAcompanhamento() {

  document
    .getElementById(
      "acompanhamento"
    )
    .classList.remove("aberto");

}


/* =========================
   FORMATAÇÃO
========================= */

function formatarPreco(valor) {

  return valor
    .toFixed(2)
    .replace(".", ",");

}


/* =========================
   FECHAR MODAIS
========================= */

document.addEventListener(
  "click",
  function(event) {

    const finalizacao =
      document.getElementById(
        "finalizacao"
      );

    const acompanhamento =
      document.getElementById(
        "acompanhamento"
      );


    if (
      event.target === finalizacao
    ) {

      fecharFinalizacao();

    }


    if (
      event.target === acompanhamento
    ) {

      fecharAcompanhamento();

    }

  }
);


/* =========================
   TECLA ESC
========================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "Escape"
    ) {

      fecharCarrinho();

      fecharFinalizacao();

      fecharAcompanhamento();

    }

  }
);


/* =========================
   ANIMAÇÃO AO ROLAR
========================= */

const observador =
  new IntersectionObserver(
    elementos => {

      elementos.forEach(
        elemento => {

          if (
            elemento.isIntersecting
          ) {

            elemento.target.classList.add(
              "visivel"
            );

          }

        }
      );

    },
    {
      threshold: 0.1
    }
  );


document
  .querySelectorAll(
    ".secao, .avaliacoes, .info-loja, .ajuda, .suporte"
  )
  .forEach(elemento => {

    observador.observe(
      elemento
    );

  });


/* =========================
   INICIALIZAÇÃO
========================= */

atualizarPedido();