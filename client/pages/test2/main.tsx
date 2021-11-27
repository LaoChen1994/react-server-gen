import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { About } from './about';
import styles from './style.css';

interface AppComponent {
  title: string;
}

export default class App extends Component<unknown, AppComponent> {
  constructor(props: any) {
    super(props);

    this.state = {
      title: 'this is test 2 ',
    };
  }

  handleChange = () => {
    this.setState({ title: '123' });
  };

  render() {
    const { title } = this.state;

    return (
      <div>
        <h1 className={styles.font}>{title}</h1>
        <About />
        <button onClick={this.handleChange} type="button">
          title改变
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
