import React, { useState, useCallback } from 'react';

import Input from '../Input';
import { FormButton, ButtonsHolder } from './styles';

export function TaskInputForm({ onSubmit }) {
  const [task, updateTask] = useState('');

  const handleTaskChange = (event) => {
    updateTask(event.target.value);
  };

  const onClear = () => {
    updateTask('');
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (onSubmit) {
        onSubmit();
      }
    },
    [onSubmit],
  );
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Задание
        <Input type="text" value={task} onChange={handleTaskChange} />
      </label>
      <ButtonsHolder>
        <FormButton type="submit">Добавить</FormButton>
        <FormButton type="button" onClick={onClear}>Очистить</FormButton>
      </ButtonsHolder>
    </form>
  );
}
