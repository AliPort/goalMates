import React from "react";
import styled from "styled-components";
import background from "../Assets/images/bgrnd1.jpeg"


function Goal(){
    return (
        <Section id="container">
            <div className="">
                <h1 className="highlight">Goal Title</h1>
                <h2>Location</h2>
                <h2>Tags</h2>
                <h2>About this goal:</h2>
            <p>Description</p>
            <h2>goalMates: list of mates who have joined the goal</h2>
            <h1>Join this Goal Button</h1>
            <a href="./Chat">Chat</a>
            </div>
        </Section>
           
    )
}

const Section = styled.section`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: grid;
  ${'' /* grid-template-columns: 50% 50%; */}
  height: 100vh; 
  align-items: center;
  .text {
    padding-left: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: rem; 
    .highlight {
      color: var(--primary-color);
    }
    h1 {
      font-size: 2.8vw;
    }
    h2 {
      font-size: 1.8vw;
    }
    p {
      font-size: 1.2vw;
    }
  }
  .image {
    img {
      width: 80%;
      height: 100%;
    }
  }
  ${'' /* @media screen and (min-width: 280px) and (max-width: 1080px) {
    display: flex;
    flex-direction: column-reverse;
    height: max-content;
    text-align: center;
    margin: 0 1rem;
    */}
    .text {
      padding-left: 0;
      display: flex;
      ${'' /* flex-direction: column; */}
      align-items: center;
      h1 {
        font-size: 8vw;
      }
      p {
        font-size: 5vw;
      }
    }
    .container {
        display: ;
        padding-top: px;
        width: 100%;
        height: 100%;

    }
   
  
`;

export default Goal
