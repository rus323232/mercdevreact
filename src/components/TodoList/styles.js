import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const List = styled.ul`
  width: 100%;
  margin: 10px 0;
  padding: 0;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

export const ListItemTitle = styled.span`
  text-decoration: ${({ isDone }) => (isDone ? 'line-through' : 'none')};
`;
