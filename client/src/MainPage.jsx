import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

const MainPage = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);


    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("auth") === null) {
            navigate('/home-page')
        }
    }, [])


    const handleFormSwitch = () => {
        setIsLogin(!isLogin);
    };

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin) {
            let array = {
                username: username,
                password: password,
                status: true,
            };
            if (username !== "" || password !== "") {
                axios.put("http://localhost:8000/user/user-data", array).then((response) => {
                    if (response.data === "Login successfully") {
                        localStorage.setItem('auth', true);
                        onLogin();
                        navigate(`/home-page`);
                    } else {
                        alert("Please register")
                        setUsername("");
                        setPassword("");
                    }
                })
            } else {
                alert("Please Fill All Field")
            }

        } else {
            let array = {
                username: username,
                email: email,
                password: password,
                status: true,
            };

            setIsValid(validateEmail(email));


            if (validateEmail(email)) {
                axios.post("http://localhost:8000/user/user-register", array).then((response) => {

                    if (response.data === "Register successfully") {
                        setUsername("");
                        setPassword("");
                        setEmail("");
                        setIsLogin(!isLogin);
                        alert(response.data)
                    } else {
                        setUsername("");
                        setPassword("");
                        setEmail("");
                        alert(response.data)
                    }

                })
            }
        }
    };

    return (
        <div className="login-page" style={{ marginTop: '130px' }}>
            <h1>{isLogin ? 'Login' : 'Register'}</h1>
            <div className="login-form" onSubmit={handleSubmit}>
                {isLogin ? null : (
                    <>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {!isValid && <p style={{ color: 'red' }}>Invalid email address</p>}
                    </>
                )}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" onClick={handleSubmit}>{isLogin ? 'Login' : 'Register'}</button>
            </div>
            <p onClick={handleFormSwitch}>
                {isLogin ? 'New user? Register here' : 'Already registered? Log in here'}
            </p>
        </div>
    );
}

export default MainPage;
