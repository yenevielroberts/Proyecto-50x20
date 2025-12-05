

const btnModoOscuro=document.getElementById('btn-modo-oscuro')


btnModoOscuro.addEventListener("click",()=>{

    const body=document.getElementById('body')
    const textos=document.getElementsByTagName('p')
    const labels=document.getElementsByTagName('label')
    const icons=document.getElementsByClassName('icons-outlined')

    body.removeAttribute("class","body-claro")
    body.setAttribute("class","body-oscuro")

    for(let t =0; t<textos.length; t++){

        textos[t].removeAttribute("class","p-modo-claro")
         textos[t].setAttribute("class","p-modo-oscuro")
    }

    for(let i =0; i<icons.length; i++){

        icons[i].style.color="#F5F6FA"
        
    }

    for(let l =0; l<labels.length; l++){

        labels[l].style.color="#F5F6FA";
    }

        
   

})