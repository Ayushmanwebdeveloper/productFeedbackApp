import React from 'react';
import styled from 'styled-components';
import device from '../../common/MediaQueries';

const Container = styled.header`
  height: 137px;
  display: flex;
  position: relative;
  align-items: flex-end;
  @media ${device.tablet} {
    flex: 1;
    height: max-content;
  }
`;

const HeaderImg = styled.img`
  position: absolute;
  border-radius: 10px;
  z-index: -1;
`;

const HeaderTxt = styled.div`
  width: 100%;
  padding: 24px;
  h2 {
    color: #ffffff;
  }
  p {
    color: #ffffff;
    mix-blend-mode: normal;
    opacity: 0.75;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
  }
`;

const Header = () => (
  <Container>
    
    <HeaderTxt>
      <h2>Feedback App</h2>
      <p>Feedback Board by Ayushman</p>
    </HeaderTxt>
  </Container>
);

export default Header;