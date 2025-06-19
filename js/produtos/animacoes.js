
function handleChangeProductSection(event) {
    const products_section = document.querySelector(".js-products");
    const titulo_produtos = document.querySelector(".produtos h2");
    const clickedButton = event.currentTarget;
    const todasImgProdutos = document.querySelectorAll(".produtos-lista li img");
    const titulo_produto = document.querySelectorAll(".produtos-lista li h3");
    const detalhe_produtos = document.querySelector(".produtos-detalhe");
    console.log(detalhe_produtos);
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
        titulo_produto.forEach((titulo)=>{
            titulo.innerText = "Erva para gatos";
        })
        detalhe_produtos.setAttribute("src","/img/icones/produtos_disponiveis/gato_detalhe.svg");
    } else if (clickedButton === lista_botoes[1]) {
        titulo_produtos.innerText = "Produtos Para Cachorro";
        todasImgProdutos.forEach((imagem)=>{
            imagem.setAttribute('src',"/img/produtos/produto_para_cachorro.jpg");
        })
        titulo_produto.forEach((titulo)=>{
            titulo.innerText = "Ração saborizada de frango para cachorro";
        })
        detalhe_produtos.setAttribute("src","/img/icones/produtos_disponiveis/cachorro_detalhe.svg");

    } else if (clickedButton === lista_botoes[2]) {
        titulo_produtos.innerText = "Produtos em Alta";
        todasImgProdutos.forEach((imagem)=>{
            imagem.setAttribute('src',"/img/produtos/Brinquedo.png");
        })
        titulo_produto.forEach((titulo)=>{
            titulo.innerText = "Osso de Brinquedo";
        })
        detalhe_produtos.setAttribute("src","/img/icones/produtos_disponiveis/trending_detalhe.svg");
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
    

