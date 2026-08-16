let saida = null;
let entrada = null;
let intervalo = null;

function aabb(a, b) {
  return (
    a.left < b.right &&
    a.right > b.left &&
    a.top < b.bottom &&
    a.bottom > b.top
  );
}


const gato = {
  fome: 100,
  sono: 100,
  humor: 100,
  sprite: "./icon-1200.png",

  render: {
    Status(gato) {
      document.querySelector("#fome").setAttribute("width", gato.fome);
      document.querySelector("#humor").setAttribute("width", gato.humor);
      document.querySelector("#sono").setAttribute("width", gato.sono);
    },

    Sprite(gato) {
      document.querySelector("#player").src = gato.sprite;
    }
  },

  aumentar(item, valor) {
    this[item] = Math.min(100, Math.max(0, this[item] + valor));
    gato.render.Status(this);
  },

  diminuir(item, valor) {
    this[item] = Math.min(100, Math.max(0, this[item] - valor));
    gato.render.Status(this);
  },

  consequencias(tempo) {
    this.diminuir("fome", 0.3 * tempo);
    this.aumentar("sono", 0.2 * tempo);
    this.diminuir("humor", 0.1 * tempo);
   
    localStorage.setItem("fome",this.fome);
    localStorage.setItem("humor",this.humor);
    localStorage.setItem("sono",this.sono);
  }
};

const img = document.querySelector("#comida")

const comida = {
  comidas: [],

  adicionar(elemento){
    this.comidas.push(elemento)
  },

  render: {
    sprite(nome){
      comida.comidas.forEach(c=>{
        if(c.nome === nome){
          img.src = c.arq
        }
      })
    }
  },

  dragDrop(img){

    let x = null;
    let y = null;

    img.addEventListener("pointerdown",(e)=>{
      img.classList.remove("frezze")
      const rect = document.querySelector("main").getBoundingClientRect();

      x = (e.clientX - rect.left - img.offsetWidth / 2);
      y = (e.clientY - rect.top - img.offsetHeight / 2);
    })
    
    img.addEventListener("pointermove",(e)=>{
      const rect = document.querySelector("main").getBoundingClientRect();

      x = (e.clientX - rect.left - img.offsetWidth / 2);
      y = (e.clientY - rect.top - img.offsetHeight / 2);
    img.style.left = (x + "px");
    img.style.top = (y + "px");
    })

    img.addEventListener("pointerup",()=>{
      const gatoRect = document.querySelector("#player").getBoundingClientRect();
const comidaRect = img.getBoundingClientRect();

if (aabb(comidaRect, gatoRect)) {
  gato.aumentar("fome",5)
  gato.aumentar("humor",2)
}
      img.style.left = "50%";
      img.style.top = "70%";
      img.style.transform = "translateX(-50%)";
    })
  }
}



/* SISTEMA DE TEMPO FORA */
window.addEventListener("load",()=>{
  gato.render.Sprite(gato)
    saida = Number(localStorage.getItem("saida"));
    
    entrada = Date.now();
    
    intervalo = Math.floor((entrada - saida) / 60000)

    gato.fome = Number(localStorage.getItem("fome"));
    
    gato.sono = Number(localStorage.getItem("sono"));
    
    gato.humor = Number(localStorage.getItem("humor"));

    gato.consequencias(intervalo);
  })

window.addEventListener("visibilitychange",()=>{
  if(document.visibilityState === "hidden"){
    saida = Date.now();
    
    localStorage.setItem("saida",saida);
    localStorage.setItem("fome",gato.fome);
    localStorage.setItem("humor",gato.humor);
    localStorage.setItem("sono",gato.sono);
  }
})

setInterval(()=>{
  gato.diminuir("sono",0.3)
},5000)
