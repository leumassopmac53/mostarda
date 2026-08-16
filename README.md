# PWA Mostarda

## Descrição

O Mostarda é um jogo do tipo pet virtual, feito sob medida pelo criador para uso pessoal.

## Linguagens utilizadas

- HTML
- CSS
- SVG
- JavaScript

## Ferramentas utilizadas

- Acode
- Conversor (converte SVG para PNG, feito pelo criador do app)
- GitHub Pages
- PWABuilder

## Componentes

Atualmente, o sistema de comida foi componentizado, enquanto o **Mostarda** (pet virtual) possui sua própria lógica.

Com esse novo passo, poderão ser adicionados mais componentes, já que existe uma grande possibilidade de crescimento do projeto.

## Histórico

- **v1.0.0**  
  Essa versão apresentava o sistema de `dragDrop` e o sistema de status, porém possuía problemas no `dragDrop` da comida. A comida não aparecia inicialmente no local desejado e havia bugs nos status devido ao **requestAnimationFrame**, que disparava várias vezes a função responsável por aumentar o status.

  Além disso, o código estava desorganizado e não possuía uma arquitetura definida, com partes componentizadas sem uma necessidade clara e sem uma separação bem definida de responsabilidades.

- **v1.0.1**  
  Essa versão resolveu problemas do `dragDrop`, além de definir melhor a arquitetura e a organização do código. Também foi realizada uma melhoria na hitbox da comida, especificamente da **maçã**.
