import * as PIXI from 'pixi.js'

import './styles/index.css';

const width = 2000;
const height = 1531;
const container = document.getElementById('px-render');

let canvas;
let raf;
let stage;
let displacementFilter;
let displacementSprite;
let count = 0;

const renderer = new PIXI.autoDetectRenderer({
  width,
  height,
  transparent: true,
});

renderer.autoResize = true;

function setScene(url) {
  container.appendChild(renderer.view);

  stage = new PIXI.Container();

  const tp = PIXI.Texture.from(url);
  const preview = new PIXI.Sprite(tp);

  preview.anchor.x = 0;

  displacementSprite = PIXI.Sprite.from('assets/img/ripple.jpg');

  displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

  displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

  displacementSprite.scale.y = 0.7;
  displacementSprite.scale.x = 1.0;


  stage.addChild(displacementSprite);

  stage.addChild(preview);

  animate();
}

// keeping this around in case we need to remove the animation
function removeScene () {
  cancelAnimationFrame(raf);

  stage.removeChildren();
  stage.destroy(true);

  container.removeChild(canvas);
}


function animate() {
  // effectively intensity
  const countMultiplier =50;
  // effectively speed
  const countIncrement = 0.10;

  raf = requestAnimationFrame(animate);

  displacementSprite.x = count * countMultiplier;
  displacementSprite.y = count * countMultiplier;

  count += countIncrement;

  stage.filters = [displacementFilter];

  renderer.render(stage);

  canvas = container.querySelector('canvas');
}

setScene('assets/img/marbled-background-texture.png');