import React from "react";
import styled from "styled-components";

const Link = styled.a`
color: #fff;
margin-bottom: 20px;
font-size: 18px;
text-decoration: none;

&:hover {
    color: #ff9c00;
    transition: 200ms ease-in;
}
`;

function TermOfServ () {
    return  (
        <div>
            <a href="./Home" id="Link">Home</a>
            <break/>
            <h1>Terms of Service Overview</h1><h3>Below is an overview of our Terms of Service for our “Meeting platform”, which means any website, application, or service we offer. You should read the complete Terms of Service because that document (and not this overview) is our legally binding agreement. The Terms of Service includes information about your legal rights and covers areas such as automatic subscription renewals, limitations of liability, resolution of disputes by mandatory arbitration rather than a judge or jury in a court of law, and a class action waiver.
            </h3><h1>
                Your Relationship with goalMates
            </h1><h3>
                <ul>
                    <li> By using our Platform, you are agreeing to our Terms of Service. The Terms of Service are a legally binding agreement between you and goalMates.</li>
                    <li>
                        If you break the rules, we may suspend or terminate your account.
                    </li>
                    <li>
                        We charge for certain aspects of our Platform, and some of these fees are billed on a regular and recurring basis (unless you disable auto-renewal or cancel your subscription).
                    </li>
                </ul>
            </h3>
            
        </div>
    )

  






};

export default TermOfServ