import classes from './Header.module.css';
function Header(props) {
  const { showInfo, info } = props;
  const [score, onPause, target, level] = info;
  return (
    <header>
      <h1>Snake Game</h1>

      {showInfo && (
        <>
          <p>
            <div className={classes.level}> Level {level}</div>
            eat {target} apples to go up!
          </p>
          <div className={classes.infoCon}>
            <p className={classes.score}>Score: {score} </p>
            <p>
              {onPause
                ? 'Press arrow keys to continue'
                : 'Press space bar to pause game'}
            </p>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
