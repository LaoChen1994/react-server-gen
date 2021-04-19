import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { About } from './about';

interface AppComponent {
  title: string;
}

export default class App extends Component<{}, AppComponent> {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Hello World',
    };
  }

  render() {
    const { title } = this.state;

    return (
      <div>
        <h1>{title}</h1>
        <About />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
