// Sourced from https://www.geeksforgeeks.org/how-to-develop-user-registration-form-in-reactjs/

import { useState } from 'react';
import React from 'react';
import { Link } from "react-router-dom"

function Register() {

    // States for registration
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    const [profile_pic, setProfile_pic] = useState('');



    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the username change
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the location change
    const handleLocation = (e) => {
        setLocation(e.target.value);
        setSubmitted(false);
    };

    // Handling the bio change
    const handleBio = (e) => {
        setBio(e.target.value);
        setSubmitted(false);
    };

    // Handling the profile_pic change
    const handleProfile_pic = (e) => {
        setProfile_pic(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === '' || email === '' || password === '') {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
        }
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h1>User {username} has successfully registered!!</h1>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h1>Please enter all the fields</h1>
            </div>
        );
    };

    return (
        <div className="form">
            <div>
                <h1>Sign Up Now!</h1>
            </div>

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <form>
                {/* Labels and inputs for form data */}
                <div>
                    <label className="label">User Name</label>
                    <input onChange={handleName} className="input"
                        value={username} type="text" />
                </div>
                <div>
                    <label className="label">Email</label>
                    <input onChange={handleEmail} className="input"
                        value={email} type="email" />
                </div>
                <div>
                    <label className="label">Password</label>
                    <input onChange={handlePassword} className="input"
                        value={password} type="password" />
                </div>
                <div>
                    <label className="label">Location</label>
                    <input onChange={handleLocation} className="input"
                        value={location} type="location" />
                </div>
                <div>
                    <label className="label">Bio</label>
                    <input onChange={handleBio} className="input"
                        value={bio} type="bio" />
                </div>
                <div>
                    <label className="label">Profile Pic</label>
                    <input onChange={handleProfile_pic} className="input"
                        value={profile_pic} type="file" />
                </div>
                <button onClick={handleSubmit} className="btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Register