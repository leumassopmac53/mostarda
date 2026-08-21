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
  e.animacoes[e.anim].frame = 0
  e.anim = anim
}

function loop(delta){

  animar(gato,delta,gato.img)
  requestAnimationFrame(loop)
}

function iniciarJogo(){
requestAnimationFrame(loop)
}

const imagens = [
  "./comer/sprite(1).png",
  "./comer/sprite(2).png",
  "./comer/sprite(3).png",
  "./comer/sprite(4).png",
  "./comer/sprite(5).png",
  "./comer/sprite(6).png",
  "./comer/sprite(7).png",
  "./comer/sprite(8).png",
  "./comer/sprite(9).png"
]

const sprites = imagens.map(src => {
  const img = new Image()
  img.src = src
  return img
})

Promise.all(
  sprites.map(img => {
    return new Promise(resolve => {
      img.onload = resolve
    })
  })
).then(() => {
  iniciarJogo()
})