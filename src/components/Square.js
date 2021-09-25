import styles from './Square.module.css';
function Square(props) {
  const snakeHead = props.bodyPart.part === 'head';
  const snakeBody = props.bodyPart.part === 'body';
  let sq;
  if (snakeHead) {
    let deg;
    let stop = false;
    switch (props.bodyPart.dir) {
      case 37: //left
        deg = '0';
        break;
      case 38: //up
        deg = '90';
        break;
      case 39: //rigth
        deg = '180';
        break;
      case 40: //down
        deg = '270';
        break;
      case 'stop':
        stop = true;
        break;
    }
    sq = (
      <div
        style={{ transform: `rotate(${deg}deg)` }}
        className={`${styles.square} ${
          !stop ? styles.head : styles.headOnStop
        }  `}
      >
        {stop && <span>Pause</span>}
      </div>
    );
  } else if (props.food) {
    sq = <div className={`${styles.square}  ${styles.food} `}></div>;
  } else if (snakeBody) {
    sq = <div className={`${styles.square} ${styles.on}`}> </div>;
  } else {
    sq = <div className={`${styles.square} `}></div>;
  }

  return <>{sq}</>;
}

export default Square;
