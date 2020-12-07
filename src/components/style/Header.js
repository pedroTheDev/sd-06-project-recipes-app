import styled from 'styled-components';

 const HeaderContainer = styled.div`
    margin-bottom: 20px;
  div {
    display: flex;
    justify-content: space-between;
    margin: auto;
    width: 90%;
    align-items: center;

    a {
      align-self: flex-start;
    }

    button {
      align-self: flex-end;
    }
  }
`;

export default HeaderContainer;