import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { Button, TextField, List, ListItem, ListItemText, Tooltip } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { GetApp as GetAppIcon} from '@material-ui/icons'

import { GET_TODOS } from './TodoList';

const CREATE_TODO = gql`
  mutation createTodo($title: String!, $description: String!) {
    createTodo(title: $title, description: $description) {
      _id
      title
      description
      complete
    }
  }
`;

export default class AddTodoForm extends Component {
  state = {
    title: '',
    description: '',
  };

  handleGetTodoAll = () => {
    this.props.onChange(true)
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.props.onChange(false)
    this.setState({ [name]: value });
  };

  /**
   * Add latest added todo to list of todos
   */
  handleUpdate = (cache, { data: { createTodo } }) => {
    const { todos } = cache.readQuery({ query: GET_TODOS });

    cache.writeQuery({
      query: GET_TODOS,
      data: { todos: [...todos, createTodo] },
    });
  };

  handleSubmit = (createTodo) => async (e) => {
    e.preventDefault();

    await createTodo();
    await this.setState({
      title: '',
      description: '',
    });
  };

  render() {
    const { title, description } = this.state;

    return (
      <Mutation mutation={CREATE_TODO} variables={{ title, description }} update={this.handleUpdate}>
        {(createTodo, { loading }) => {
          return (
            <form style={{ textAlign: 'center' }} onSubmit={this.handleSubmit(createTodo)}>
              <List>
                <ListItem>
                  <ListItemText>
                    <TextField
                      name="title"
                      label="Title"
                      value={title}
                      onChange={this.handleChange}
                      margin="normal"
                      disabled={loading}
                      required
                      fullWidth
                    />
                  </ListItemText>

                  <ListItemText>
                    <TextField
                      name="description"
                      label="Description"
                      value={description}
                      onChange={this.handleChange}
                      disabled={loading}
                      margin="normal"
                      required
                      fullWidth
                    />
                  </ListItemText>
                </ListItem>
              </List>

              <div style={{ textAlign: 'center' }}>
                <Tooltip title = "Add Object" placement="top">
                  <Button disabled={loading} type="submit" aria-label="Add">
                    <AddIcon />
                  </Button>
                </Tooltip>
              </div>

              <div style={{ textAlign: 'center' }}>
                <Tooltip title="GetAll Object" placement="bottom">
                  <Button disabled={loading} onClick={this.handleGetTodoAll} >
                    <GetAppIcon />
                  </Button>
                </Tooltip>
              </div>
            </form>
          );
        }}
      </Mutation>
    );
  }
}
