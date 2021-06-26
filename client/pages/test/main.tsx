import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Home } from './home';

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
        <Home />
      </div>
    );
  }
}
console.log('App -> ', <App />)

const renderNode = ReactDOM.render(<App />, document.getElementById('app'));
console.log('renderNode ->', renderNode)
