import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [credentials, setCredentials] = useState({
        email: "", password: ""
    });
    let navigate = useNavigate();
    const onChange = (e) => {
        e.preventDefault();
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
        } else {
            alert("Invalid Credentials");
        }

    }
    return (
        <div className="container w-50 border my-5 bg-info">
            <h2 className='text-center'>LOGIN</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group ">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
                    <small id="emailHelp" className="form-text text-danger">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' placeholder="Password" onChange={onChange} autoComplete='true' minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary my-2" >Submit</button>
            </form>
        </div>
    )
}

export default Login