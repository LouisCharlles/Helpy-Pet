function ativarFormDeAdicionarProduto() {
    const botaoAdicionarProduto = document.querySelector(".area-controles .botao-adicionar-produto");
    const wrapper = document.querySelector(".wrapper");
    botaoAdicionarProduto.addEventListener("click", () => {
        wrapper.style.display = "block";
    });
}
ativarFormDeAdicionarProduto();


function desativarFormDeAdicionarProduto() {
    const botaoCancelarProduto = document.querySelector(".wrapper .botao-cancelar-produto");
    botaoCancelarProduto.addEventListener("click", () => {
        const wrapper = document.querySelector(".wrapper");
        wrapper.style.display = "none";
    });
}
desativarFormDeAdicionarProduto();

const nomeProduto = document.getElementById("produto-estoque");
const categoriaProduto = document.getElementById("categoria-estoque");
const precoProduto = document.getElementById("preco-estoque");
const quantidadeProduto = document.getElementById("quantidade-estoque");
const botaoAdicionar = document.querySelector(".wrapper .botao-salvar-produto");
const botaoCancelar = document.querySelector(".wrapper .botao-cancelar-produto");


function adicionarProduto() {
    const tabelaListagemProdutosBody = document.querySelector(".tabela-listagem-produtos tbody");
    botaoAdicionar.addEventListener("click", (event) => {
    event.preventDefault(); // Impede envio do formulário

    const nome = nomeProduto.value;
    const categoria = categoriaProduto.value;
    const preco = Number(precoProduto.value);
    const quantidade = Number(quantidadeProduto.value);

    if (nome && categoria && preco && quantidade >= 0) {
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td>${nome}</td>
            <td>${categoria}</td>
            <td>R$ ${preco.toFixed(2)}</td>
            <td>${quantidade}</td>
            <td><i class="fas fa-edit icone-acao"></i> <i class="fas fa-exclamation-triangle icone-alerta"></i></td>
        `;
        novaLinha.classList.add("linha-produto");

        if (Number(quantidade) === 0) {
            novaLinha.classList.add("estoque-esgotado");
        } else if (Number(quantidade) <= 5) {
            novaLinha.classList.add("estoque-baixo");
        } else if (Number(quantidade) >= 10) {
            novaLinha.classList.add("estoque-normal");
        }

        tabelaListagemProdutosBody.appendChild(novaLinha);
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
});

}

adicionarProduto();