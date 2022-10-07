import styled from 'styled-components';
import {Link} from 'react-router-dom';
import img from "../Assets/images/soccer.jpg";

export const HeroContainer = styled.div`
background-image: linear-gradient( to top right, rgba(11, 10, 10, 0.38), rgba(11, 10, 10, 0.19)), url(${img});
background-position: center;
background-repeat: no-repeat;
background-size: cover;
height: 74vh;
@media only screen and (max-width:1600px) {
    height: 85vh;
   
}
`;

export const HeroContent = styled.section`
height: 100%;
width: 100%;
position: relative;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
color: #FFFEFE;
@media only screen and (max-width:375px) {
    text-align: start;
    height: 50%;
  
}
`;

export const HeroContentText = styled.div`
width: 50%;
padding-top: 2rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
@media only screen and (max-width:600px) {
    width: 80%;
}
@media only screen and (max-width:375px) {
    position: absolute;
    align-items: flex-start;
}
`;

export const HeroTitle = styled.h1`
font-size: clamp(0.5rem, 1.0vw, 2rem);
font-weight: 800;
letter-spacing: .1rem;
line-height: 2.0;
`;

export const HeroTitleText = styled.span`
display: block;
`;

export const HeroSubTitle = styled.h2`
font-size: clamp(0.5rem, 2.0vw, 1rem);
font-weight: 300;
letter-spacing: 0.5rem;
padding-top: 1rem;
`;

export const HeroText = styled.h3`
font-size: clamp(0.5rem, 2.0vw, 1rem);
font-weight: 400;
padding: 2.5rem 2rem;
@media only screen and (max-width:375px) {
    padding: 1.5rem 0;
}
`;

export const HeroBtn = styled(Link)`
text-decoration: none;
outline: none;
border: none;
`;