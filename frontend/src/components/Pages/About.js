import React from "react";
import styled from "styled-components";
import {Button} from '../Globalstyles';
import img from "../Assets/images/soccer.jpg";
import {
    HeroContainer,
    HeroContent,
    HeroContentText,
    HeroTitle,
    HeroTitleText,
    HeroSubTitle,
    HeroText,
    HeroBtn,

} from './About.Styles';

const Content = styled.div`
    border: 1px solid #000;
    background-image: url(${img});
    width: 150px;
    height: 150px;
`;


function About () {
    return (
       
        <div>
            <HeroContainer>
                <HeroContent>
                    <HeroContentText>
                    <HeroTitle>
                    <HeroTitleText>goalMates</HeroTitleText>
                            <HeroTitleText>Real, lasting connections for .... that last</HeroTitleText>
                        </HeroTitle>
                        <HeroSubTitle>Your new community is waiting for you. Millions of people have chosen goalMates to make real connections over the things that matter. Start a group today!</HeroSubTitle>
                        <HeroText>
                            Get a fresh and tasty recepies that are well balanced and 
                            will improve your wellness, plus add nutrients to your body.
                        </HeroText>
                        <HeroBtn to="/newgroup">
                           <Button primary big bigFont bigRadius>Start a new Goal</Button>
                        </HeroBtn>
                    </HeroContentText> 
                </HeroContent>
            </HeroContainer>
        </div>
       
    )
};

export default About;