import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export const Label = styled.label`
  &:not(:last-child) {
    margin-right: 15px;
  }
`;

export const Radio = styled.input.attrs({ type: 'radio' })`
  margin-right: 10px;
`;

export const Title = styled.div`
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
`;
