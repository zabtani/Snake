import classes from './Net.module.css';
import Cube from '../Cube/Cube';
import { useState, useEffect } from 'react';
function Net(props) {
  const { snakeFood, check, size } = props;
  const { width, height } = size;
  const [net, setNet] = useState([]);

  useEffect(() => {
    let n = [];
    for (let i = 0; i < width; i++) {
      for (let x = 0; x < height; x++) {
        n.push({ x: i, y: x });
      }
    }
    setNet(n);
  }, [width, height]);
  return (
    <div className={classes.net}>
      {net.map((cube) => {
        return (
          <Cube
            key={Math.random().toString()}
            bodyPart={check(cube)}
            food={snakeFood.y === cube.y && snakeFood.x === cube.x}
          />
        );
      })}
    </div>
  );
}

export default Net;
