import { observer } from 'mobx-react';
import React from 'react';

import Button from '../Button';
import {
  List,
  ListItem,
  Container,
  ListItemTitle,
} from './styles';

function TodoListView({ tasks }) {
  const renderListItems = () => tasks.map(({
    id, title, isDone, remove, toggle,
  }) => (
    <ListItem key={id}>
      <label>
        <input
          type="checkbox"
          checked={isDone}
          onChange={toggle}
        />
        <ListItemTitle isDone={isDone}>{title}</ListItemTitle>
      </label>
      <Button onClick={remove}>Удалить</Button>
    </ListItem>
  ));

  const isTasksListEmpty = tasks.length === 0;

  return (
    <Container>
      {isTasksListEmpty
        ? 'Список заданий пуст'
        : (
          <List>
            {renderListItems()}
          </List>
        )}
    </Container>
  );
}

export const TodoList = observer(TodoListView);
