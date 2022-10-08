import React from 'react';
import {
	Nav,
	NavLink,
	Bars,
	NavMenu,
	NavBtn,
	NavBtnLink,
	NavLogo,
	NavIcon
} from './NavbarElements';
import HamburgerMenu  from "../hamburgerMenu/HamburgerMenu";
// import { SearchBarNav } from '../SearchBarNav';
import styled from "styled-components";

const NavbarContainer = styled.div`
  width: 10%;
  height: 55px;
  ${'' /* border-bottom: 1px solid #fff; */}
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding: 0 1.5em;
  
`;





function Navbar(props) {
	return (
		<>
			<Nav>
				<Bars />

				<NavMenu>

					<NavLink to='/'>
						Home
					</NavLink>
					<NavLink to='About'>
						About
					</NavLink>
					<NavLink to='LogIn'>
						Log in
					</NavLink>
					<NavLink to='Lacation'>
						Weather
					</NavLink>
					<NavLink to='SignUpPage'>
						Sign up
					</NavLink>

					{/* Second Nav */}
					{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
				</NavMenu>

				<NavBtn>
					<NavBtnLink to='/LogIn'>Sign in</NavBtnLink>
				</NavBtn>
				<NavbarContainer>
					{/* <SearchBarNav /> */}
					<HamburgerMenu />
				</NavbarContainer>
			</Nav>
		</>
	);
}

export default Navbar;
