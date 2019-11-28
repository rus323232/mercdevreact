import styled from 'styled-components';

export const Button = styled.button`
  border: 0;
  margin: 10px 0;
  cursor: pointer;
  display: flex;
  position: relative;
  align-items: center;
  user-select: none;
  vertical-align: middle;
  -moz-appearance: none;
  justify-content: center;
  text-decoration: none;
  padding: 6px 16px;
  font-size: 0.875rem;
  min-width: 64px;
  box-sizing: border-box;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
  color: #fff;
  background-color: #1976d2;
  &:focus {
    outline: 1px ${({ theme }) => theme.colors.accent} dotted;
  }
`;
