import { observer } from 'mobx-react-lite';
import React from 'react';

import Button from '../button';
import {
  List,
  ListItem,
  Container,
  ListItemTitle,
} from './styles';

function TodoListView({ tasks }) {
  const renderListItems = () => tasks.map(({
    id,
    title,
    isDone,
    isTaskPinned,
    pin,
    unpin,
    remove,
    toggle,
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
      {isTaskPinned
        ? <Button onClick={unpin}>Открепить</Button>
        : <Button onClick={pin}>Закрепить</Button>}
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
