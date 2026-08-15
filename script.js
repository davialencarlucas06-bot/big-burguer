let pedido = [];

// ADICIONAR PRODUTO
function adicionar(nome, preco) {

    const produto = pedido.find(item => item.nome === nome);

    if (produto) {
        produto.quantidade++;
    } else {
        pedido.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    atualizarCarrinho();
}

// REMOVER UMA UNIDADE
function remover(nome) {

    const produto = pedido.find(item => item.nome === nome);

    if (!produto) return;

    produto.quantidade--;

    if (produto.quantidade <= 0) {
        pedido = pedido.filter(item => item.nome !== nome);
    }

    atualizarCarrinho();
}

// ATUALIZAR CARRINHO
function atualizarCarrinho() {

    const itens = document.getElementById("itens");
    const totalElemento = document.getElementById("total");

    if (pedido.length === 0) {

        itens.innerHTML = `
            <p>Nenhum produto adicionado.</p>
        `;

        totalElemento.textContent = "0,00";

        return;
    }

    let total = 0;

    itens.innerHTML = "";

    pedido.forEach(produto => {

        const subtotal = produto.preco * produto.quantidade;

        total += subtotal;

        itens.innerHTML += `
            <div class="item-carrinho">

                <span>
                    <strong>${produto.nome}</strong><br>
                    ${produto.quantidade}x
                    R$ ${subtotal.toFixed(2).replace(".", ",")}
                </span>

                <button onclick="remover('${produto.nome}')">
                    −
                </button>

            </div>
        `;

    });

    totalElemento.textContent =
        total.toFixed(2).replace(".", ",");
}

// FINALIZAR PEDIDO
function finalizarPedido() {

    // VERIFICA SE TEM PRODUTO
    if (pedido.length === 0) {

        alert("Adicione algum produto antes de finalizar!");

        return;
    }

    // PEGAR DADOS DO CLIENTE
    const nome =
        document.getElementById("nome").value.trim();

    const endereco =
        document.getElementById("endereco").value.trim();

    const pagamento =
        document.getElementById("pagamento").value;

    // VERIFICAR NOME
    if (nome === "") {

        alert("Digite seu nome.");

        return;
    }

    // VERIFICAR ENDEREÇO
    if (endereco === "") {

        alert("Digite seu endereço.");

        return;
    }

    // VERIFICAR PAGAMENTO
    if (pagamento === "") {

        alert("Escolha a forma de pagamento.");

        return;
    }

    // CALCULAR TOTAL
    let total = 0;

    // COMEÇAR MENSAGEM
    let mensagem =
        "🍔 *NOVO PEDIDO - BURGER HOUSE*%0A%0A";

    // DADOS DO CLIENTE
    mensagem +=
        `👤 *Nome:* ${encodeURIComponent(nome)}%0A`;

    mensagem +=
        `📍 *Endereço:* ${encodeURIComponent(endereco)}%0A`;

    mensagem +=
        `💳 *Pagamento:* ${encodeURIComponent(pagamento)}%0A%0A`;

    mensagem +=
        "🛒 *PEDIDO:*%0A";

    // PRODUTOS
    pedido.forEach(produto => {

        const subtotal =
            produto.preco * produto.quantidade;

        total += subtotal;

        mensagem +=
            `• ${produto.quantidade}x ${encodeURIComponent(produto.nome)} - R$ ${subtotal.toFixed(2).replace(".", ",")}%0A`;

    });

    // TOTAL
    mensagem +=
        `%0A💰 *TOTAL: R$ ${total.toFixed(2).replace(".", ",")}*`;

    /*
       ==================================
       NÚMERO DO WHATSAPP DO VENDEDOR
       ==================================

       POR ENQUANTO DEIXE ASSIM.

       Depois vamos trocar pelo número
       real do empreendedor.
    */

    const telefone =
        "5500000000000";

    // CRIAR LINK DO WHATSAPP
    const url =
        `https://wa.me/${telefone}?text=${mensagem}`;

    // ABRIR WHATSAPP
    window.open(url, "_blank");
}