let main = document.querySelector("main");

let entrada = null;

let intervalo = null;

let ge = {
  funcao: {
     aaBb(id1, id2){
        const a = document.getElementById(id1).getBoundingClientRect();
        const b = document.getElementById(id2).getBoundingClientRect();

        return (
          a.left < b.right &&
          a.right > b.left &&
          a.top < b.bottom &&
          a.bottom > b.top
      );
     },
     dragDrop(id){
        let i = document.getElementById(id);
        
        let apertando = false;
        
        let offsetX = null;
        let offsetY = null;
        
        i.addEventListener("pointerdown",(e)=>{
          apertando = true;
          offsetX = e.offsetX
          offsetY = e.offsetY
        })
        
        window.addEventListener("pointermove",(e)=>{
          if(apertando){
            i.style.left = (e.clientX - offsetX) + "px";
            i.style.top = (e.clientY - offsetY) + "px";
            
          }
        })
        
        window.addEventListener("pointerup",()=>{
          apertando = false;
        })
      },
      
      
      async carregar(arquivo, id, destino) {
    try {
        const resposta = await fetch(arquivo);

        if (!resposta.ok) {
            console.warn(`Não foi possível carregar ${arquivo}.`);
            return false;
        }

        const extensao = arquivo.split(".").pop().toLowerCase();

        if (extensao === "svg") {
            const texto = await resposta.text();
            destino.insertAdjacentHTML("beforeend", texto);
        }

        else if (["png", "jpg", "jpeg", "webp", "gif"].includes(extensao)) {
            const img = document.createElement("img");
            img.src = arquivo;
            img.id = id;
            destino.appendChild(img);
        }

        else {
            console.warn("Formato não suportado.");
            return false;
        }

        return true;

    } catch (erro) {
        console.error(erro);
        return false;
    }
   }
  }
}

player = {
        fome: 100,
        sono: 100,
        humor: 100,
        id: "mostarda",
        spriteAtual: "../Sprites/gatin.png",
        destino: document.querySelector("main"),
        update(){
          document.querySelector("#fome").textContent = this.fome
          
          document.querySelector("#sono").textContent = this.sono
          
          document.querySelector("#humor").textContent = this.humor
        },
        
    add(item, valor){
     this[item] = Math.min(100, Math.max(0, this[item] + valor));
     this.update();
   },

    remove(item, valor){
     this[item] = Math.min(100, Math.max(0, this[item] - valor));
     this.update();
    }
}


let comidas = []

const comida = {
  adicionar(elemento){
    ge.funcao.carregar(elemento.arq,elemento.id,elemento.destino).then(()=>{
      ge.funcao.dragDrop(elemento.id)
    })
  }
}

window.addEventListener("load",()=>{
  entrada = Date.now();
  saida = Number(localStorage.getItem("saida"))
  
  if(saida){
     intervalo = Math.floor((entrada - saida) / 60000)
     console.log(intervalo)
  }
})

window.addEventListener("pagehide",()=>{
  localStorage.setItem("saida",Date.now());
})