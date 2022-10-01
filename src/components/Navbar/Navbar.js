import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './components/Navbar/NavbarElements';

  
const Navbar = () => {
  return (
   
      <Nav>
        <Bars />
  
        <NavMenu>
          <NavLink to='./components/Navbar/goalMates' activeStyle>
            goalMates
          </NavLink>
          <NavLink to='./components/Navbar/WeatherNews' activeStyle>
            Weather and News
          </NavLink>
    
         
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='./components/Navbar/SignUp'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
   
  );
};
  
export default Navbar;