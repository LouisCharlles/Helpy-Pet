function initAnimatedScroll(){
    const sections = document.querySelectorAll(".js-scroll");
    if(sections.length){
        function animateScroll(){
            const windowMetade = window.innerHeight * 0.6;
            sections.forEach((section)=>{
                const sectionTop = section.getBoundingClientRect().top;
                const sectionIsVisible = (sectionTop - windowMetade) < 0;
                if(sectionIsVisible){
                    section.classList.add("ativo");
                }
            })
        }
    animateScroll();
    window.addEventListener('scroll',animateScroll);
    }
}
initAnimatedScroll();