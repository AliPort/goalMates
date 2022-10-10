import React from "react";
import GoalsView from "./GoalsView";
import { Link } from "react-router-dom"
import styled from "styled-components";
import background from "../Assets/images/bgrnd1.jpeg"


function GoalsPage () {
    return (
        <Section id="text">
        <div className="GoalsPage">
            <h1>Find New Goals</h1>
            <p>here we will need to add filters and a searchbar that can look through the GoalsView</p>
            <a href="./GoalsView"> Goals view</a>
            
            <Link to="./newgoal">
                Create New Goal
            </Link>
        </div>
        </Section>
    )
};

const Section = styled.section`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  ${'' /* display: grid;
  ${'' /* grid-template-columns: 50% 50%; */}
  height: 100vh; */}
  align-items: center;
  .text {
    padding-left: 10rem;
    display: container;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    .highlight {
      color: var(--primary-color);
    }
    h1 {
      font-size: 4.8vw;
    }
    p {
      font-size: 1.5vw;
    }
  }
  .image {
    img {
      width: 80%;
      height: 100%;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    display: flex;
    flex-direction: column-reverse;
    height: max-content;
    text-align: center;
    margin: 0 1rem;
    .image {
      img {
        width: 100%;
      }
    }
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
  }
`;



export default GoalsPage;