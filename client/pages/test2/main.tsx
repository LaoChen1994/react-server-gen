import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { About } from './about';
import styles from './style.css'

interface AppComponent {
  title: string;
}

export default class App extends Component<{}, AppComponent> {
  constructor(props) {
    super(props);

    this.state = {
      title: 'this is test 2 ',
    };
  }

  render() {
    const { title } = this.state;
    console.log(styles)

    return (
      <div>
        <h1 className={styles.font}>{title}</h1>
        <About />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
