import styled from 'styled-components';

export const Input = styled.input`
  display: block;
  color: ${({ theme }) => theme.colors.primary};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.secondary};
  border-style: solid;
  height: 40px;
  border-radius: 10px;
  padding: 10px;
  background: none;
  box-sizing: border-box;
`;
