export const w = 10;
export const h = 20;
const initialFoodState = { x: 2, y: 7 };
const initialBodyState = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
];
export const initialSnakeState = {
  body: initialBodyState,
  food: initialFoodState,
  direction: 'right',
  directionChanged: false,
};
export const initialGameState = { score: 0, lost: false, pause: false };
