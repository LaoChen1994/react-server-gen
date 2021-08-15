import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Home } from './home';

interface AppComponent {
  title: string;
}

export default class App extends Component<unknown, AppComponent> {
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
        <Home />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
