import { useEffect, useRef, useState } from 'react';
import { randomLocation, parseKeyCode, wrongDirections } from './app-helper';
import { initialSnakeState, initialGameState, w, h } from './initial-state';
import classes from './App.module.css';
import Header from './components/Header/Header';
import Net from './components/Net/Net';
import GameOver from './components/GameOver/GameOver';
function App() {
  const isDesktop = window.innerWidth > 850;
  const intervalRef = useRef(() => {});
  const [game, setGame] = useState(initialGameState);
  const [snake, setSnake] = useState(initialSnakeState);
  const HeadX = snake.body[0].x;
  const HeadY = snake.body[0].y;
  const snakeAction = (property, value) => {
    setSnake((prev) => {
      return { ...prev, [property]: value };
    });
  };
  const snakeOnCube = (cube, part = snake.body) => {
    let onCube = false;
    part.forEach((cell) => {
      if (cell.y === cube.y && cell.x === cube.x) onCube = true;
    });
    return onCube;
  };
  const checkDeath = () => {
    const snakeBody = snake.body.slice(1);
    const headHitBody = snakeOnCube(snake.body[0], snakeBody);
    if (headHitBody) {
      setGame((prevState) => {
        return { ...prevState, lost: true, pause: true };
      });
    }
  };
  const setIntervalRef = (callback) => {
    intervalRef.current = callback;
  };
  setIntervalRef(() => move());
  useEffect(() => {
    if (!game.pause) {
      const interval = setInterval(() => {
        snakeAction('directionChanged', false);
        intervalRef.current();
      }, game.speed);
      return () => clearInterval(interval);
    }
  }, [game.pause, game.speed]);
  const checkFood = () => {
    let ate = false;
    if (snake.food.y === HeadY && snake.food.x === HeadX) {
      setGame((prev) => {
        return {
          ...prev,
          score: prev.score + 10,
          target: prev.target === 1 ? 5 : prev.target - 1,
          speed: prev.target === 1 ? prev.speed - 5 : prev.speed,
          level: prev.target === 1 ? prev.level + 1 : prev.level,
        };
      });
      let foodLocation = randomLocation();
      while (snakeOnCube(foodLocation)) {
        foodLocation = randomLocation();
      }
      snakeAction('food', foodLocation);
      ate = true;
    }
    return ate;
  };

  const keyPress = (e) => {
    const { keyCode } = e;
    if (keyCode === 32) {
      pauseGame(true);
      return;
    }
    if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40) {
      game.pause && pauseGame(false);
      const isWrongDirections = wrongDirections(snake.direction, keyCode);
      if (isWrongDirections || (snake.directionChanged && !game.pause)) return;
      const direction = parseKeyCode(keyCode);
      snakeAction('direction', direction);
    }
    snakeAction('directionChanged', true);
  };
  document.onkeydown = keyPress;
  const checkCube = (cube) => {
    let body = { part: false, dir: null };
    snake.body.forEach((cell) => {
      if (cube.y === cell.y && cube.x === cell.x) {
        if (snake.body.indexOf(cell) === 0) {
          body.part = 'head';
          body.dir = game.pause ? 'stop' : snake.direction;
        } else {
          body.part = 'body';
        }
      }
    });
    return body;
  };
  const move = () => {
    checkDeath();
    let newSnake = [];

    switch (snake.direction) {
      case 'left':
        newSnake.push({ y: (HeadY - 1 + h) % h, x: HeadX });
        break;
      case 'up':
        newSnake.push({ y: HeadY, x: (HeadX - 1 + w) % w });
        break;
      case 'right':
        newSnake.push({ y: (HeadY + 1 + h) % h, x: HeadX });
        break;
      case 'down':
        newSnake.push({ y: HeadY, x: (HeadX + 1 + w) % w });
        break;
      default:
        return;
    }
    snake.body.forEach((cell) => {
      newSnake.push(cell);
    });
    const ate = checkFood();
    !ate && newSnake.pop();
    snakeAction('body', newSnake);
    return true;
  };
  const pauseGame = (value) => {
    setGame((prev) => {
      return { ...prev, pause: value };
    });
  };
  const restartHandler = () => {
    setSnake(initialSnakeState);
    setGame(initialGameState);
  };
  const openInDesktopAlert = (
    <p>
      Please open this game on a full screen browser tab of a desktop device.
    </p>
  );
  return (
    <div className={classes.app}>
      <Header
        showInfo={isDesktop && !game.lost}
        info={[game.score, game.pause, game.target, game.level]}
      />
      {isDesktop && !game.lost && (
        <Net
          size={{ width: w, height: h }}
          snakeFood={snake.food}
          check={checkCube}
          displayFits={isDesktop}
        />
      )}
      {!isDesktop && openInDesktopAlert}
      {game.lost && <GameOver score={game.score} restart={restartHandler} />}
      {isDesktop && <footer>Game created by omer zabtani // React.js </footer>}
    </div>
  );
}
export default App;
