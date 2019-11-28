import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-size: ${({ theme }) => theme.font.size};
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.font.family}, sans-serif;
  }
  div,
  section,
  article {
    box-sizing: border-box;
  }
`;
