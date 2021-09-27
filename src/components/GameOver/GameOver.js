import classes from './GameOver.module.css';
function GameOver(props) {
  const { restart, score } = props;

  return (
    <div>
      <h2>Game Over</h2>
      <p>Oh no! you ate yourself.</p>
      <button type="button" onClick={restart}>
        Restart Game
      </button>
      <p className={classes.finalScore}>Your final Score: {score} </p>
    </div>
  );
}

export default GameOver;
