function animar(e, delta, img) {
  const animacao = e.animacoes[e.anim];   
  if (delta - animacao.ultimoTempo >= animacao.intervalo) {

    img.src = animacao.sprites[animacao.frame];

    animacao.frame++;

    if (animacao.frame >= animacao.sprites.length) {
      if (animacao.repeat) {
        animacao.frame = 0;
      } else {
        animacao.frame = animacao.sprites.length -1
      }
    }

    animacao.ultimoTempo = delta
  }
}

function mudarAnim(e,anim){
  e.animacoes[e.anim].ultimoTempo = 0
  e.animacoes[e.anim].frame = 0
  e.anim = anim
}

function loop(delta){

  animar(gato,delta,gato.img)
  requestAnimationFrame(loop)
}

requestAnimationFrame(loop)
