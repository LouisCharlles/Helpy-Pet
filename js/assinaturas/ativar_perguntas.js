const lista_de_botoes = document.querySelectorAll("dt > button");

function mostraTexto(event){
    const pergunta = event.currentTarget;
    const aria_controls = pergunta.getAttribute("aria-controls");
    const pergunta_resposta = document.getElementById(aria_controls);
    pergunta_resposta.classList.toggle("ativa");
    const contem_classe_ativa = pergunta_resposta.classList.contains("ativa");
    pergunta.setAttribute("aria-expanded",contem_classe_ativa); 
}
function adicionaClique(botao){
    botao.addEventListener("click",mostraTexto);
}
lista_de_botoes.forEach(adicionaClique);