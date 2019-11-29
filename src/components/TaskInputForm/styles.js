import styled from 'styled-components';

import Input from '../Input';

export const ButtonsHolder = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const TaskInput = styled(Input)`
  margin-top: 10px;
  width: 100%;
`;

export const TaskForm = styled.form`
  width: 100%;
`;
