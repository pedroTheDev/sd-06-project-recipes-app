import styled from 'styled-components';

const FooterContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  div {
    background-color: white;
    position: fixed;
    bottom: 0;
    padding: 8px 0;
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

export default FooterContainer;