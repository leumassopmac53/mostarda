ge.funcao.carregar(player.arq,player.id,player.destino);

let maca = {
  arq:"./maca.png",
  id:"maca",
  destino:main,
  x:"100px",
  y:"500px"
}

comida.adicionar(maca)

function loop(){

  const mostarda = document.getElementById("mostarda");
  const macaEl = document.getElementById("maca");

  if(mostarda && macaEl){
    comida.aabb(maca, player.id);
  }

  requestAnimationFrame(loop);
}

loop();