import styled from 'styled-components';

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    width: 50%;
  }
`;
export const DivComponent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const UlCard = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5%;
`

export const ButtonList = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5%;
`