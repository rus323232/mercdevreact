import React, { useState, useCallback } from 'react';

import Button from '../button';
import { ButtonsHolder, TaskInput, TaskForm } from './styles';

export function TaskInputForm({ onSubmit }) {
  const [task, updateTask] = useState('');

  const handleTaskChange = (event) => {
    updateTask(event.target.value);
  };

  const clearInput = () => {
    updateTask('');
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!onSubmit) return;

      onSubmit(task);
      clearInput();
    },
    [onSubmit, task],
  );
  return (
    <TaskForm onSubmit={handleSubmit}>
      <label>
        Задание
        <TaskInput type="text" required value={task} onChange={handleTaskChange} />
      </label>
      <ButtonsHolder>
        <Button type="submit">Добавить</Button>
        <Button type="button" onClick={clearInput}>Очистить</Button>
      </ButtonsHolder>
    </TaskForm>
  );
}
