import { w, h } from './initial-state';
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function randomLocation() {
  return { x: randomInt(0, w - 1), y: randomInt(0, h - 1) };
}
export function parseKeyCode(code) {
  let direction;
  switch (code) {
    case 37:
      direction = 'left';
      break;
    case 38:
      direction = 'up';
      break;
    case 39:
      direction = 'right';
      break;
    case 40: //down
      direction = 'down';
      break;
    default:
      direction = 'right';
  }

  return direction;
}
export function wrongDirections(dir, code) {
  return (dir === 'right' && code === 37) ||
    (dir === 'left' && code === 39) ||
    (dir === 'up' && code === 40) ||
    (dir === 'down' && code === 38)
    ? true
    : false;
}
