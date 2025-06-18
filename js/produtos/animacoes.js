
function handleChangeProductSection(event) {
    const products_section = document.querySelector(".js-products");
    const titulo_produtos = document.querySelector(".produtos h2");
    const clickedButton = event.currentTarget;
    const todasImgProdutos = document.querySelectorAll(".produtos-lista li img");

    
    // Resetar animação
    products_section.classList.remove("produtos-ativos");
    void products_section.offsetWidth; // Força o reflow, truque de browser
    products_section.classList.add("produtos-ativos");

    // Atualiza título conforme o botão
    if (clickedButton === lista_botoes[0]) {
        titulo_produtos.innerText = "Produtos Para Gato";
        todasImgProdutos.forEach((imagem)=>{
            imagem.setAttribute('src',"/img/produtos/cat_nip.png");
        })
    } else if (clickedButton === lista_botoes[1]) {
        titulo_produtos.innerText = "Produtos Para Cachorro";
        todasImgProdutos.forEach((imagem)=>{
            imagem.setAttribute('src',"/img/produtos/produto_para_cachorro.jpg");
        })
    } else if (clickedButton === lista_botoes[2]) {
        titulo_produtos.innerText = "Produtos em Alta";
        todasImgProdutos.forEach((imagem)=>{
            imagem.setAttribute('src',"/img/produtos/Brinquedo.png");
        })
    }

    // Controle visual de qual botão está ativo
    lista_botoes.forEach((botao) => botao.classList.remove("produto-ativo"));
    clickedButton.classList.add("produto-ativo");
}

const lista_botoes = document.querySelectorAll(".botoes-produtos li");
//Aplica função para mudar conteúdo para cada botão
lista_botoes.forEach((botao)=>{
    botao.addEventListener("click", handleChangeProductSection);
});
    

