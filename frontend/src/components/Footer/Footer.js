import React from "react"; 
import { 

  Box, 

  Container, 

  Row, 

  Column, 

  FooterLink, 

  Heading, 

} from "./Footer.styles"; 

  
const Footer = () => { 

  return ( 

    <Box> 

      <h1 style={{ color: "green",  

                   textAlign: "center",  

                   marginTop: "-30px" }}> 

        Do more of what you love!

      </h1> 

      <Container> 

        <Row> 

          <Column> 

            <Heading>About Us</Heading> 

            <FooterLink href="#">Aim</FooterLink> 

            <FooterLink href="TermsOfServ">Terms of Services</FooterLink> 

            <FooterLink href="#">Testimonials</FooterLink> 

          </Column> 

          <Column> 

            <Heading>Services</Heading> 

            <FooterLink href="#">Find an event</FooterLink> 

            <FooterLink href="#login">Log In</FooterLink> 

            <FooterLink href="#signup">Sign up</FooterLink> 

            <FooterLink href="#">Blog</FooterLink> 

          </Column> 

          <Column> 

            <Heading>Contact Us</Heading> 

            <FooterLink href="https://github.com/BarbarianWizard">Kevin Beck</FooterLink> 

            <FooterLink href="https://github.com/defworm">Crystal Korth</FooterLink> 

            <FooterLink href="https://github.com/Agusienka">Agnieszka Mogelnicki</FooterLink> 

            <FooterLink href="https://github.com/AliPort">Alita Portillo</FooterLink> 

            <FooterLink href="https://github.com/cre8ivesolutions">Tammy Swierczynski</FooterLink> 

          </Column> 

          <Column> 

            <Heading>Social Media</Heading> 

            <FooterLink href="#"> 

              <i className="fab fa-facebook-f"> 

                <span style={{ marginLeft: "10px" }}> 

                  Facebook 

                </span> 

              </i> 

            </FooterLink> 

            <FooterLink href="#"> 

              <i className="fab fa-instagram"> 

                <span style={{ marginLeft: "10px" }}> 

                  Instagram 

                </span> 

              </i> 

            </FooterLink> 

            <FooterLink href="#"> 

              <i className="fab fa-twitter"> 

                <span style={{ marginLeft: "10px" }}> 

                  Twitter 

                </span> 

              </i> 

            </FooterLink> 

            <FooterLink href="#"> 

              <i className="fab fa-youtube"> 

                <span style={{ marginLeft: "10px" }}> 

                  Youtube 

                </span> 

              </i> 

            </FooterLink> 

          </Column> 

        </Row> 

      </Container> 

    </Box> 

  ); 
}; 

export default Footer; 
 