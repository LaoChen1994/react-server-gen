import React, { Component, createRef, RefObject } from 'react';
import ReactDOM from 'react-dom';
import About from './about';
import styles from './style.css'
import MultiChildren from './MultiChildren'
import Hello from './hello'

interface AppComponent {
  title: string;
}

export default class App extends Component<{}, AppComponent> {
  aboutRef: RefObject<any>

  constructor(props) {
    super(props);

    this.state = {
      title: 'this is test 2 ',
    };
    this.aboutRef = createRef()
  }


  render() {
    const { title } = this.state;

    return (
      <MultiChildren>
        <h1 className={styles.font}>{title}</h1>
        <About title='123' ref={this.aboutRef} />
        <Hello />
        <div>
          <div>123</div>
          <div>456</div>
        </div>
      </MultiChildren>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
