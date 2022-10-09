import React from "react";
import styled from "styled-components";
import background from "../assets/bgrnd1.jpg"

function Chat () {
return (
    <Section id="container">
        <div className="Chat">
            <h1>Chat</h1>
        </div>
        </Section>
    )
};

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

export default Chat;