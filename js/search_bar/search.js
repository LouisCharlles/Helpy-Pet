const btnBuscar = document.querySelector(".btn-buscar");
const searchSection = document.getElementById("search-section");

btnBuscar.addEventListener("click",()=>{
    if(searchSection.style.display ==="none"){
        searchSection.style.display = "block";
    }
    else{
        searchSection.style.display = "none";
    }
})
function search_animal() {
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('animals');

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "list-item";
        }
    }
}
search_animal();