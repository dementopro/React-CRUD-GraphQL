import React, { Component } from 'react';

import TodoList from './TodoList';
import TodoAll from './TodoAll';
import AddTodoForm from './AddTodoForm';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      getAll: false,
    }
  }

  handleChange = (value) => {
    this.setState({
      getAll: value
    })
  }

  render() {
    return (
      <div>
        { this.state.getAll ? <TodoAll /> : <TodoList />}
        <AddTodoForm onChange={this.handleChange} />
      </div>
    );
  }
}

export default App;
