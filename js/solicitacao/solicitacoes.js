const parametros = new URLSearchParams(location.search);
parametros.forEach(function ativarItem(parametro){
    const elemento = document.getElementById(parametro);
    elemento.checked = true;
})