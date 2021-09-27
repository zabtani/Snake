import classes from './Cube.module.css';
function Cube(props) {
  const snakeHead = props.bodyPart.part === 'head';
  const snakeBody = props.bodyPart.part === 'body';
  let cube;
  if (snakeHead) {
    let deg;
    let stop = false;
    switch (props.bodyPart.dir) {
      case 'left':
        deg = '0';
        break;
      case 'up':
        deg = '90';
        break;
      case 'right':
        deg = '180';
        break;
      case 'down':
        deg = '270';
        break;
      case 'stop':
        stop = true;
        break;
      default:
        deg = '0';
    }
    cube = (
      <div
        style={{ transform: `rotate(${deg}deg)` }}
        className={`${classes.cube} ${
          !stop ? classes.snakeHead : classes.snakeHeadOnStop
        }  `}
      >
        {stop && <span>Pause</span>}
      </div>
    );
  } else if (props.food) {
    cube = <div className={`${classes.cube}  ${classes.food} `}></div>;
  } else if (snakeBody) {
    cube = <div className={`${classes.cube} ${classes.snakeBody}`}> </div>;
  } else {
    cube = <div className={`${classes.cube} `}></div>;
  }

  return <>{cube}</>;
}

export default Cube;
