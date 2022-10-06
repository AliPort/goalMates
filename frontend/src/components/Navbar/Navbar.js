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
import { HamburgerMenu } from "../hamburgerMenu";
import styled from "styled-components";

const NavbarContainer = styled.div`
  width: 100%;
  height: 55px;
  border-bottom: 1px solid #fff;
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

					<NavLink to='/' activestyle>
						Home
					</NavLink>
					<NavLink to='/About' activestyle>
						About
					</NavLink>
					<NavLink to='/LogIn' activestyle>
						Log in
					</NavLink>
					<NavLink to='/Signup' activestyle>
						Sign up
					</NavLink>

					{/* Second Nav */}
					{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
				</NavMenu>
				<NavBtn>
					<NavBtnLink to='/LogIn'>Sign in</NavBtnLink>
				</NavBtn>
				<NavbarContainer>
      <HamburgerMenu />
    </NavbarContainer>
			</Nav>
		</>
	);
}

export default Navbar;