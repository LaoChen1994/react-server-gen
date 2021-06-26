import React, { Component } from 'react'

export default class MultiChidren extends Component {

  render() {
    console.log('children ->', this.props.children)
    const children = React.Children.map(this.props.children, (item)=>{return [item,[item,] ]})

    return (
      <div>
        { children }
      </div>
    )
  }
}
