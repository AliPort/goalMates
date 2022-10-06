import React from "react";
import { Link } from "react-router-dom";

function Footer () {
    return (
        <div className="Footer">
            <hr/>
            <h1>small logo here</h1>
            <Link to="newgoal">
                Create New Goal
            </Link>
            <hr/>
            <div className="YourAccount">
                <h1>Your Account</h1>
                <Link to="profile"> 
                    Your Profile               
                </Link>
                <br/>
                <Link to="signup"> 
                    Sign Up               
                </Link>
                <br/>
                <Link to="login"> 
                    Log In               
                </Link>
            </div>
            <div className="Discover">
                <h1>Discover</h1>
                <Link to="mates"> 
                    Find New Mates              
                </Link>
                <br/>
                <Link to="newgoal"> 
                    Start New Goals               
                </Link>
                <br/>
                <Link to="goals"> 
                    Find Goals               
                </Link>
            </div>
            <div className="goalMates">
                <h1>Discover</h1>
                <Link to="about"> 
                    About Us              
                </Link>
                <br/>
                <Link to="contact"> 
                    Contact Us               
                </Link>
                <br/>
                <Link to="contact"> 
                    Help               
                </Link>
            </div>
            <div className="socials">
                <h1>Follow Us</h1>
                <h2>insert social media icons here</h2>
                <h2>link all the icons to our github https://github.com/AliPort/goalMates</h2>
            </div>
            <div className='legalStuff'>
                <p>©2022 goalMates</p>
                <a href="https://github.com/AliPort/goalMates">Terms of Service</a><br/>
                <a href="https://github.com/AliPort/goalMates">Privacy Policy</a><br/>
                <a href="https://github.com/AliPort/goalMates">Cookie Policy</a><br/>
                <Link to="contact"> 
                    Help               
                </Link>
            </div>
        </div>
    )
};

export default Footer;