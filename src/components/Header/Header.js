import classes from './Header.module.css';
function Header(props) {
  const { showInfo, score, onPause } = props;

  return (
    <header>
      <h1>Snake Game</h1>
      {showInfo && (
        <div className={classes.infoCon}>
          <p className={classes.score}>Score: {score} </p>
          <p>
            {onPause
              ? 'Press arrow keys to continue'
              : 'Press space bar to pause game'}
          </p>
        </div>
      )}
    </header>
  );
}

export default Header;
