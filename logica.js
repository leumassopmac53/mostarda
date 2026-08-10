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
     dragDrop(id) {
    const i = document.getElementById(id);

    let apertando = false;
    let offsetX = 0;
    let offsetY = 0;

    i.style.touchAction = "none";

    i.addEventListener("pointerdown", (e) => {
        apertando = true;

        const rect = i.getBoundingClientRect();

        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        i.setPointerCapture(e.pointerId);
    });

    i.addEventListener("pointermove", (e) => {
        if (!apertando) return;

        const rectMain = main.getBoundingClientRect();

        i.style.left =
            (e.clientX - rectMain.left - offsetX) + "px";

        i.style.top =
            (e.clientY - rectMain.top - offsetY) + "px";
    });

    i.addEventListener("pointerup", (e) => {
        apertando = false;
        i.releasePointerCapture(e.pointerId);
    });
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
            img.style.position = "absolute"
            img.style.touchAction = "none"
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
        arq: "./icon-512.png",
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
  },
  
  aabb(comida, entidade){
  if(ge.funcao.aaBb(comida.id, entidade)){

    player.add("fome", 5);

    const elemento = document.getElementById(comida.id);

    elemento.remove();
  }
}
}

function aplicarConsequencias(minutos){

  let fome = Math.floor(minutos * 0.5);
  let sono = Math.floor(minutos * 0.3);
  let humor = Math.floor(minutos * 0.2);

  player.remove("fome", fome);
  player.remove("sono", sono);
  player.remove("humor", humor);

  if(player.fome <= 20){
    player.remove("humor", 5);
  }

  if(player.sono <= 20){
    player.remove("humor", 5);
  }
}


window.addEventListener("load",()=>{
  entrada = Date.now();
  saida = Number(localStorage.getItem("saida"))
  
  player.fome = Number(localStorage.getItem("fome"))
  
  player.sono = Number(localStorage.getItem("sono"))
  
  player.humor = Number(localStorage.getItem("humor"))
  
  if(saida){
     intervalo = Math.floor((entrada - saida) / 60000)
     console.log(intervalo)
  }
  if(saida){
   aplicarConsequencias(intervalo)
  }
  player.update();
})

window.addEventListener("pagehide",()=>{
  localStorage.setItem("saida",Date.now());
  localStorage.setItem("fome",player.fome)
  localStorage.setItem("humor",player.humor)
  localStorage.setItem("sono",player.sono)
})