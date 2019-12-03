import styled from 'styled-components';

export const ContentHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ centered }) => (centered ? 'center' : 'flex-start')};
  justify-content: ${({ centered }) => (centered ? 'center' : 'flex-start')};
  margin-left: auto;
  margin-right: auto;
  max-width: ${({ theme }) => theme.spacing.contentSize};
  width: 100%;
  min-height: ${({ fullHeight }) => (fullHeight ? '100vh' : 'auto')};
`;
