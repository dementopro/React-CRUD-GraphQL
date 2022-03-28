import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';

import TodoItem from './TodoItem';

export const GET_TODOS_ALL = gql`
  query getTodos {
    todoall {
      _id
      title
      description
      complete
    }
  }
`;


const TodoAll = () => (
  <Query query={GET_TODOS_ALL}>
    {({ loading, data }) => {
      const { todoall } = data;

      if (loading) {
        return (
          <center>
            <CircularProgress size={50} />
          </center>
        );
      }

      if (todoall.length === 0) {
        return (
          <List>
            <ListItem>
              <ListItemText>There is no objects yet.</ListItemText>
            </ListItem>
          </List>
        );
      }

      return <List>{todoall.map(({ _id: id, ...item }) => <TodoItem key={id} id={id} {...item} getAll={true} />)}</List>;
    }}
  </Query>
);


export default TodoAll;
