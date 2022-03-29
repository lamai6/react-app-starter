import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './App.styles.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  increment() {
    this.setState((state) => ({
      count: state.count + 1,
    }));
  }

  decrement() {
    this.setState(
      (state) => (state.count > 0 && { count: state.count - 1 }) || state
    );
  }

  reset() {
    this.setState(() => ({ count: 0 }));
  }

  render() {
    const { count } = this.state;
    return (
      <div id="counter">
        <h3>
          <span>Counter: </span>
          {count}
        </h3>
        <div>
          <button type="button" onClick={this.increment}>
            <FontAwesomeIcon
              icon={solid('plus')}
              size="sm"
              style={{ marginRight: '0.4em' }}
            />
            Increment
          </button>
          <button type="button" onClick={this.decrement}>
            <FontAwesomeIcon
              icon={solid('minus')}
              size="sm"
              style={{ marginRight: '0.4em' }}
            />
            Decrement
          </button>
          <button type="button" onClick={this.reset}>
            <FontAwesomeIcon
              icon={solid('xmark')}
              size="sm"
              style={{ marginRight: '0.4em' }}
            />
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default App;
