import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import Square from './components/Square';
const w = 10;
const h = 20;
const initialFoodState = { x: 2, y: 7 };
const initialGameState = { score: 0, gameOver: false };
const initialSnakeState = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
];
function App() {
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const intervalRef = useRef(() => {});
  const [snake, setSnake] = useState(initialSnakeState);
  const [direction, setDirection] = useState(39);
  const [food, setFood] = useState(initialFoodState);
  const [gameState, setGameState] = useState(initialGameState);
  const [net, setNet] = useState([]);
  const checkDeath = useCallback(() => {
    const snakeBody = snake.slice(1);
    const headHitBody = snakeOnCube(snake[0], snakeBody);
    if (headHitBody) {
      setDirection('stop');
      setGameState((prevState) => {
        return { score: prevState.score, gameOver: true };
      });
    }
  }, [snake]);
  useEffect(() => {
    if (direction !== 'stop') {
      checkDeath();
      const interval = setInterval(() => {
        intervalRef.current();
      }, 80);
      return () => clearInterval(interval);
    }
  }, [direction, checkDeath]);
  useEffect(() => {
    let n = [];
    for (let i = 0; i < w; i++) {
      for (let x = 0; x < h; x++) {
        n.push({ x: i, y: x });
      }
    }
    setNet(n);
  }, []);
  const snakeOnCube = (cube, part = snake) => {
    let onCube = false;
    part.forEach((cell) => {
      if (cell.y === cube.y && cell.x === cube.x) onCube = true;
    });
    return onCube;
  };
  const checkFood = () => {
    function randomLocation() {
      return { x: randomInt(0, w - 1), y: randomInt(0, h - 1) };
    }
    let ate = false;
    if (food.y === snake[0].y && food.x === snake[0].x) {
      setGameState((prevState) => {
        return { ...prevState, score: prevState.score + 10 };
      });
      let foodLocation = randomLocation();
      while (snakeOnCube(foodLocation)) {
        foodLocation = randomLocation();
      }
      setFood(foodLocation);
      ate = true;
    }
    return ate;
  };

  const move = () => {
    checkDeath();
    let newSnake = [];
    switch (direction) {
      case 37: //left
        newSnake.push({ y: (snake[0].y - 1 + h) % h, x: snake[0].x });
        break;
      case 38: //up
        newSnake.push({ y: snake[0].y, x: (snake[0].x - 1 + w) % w });

        break;
      case 39: //right
        newSnake.push({ y: (snake[0].y + 1 + h) % h, x: snake[0].x });
        break;
      case 40: //down
        newSnake.push({ y: snake[0].y, x: (snake[0].x + 1 + w) % w });
        break;
      default:
        return;
    }
    snake.forEach((cell) => {
      newSnake.push(cell);
    });
    const ate = checkFood();
    !ate && newSnake.pop();
    setSnake([...newSnake]);
  };
  const loopPosition = (callback) => {
    intervalRef.current = callback;
  };
  loopPosition(() => move());
  const keyPress = (e) => {
    const { keyCode } = e;
    if (
      (direction === 39 && keyCode === 37) ||
      (direction === 37 && keyCode === 39) ||
      (direction === 38 && keyCode === 40) ||
      (direction === 40 && keyCode === 38)
    ) {
      return;
    }
    if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40) {
      setDirection(keyCode);
    } else if (keyCode === 32) {
      setDirection('stop');
    }
  };
  document.onkeydown = keyPress;
  const checkBody = (cube) => {
    let body = { part: false, dir: null };
    snake.forEach((cell) => {
      if (cube.y === cell.y && cube.x === cell.x) {
        if (snake.indexOf(cell) === 0) {
          body.part = 'head';
          body.dir = direction;
        } else {
          body.part = 'body';
        }
      }
    });
    return body;
  };
  const restartHandler = () => {
    setSnake(initialSnakeState);
    setGameState(initialGameState);
    setDirection(39);
    setFood(initialFoodState);
  };
  return (
    <div className="App">
      <header>
        <h1>Snake Game</h1>
        {!gameState.gameOver && (
          <div className="infoCon">
            <p className="score">Score: {gameState.score} </p>

            <p>
              {direction === 'stop'
                ? 'Press arrow keys to continue'
                : 'Press space bar to pause game'}
            </p>
          </div>
        )}
      </header>
      {!gameState.gameOver && (
        <div className="net">
          {net.map((cube) => {
            return (
              <Square
                cube={cube}
                key={Math.random().toString()}
                bodyPart={checkBody(cube)}
                food={food.y === cube.y && food.x === cube.x}
              />
            );
          })}
        </div>
      )}
      {gameState.gameOver && (
        <div>
          <h2>Game Over</h2>
          <p>Oh no! you ate yourself.</p>
          <button type="button" onClick={restartHandler}>
            Restart Game
          </button>
          <p className="score">Your final Score: {gameState.score} </p>
        </div>
      )}
      <footer>Game created by omer zabtani // React.js </footer>
    </div>
  );
}

export default App;
