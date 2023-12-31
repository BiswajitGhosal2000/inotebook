import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Signup() {
    const [credentials, setCredentials] = useState({
        name: "", email: "", password: "", cpassword: ""
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
        const { name, email, password } = credentials;
        const response = await fetch('http://127.0.0.1:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
        } else {
            alert(json.error);
        }
    }
    return (
        <div className="container border my-5 w-50 bg-info">
            <h1 className='text-center'>Sign Up!</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" placeholder="Enter Name" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' placeholder="Password" onChange={onChange} autoComplete='true' minLength={5} />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' placeholder="Confirm Password" onChange={onChange} autoComplete='true' minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary my-2" >Submit</button>
            </form>
        </div>
    )
}

export default Signup