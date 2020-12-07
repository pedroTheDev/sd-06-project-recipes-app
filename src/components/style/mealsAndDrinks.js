import styled from 'styled-components';

export const MealsAndDrinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 90%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  
  div {
    margin: 0 1%;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 5%;
  width: 100%;
  
  div {
    align-content: center;
    background-color: var(--light-blue);
    border-radius: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2%;
    height: 200px;
    width: 40%;
    flex-wrap: wrap;
  }
  
  a {
    display: flex;
    flex-direction: column;
    width: 80%;
  }
    
  img {
    align-self: center;
    border-radius: 50%;
    margin-bottom: 8%;
    width: 80%;
  }
  
  p {
    text-align: center;
    align-self: center;
    width: auto;
  }
`;
