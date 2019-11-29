import React, { useCallback } from 'react';

import {
  Radio,
  Title,
  Label,
  Container,
} from './styles';

export function Filter({ items = [], checkedItemId, onChange }) {
  const handleOnChange = useCallback(
    id => () => {
      if (!onChange) return;

      onChange({ id });
    }, [onChange],
  );

  return (
    <Container>
      <Title>Фильтр</Title>
      {items.map(({ id, title }) => (
        <Label key={id}>
          <Radio
            value={id}
            checked={id === checkedItemId}
            onChange={handleOnChange(id)}
          />
          {title}
        </Label>
      ))}
    </Container>
  );
}
