import { observer } from 'mobx-react-lite';
import React from 'react';

import Button from '../button';
import {
  List,
  ListItem,
  Container,
  ListItemTitle,
} from './styles';

const TodoListItem = observer(({ listItemData }) => {
  const {
    title,
    isDone,
    toggle,
    isTaskPinned,
    pin,
    unpin,
    remove,
  } = listItemData;

  return (
    <ListItem>
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
  );
});

function TodoListView({ tasks }) {
  const isTasksListEmpty = tasks.length === 0;

  return (
    <Container>
      {isTasksListEmpty
        ? 'Список заданий пуст'
        : (
          <List>
            {tasks.map(listItemData => (
              <TodoListItem key={listItemData.id} listItemData={listItemData} />
            ))}
          </List>
        )}
    </Container>
  );
}

export const TodoList = observer(TodoListView);
