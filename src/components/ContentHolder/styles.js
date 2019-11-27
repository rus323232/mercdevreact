import styled from 'styled-components';

export const ContentHolder = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${({ theme }) => theme.spacing.contentSize};
  width: 100%;
`;
